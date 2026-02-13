![HTML badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

# Beskrivning av projektet

Ett projekt i kursen JavaScript-introduktion där uppgiften var att skapa en funktionell budgetapplikation. Användaren kan lägga till och ta bort inkomster samt utgifter, och se en sammanställning av sin ekonomi.

Funktionalitet:

    Användaren kan lägga till och ta bort inkomster och utgifter med beskrivning, belopp och kategori. Budgetposten färgkodas för att tydligt skilja på inkomster och utgifter.

    En totalsumma beräknas automatiskt och färgkodas (grön/röd) baserat på om beloppet är positivt eller negativt.

    All data sparas i localStorage och laddas automatiskt när sidan öppnas igen.

    Kategorier för inkomster och utgifter läses in via en JSON-fil.

Tekniskt fokus: Huvudfokus i projektet har varit logik, datahantering och funktionalitet framför avancerad CSS.

    Vite & TypeScript: Projektet är initierat med Vite och typat med TypeScript.

    SASS: Använt för att strukturera CSS på ett mer effektivt sätt.

## Skärmdumpar av projektet

![Skärmdump av projektet](src/assets/budgetapp.png)

![Skärmdump av projektet](src/assets/budgetapp_1.png)

## Tillgänglighetsanalys

Skärmdump av tillgänglighetsanalys i Chrome Lighthouse, mobilt läge: ![Skärmdump av tillgänglighetsanalys i Lighthouse, mobilt läge](src/assets/lighthouse_mobile.png)

Skärmdump av tillgänglighetsanalys i Chrome Lighthouse, desktop-läge: ![Skärmdump av tillgänglighetsanalys i Lighthouse, desktop-läge](src/assets/lighthouse_desktop.png)

## Validering

Sidan har validerats med hjälp av W3C HTML Validator, W3C CSS Validator samt
