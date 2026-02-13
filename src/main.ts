import './style.scss';
import categories from './categories.json';
import { type IBudgetItem } from './models';

// -------------------------------------------------
// ------------------- CONSTANTS  ------------------
// -------------------------------------------------

const LS_DB_ID = 'budgetList';

const SELECTORS = {
    incomeForm: '#incomeForm',
    expenseForm: '#expenseForm',
    budgetType: '#budgetType',
    categoryInput: '.category-input',
    totalBalance: '#totalBalance',
    dataList: '#data',
    deleteBtn: 'button.delete',
    cancelBtn: '.cancel-btn',
};

// -------------------------------------------------

let budgetItems: IBudgetItem[] = [];

// -------------------------------------------------
// ---------------- DOM ELEMENTS  ------------------
// -------------------------------------------------

const incomeForm: HTMLFormElement | null = document.querySelector(SELECTORS.incomeForm);
const expenseForm: HTMLFormElement | null = document.querySelector(SELECTORS.expenseForm);
const budgetType: HTMLDivElement | null = document.querySelector(SELECTORS.budgetType);
const totalBalance: HTMLDivElement | null = document.querySelector(SELECTORS.totalBalance);
const dataList: HTMLDivElement | null = document.querySelector(SELECTORS.dataList);

// -------------------------------------------------
// -------------- CATEGORY DROPDOWN  ---------------
// -------------------------------------------------

// Leta upp DOM elementen
// Beroende på INCOME | EXPENSE: Visa respektive kategorival

function printCategoryDropdown() {
    const incomeDropdown: HTMLSelectElement | null = document.querySelector('#incomeForm .category-input');
    const expenseDropdown: HTMLSelectElement | null = document.querySelector('#expenseForm .category-input');

    if (incomeDropdown) {
        categories.incomes.forEach(category => {
            incomeDropdown.innerHTML += `<option value="${category.value}">${category.text}</option>`;
        });
    }

    if (expenseDropdown) {
        categories.expenses.forEach(category => {
            expenseDropdown.innerHTML += `<option value="${category.value}">${category.text}</option>`;
        });
    }
}

printCategoryDropdown();

// -------------------------------------------------
// ---------- SET TODAY'S DATE DEFAULT   -----------
// -------------------------------------------------

// Skapa const för dagens datum samt snygga till utskriften.
// För både INCOME | EXPENSE: Visa dagens datum som default värde in inputrutan för datum.

function setTodaysDate() {
    const TODAY = new Date();
    const datePrettified = TODAY.toLocaleDateString('sv-SE');

    const incomeDateInput: HTMLInputElement | null = document.querySelector('#incomeDate');
    const expenseDateInput: HTMLInputElement | null = document.querySelector('#expenseDate');

    if (incomeDateInput) {
        incomeDateInput.value = datePrettified;
    }

    if (expenseDateInput) {
        expenseDateInput.value = datePrettified;
    }
}

setTodaysDate();

// -------------------------------------------------
// --------------- EVENT LISTENERS  ----------------
// -------------------------------------------------

if (budgetType) {
    budgetType.addEventListener('click', toggleBudgetOption);
}

if (incomeForm) {
    incomeForm.addEventListener('submit', checkFormInput);
}

if (expenseForm) {
    expenseForm.addEventListener('submit', checkFormInput);
}

document.querySelectorAll(SELECTORS.cancelBtn).forEach(btn => {
    btn.addEventListener('click', hideForms);
});

// -------------------------------------------------
// ---- TOGGLE BETWEEN INCOME / EXPENSE FORM  ------
// -------------------------------------------------

// Ta read på vilken knapp som tryckts på.
// Returnera knappens värde, dvs. 'income' | 'expense'.
// Visa / dölj klassen 'hidden' beroende på vilken knapp som trycktes på.

//@ts-expect-error - Vet ej hur jag ska lösa
function toggleBudgetOption(e) {
    const btn = e.target.closest('button');

    if (!btn) return; // Om man klickar utanför en knapp görs ingenting

    const selectedOption = btn.value; // selectedOption returnerar värdet från vilken knapp som trycktes på

    if (selectedOption === 'income') {
        // Om värdet var income
        if (incomeForm) {
            incomeForm.classList.remove('hidden');
        }
        if (expenseForm) {
            expenseForm.classList.add('hidden');
        }
    } else {
        // annars (dvs. om value är expense)
        if (expenseForm) {
            expenseForm.classList.remove('hidden');
        }
        if (incomeForm) {
            incomeForm.classList.add('hidden');
        }
    }
}

// -------------------------------------------------
// ------------------ HIDE FORMS  ------------------
// -------------------------------------------------

// Om krysset klickas på i INCOME FORM | EXPENSE FORM
// Lägg till klass hidden för att dölja form
// Återställ formulär från eventuella osparade inputs

function hideForms() {
    if (incomeForm) {
        incomeForm.classList.add('hidden');
        incomeForm.reset();
    }

    if (expenseForm) {
        expenseForm.classList.add('hidden');
        expenseForm.reset();
    }

    setTodaysDate();
}

// -------------------------------------------------
// ------------ FORM SUBMIT FUNCTION ---------------
// -------------------------------------------------

// Rensa eventuella errormeddelande från respektive fält i det aktuella formuläret
// Om kategori eller summa är tom / mindre än 0 - visa error meddelande.
// Bestäm vilken type objektet ska ha, INCOME | EXPENSE
// Pusha in värdena från inputfälten i array BudgetItems.
// Sortera med nyast datum överst.

