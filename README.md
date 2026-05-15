# ToppiWall - Professional Finishing Services in Leuven

![Status](https://img.shields.io/badge/Status-Development-orange)
![Tech](https://img.shields.io/badge/Tech-React%20%2B%20Tailwind%20%2B%20FramerMotion-blue)

**ToppiWall** to nowoczesna, minimalistyczna wizytówka firmy remontowo-wykończeniowej działającej na rynku belgijskim (Leuven i okolice). Projekt stawia na precyzję, czystość i dynamiczne doświadczenie użytkownika (UX) poprzez zaawansowane animacje oparte na czerwonej linii nawigacyjnej.

## 🎯 Wizja Projektu
Strona ma budować zaufanie u lokalnych klientów poprzez profesjonalny design "Light Mode" z silnymi czerwonymi akcentami nawiązującymi do logotypu firmy.

## 🎨 Kluczowe Funkcje Wizualne
* **Animated Brand Line:** Interaktywna czerwona linia prowadząca użytkownika przez całą stronę (scroll progress).
* **Hero Full-Video:** Pełnoekranowe tło wideo w sekcji startowej z automatycznie rysującym się logotypem (SVG path animation).
* **Interactive Navigation:** Odnośniki sekcji umieszczone bezpośrednio na "kręgosłupie" (linii) strony.
* **Masonry Portfolio:** Dynamiczna galeria zdjęć z realizacji (malowanie, G-K, panele) w układzie o zmiennej wysokości.
* **Mobile-First Design:** Pełna responsywność z dedykowanym paskiem szybkiego kontaktu (WhatsApp/Call) na telefonach.

## 🛠 Stos Technologiczny
- **Frontend:** React.js
- **Stylizacja:** Tailwind CSS
- **Animacje:** Framer Motion (interakcje UI) + GSAP (ScrollTrigger dla animacji linii)
- **Portfolio:** react-masonry-css
- **Hosting:** VPS (Ubuntu)

## 📂 Struktura Sekcji
1. **Hero:** Full-width video, logo animation, CTA (Zadzwoń/WhatsApp).
2. **Usługi:** - Malowanie (zabezpieczenie, gruntowanie, finisz).
    - Zabudowy G-K (sufity, ścianki).
    - Montaż paneli.
    - Usługi dodatkowe (renowacje, łazienki).
3. **Portfolio:** Siatka zdjęć Masonry.
4. **Opinie:** Widget Google Reviews (w przygotowaniu).
5. **Kontakt:** Mapka zasięgu (Leuven) + formularz kontaktowy/przyciski akcji.

## 🌍 Roadmapa Językowa
Projekt przewiduje wsparcie dla wielu języków w architekturze `i18n`:
- [x] Polski (Bazowy)
- [ ] Angielski
- [ ] Flamandzki (Dutch)
- [ ] Niemiecki
- [ ] Francuski

## 🚀 Instalacja i Uruchomienie

1. Sklonuj repozytorium:
   ```bash
   git clone [https://github.com/TwojUser/toppiwall-web.git](https://github.com/TwojUser/toppiwall-web.git)