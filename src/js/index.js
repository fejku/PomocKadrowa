import {dniRoboczeWRoku} from './modules/dni_robocze_w_roku';

const stopaProcentowaUbezpieczenieEmerytalne = 9.76 / 100;
const stopaProcentowaUbezpieczenieRentowe = 1.5 / 100;
const stopaProcentowaUbezpieczenieChorobowe = 2.45 / 100;
const stopaProcentowaUbezpieczenieZdrowotne = 9 / 100;
const stopaProcentowaZaliczkaNaPIT = 18 / 100;
const stopaProcentowaZaliczkaNaPIT2 = 7.75 / 100;

const kosztUzyskaniaPrzuchoduDlaMiejscowych = 111.25;
const kwotaWolnaOdPodatku = 46.33

document.addEventListener("DOMContentLoaded", () => {
  const buttonOblicz = document.getElementById('button_oblicz');
  buttonOblicz.addEventListener('click', () => {
    // https://wynagrodzenia.pl/artykul/jak-obliczyc-wynagrodzenie-netto
    const wynagrodzenieBrutto = Number(document.getElementById('input_brutto').value);
    const ubezpieczenieEmerytalne = wynagrodzenieBrutto * stopaProcentowaUbezpieczenieEmerytalne; 
    document.getElementById('span_ubezpieczenie_emerytalne').textContent = Math.round(ubezpieczenieEmerytalne * 100) / 100; 
    const ubezpieczenieRentowe = wynagrodzenieBrutto * stopaProcentowaUbezpieczenieRentowe;
    document.getElementById('span_ubezpieczenie_rentalne').textContent = Math.round(ubezpieczenieRentowe * 100) / 100;
    const ubezpieczenieChorobowe = wynagrodzenieBrutto * stopaProcentowaUbezpieczenieChorobowe; 
    document.getElementById('span_ubezpieczenie_chorobowe').textContent = Math.round(ubezpieczenieChorobowe * 100) / 100;
    const ubezpieczeniaSpoleczne = ubezpieczenieEmerytalne + ubezpieczenieRentowe + ubezpieczenieChorobowe;  

    let podstawaUbezpieczenieZdrowotne = (wynagrodzenieBrutto - ubezpieczeniaSpoleczne); 
    const ubezpieczenieZdrowotne = podstawaUbezpieczenieZdrowotne * stopaProcentowaUbezpieczenieZdrowotne; 
    document.getElementById('span_ubezpieczenie_zdrowotne').textContent = Math.round(ubezpieczenieZdrowotne * 100) / 100;
    
    let ZaliczkaNaPIT = ((podstawaUbezpieczenieZdrowotne - kosztUzyskaniaPrzuchoduDlaMiejscowych) * stopaProcentowaZaliczkaNaPIT) 
      - kwotaWolnaOdPodatku; 
    podstawaUbezpieczenieZdrowotne = podstawaUbezpieczenieZdrowotne * stopaProcentowaZaliczkaNaPIT2;
    ZaliczkaNaPIT = Math.round(ZaliczkaNaPIT - podstawaUbezpieczenieZdrowotne);
    document.getElementById('span_zaliczkaPIT').textContent = Math.round(ZaliczkaNaPIT * 100) / 100;
    
    const wynagrodzenieNetto = wynagrodzenieBrutto - ubezpieczeniaSpoleczne - ubezpieczenieZdrowotne - ZaliczkaNaPIT;
    document.getElementById('span_netto').textContent = Math.round(wynagrodzenieNetto * 100) / 100;

    const dniRobocze = JSON.parse(dniRoboczeWRoku);
    const wybranyRok = document.getElementById('select_rok').value;
    const wybranyMiesiac = document.getElementById('select_miesiac').value;
    const rok = dniRobocze.lata.find(rok => rok.rok === wybranyRok);
    const miesiac = rok.miesiace.find(miesiac => miesiac.nazwa === wybranyMiesiac);
    const iloscDniWMiesiacu = Number(miesiac.ilosc_dni);
    document.getElementById('span_dni_robocze').textContent = iloscDniWMiesiacu;

    const stawkaGodzinowaNetto = wynagrodzenieNetto / iloscDniWMiesiacu / 8;
    document.getElementById('span_stawka_netto_za_godzine').textContent = Math.round(stawkaGodzinowaNetto * 100) / 100;
    
    const iloscNadgodzin = Number(document.getElementById('input_ilosc_nadgodzin').value);
    const sumaNetto = stawkaGodzinowaNetto * iloscNadgodzin;
    document.getElementById('span_suma_netto').textContent = Math.round(sumaNetto * 100) / 100;
  })
});