//
// @ts-expect-error - Vet ej hur jag ska lösa
function checkFormInput(e) {
    e.preventDefault(); // Förhindrar att sidan laddas om.

    const activeForm = e.target; // Identifierar vilket forumlär som är aktivt.

    const inputDescEl = activeForm.querySelector('.description-input');
    const inputSumEl = activeForm.querySelector('.sum-input');
    const inputCategoryEl = activeForm.querySelector('.category-input');
    const inputDateEl = activeForm.querySelector('.date-input');

    const errorMessage = activeForm.querySelectorAll('.error-text');
    //@ts-expect-error - Vet ej hur jag ska lösa
    errorMessage.forEach(span => (span.textContent = ''));

    let hasErrors = false;

    if (inputCategoryEl.value === '') {
        const errorSpan = inputCategoryEl.nextElementSibling;
        if (errorSpan) errorSpan.textContent = 'Vänligen välj en kategori';
        hasErrors = true;
    }

    if (inputSumEl.value === '' || Number(inputSumEl.value) <= 0) {
        const errorSpan = inputSumEl.nextElementSibling;
        if (errorSpan) errorSpan.textContent = 'Ange ett giltigt belopp över 0 kr';
        hasErrors = true;
    }

    if (hasErrors) {
        return; // Koden stannar här om fälten inte är korrekt ifyllda.
    }

    const categoryText = inputCategoryEl.options[inputCategoryEl.selectedIndex].text; // const för att skriva ut kategorins text istället för värde

    let type;

    if (activeForm.id === 'incomeForm') {
        type = 'income';
    } else {
        type = 'expense';
    }

    budgetItems.push({
        // Interface från IBudgetItem i models.ts
        text: inputDescEl.value,
        sum: Number(inputSumEl.value),
        date: inputDateEl.value,
        category: categoryText,
        // @ts-expect-error - Vet ej hur jag ska lösa
        type: type,
    });

    // @ts-expect-error - Vet ej hur jag ska lösa
    budgetItems.sort((a, b) => new Date(b.date) - new Date(a.date));

    saveToLocalStorage();
    writeToScreen();
    activeForm.reset();
    setTodaysDate();
}

// -------------------------------------------------
// ---------------- LOCAL STORAGE ------------------
// -------------------------------------------------

function saveToLocalStorage() {
    const stringified = JSON.stringify(budgetItems);

    localStorage.setItem(LS_DB_ID, stringified);
}

function readFromLocalStorage() {
    const savedValue = localStorage.getItem(LS_DB_ID);

    if (savedValue === null) {
        return;
    }

    budgetItems = JSON.parse(savedValue);
}

// -------------------------------------------------
// ------------- DISPLAY BUDGET-ITEMS --------------
// -------------------------------------------------

// Gör om totalBalance till en sträng.
// Ta bort grön eller röd klass från totalBalance.
// Om totalBalance är mer än 0, sätt klass grön annars röd.

function writeToScreen() {
    const total = calculateTotal();

    if (totalBalance) {
        totalBalance.textContent = total.toLocaleString('sv-SE') + ' kr';
    }

    totalBalance!.classList.remove('text-green', 'text-red');

    if (total >= 0) {
        totalBalance!.classList.add('text-green');
    } else {
        totalBalance!.classList.add('text-red');
    }

    let html = '<ul>'; // Skapa en lista som objekt kan läggas till i

    budgetItems.forEach((budgetItem, index) => {
        // Sätt klass grön eller röd samt plus eller minus beroende på om item är en inkomst eller en utgift.
        let symbol: string;
        let colorClass: string;

        if (budgetItem.type === 'income') {
            colorClass = 'text-green';
            symbol = '+ ';
        } else {
            colorClass = 'text-red';
            symbol = '- ';
        }

        const formattedSum = budgetItem.sum.toLocaleString('sv-SE'); // Formatera summan

        // Skapa respektive item i en <li> tagg
        html += `
      <li>
      <div class="transaction-top">
        <span>${budgetItem.category}</span>
        <span class="${colorClass}">${symbol}${formattedSum}kr</span>
      </div>
      <div class="transaction-middle">
        <span>${budgetItem.text}</span>
      </div>
      <div class="transaction-bottom">
        <span>${budgetItem.date}</span>
        <button class="delete" data-id="${index}" aria-label="Ta bort transaktion">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" aria-hidden="true"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
      </div>
      </li>`;
    });

    html += '</ul>';

    // Skriv ut items i HTML

    if (dataList) {
        dataList.innerHTML = html;
    }

    document.querySelectorAll('button.delete').forEach(btn => {
        btn.addEventListener('click', deleteTransaction);
    });

    calculateTotal();
}

// -------------------------------------------------
// ------------ CALCULATE TOTAL BALANCE ------------
// -------------------------------------------------

// Summerar alla items summor.

function calculateTotal() {
    return budgetItems.reduce((total, budgetItem) => {
        if (budgetItem.type === 'income') {
            return total + budgetItem.sum;
        } else {
            return total - budgetItem.sum;
        }
    }, 0);
}

// -------------------------------------------------
// ---------------- DELETE BUDGET ------------------
// -------------------------------------------------

// Identifiera vilket index som ska tas bort.
// Ta bort item.

// @ts-expect-error - Vet ej hur jag ska lösa
function deleteTransaction(e) {
    const id = Number(e.currentTarget.dataset.id);

    budgetItems.splice(id, 1);

    saveToLocalStorage();
    writeToScreen();
    setTodaysDate();
}

readFromLocalStorage();
writeToScreen();
