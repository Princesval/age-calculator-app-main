// Inputs, labels and Button elements
const button = document.getElementById("submit-button");
const userYear = document.getElementById("year-input");
const userMonth = document.getElementById("month-input");
const userDay = document.getElementById("day-input");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");

// Current date
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() +1;
const currentDay = new Date().getDate();

// Span messages (Required)
const yearRequiredMsg = document.getElementById("year-required");
const monthRequiredMsg = document.getElementById("month-required");
const dayRequiredMsg = document.getElementById("day-required");

// All spans
const spans = document.querySelectorAll("span");

// Span messages (Invalid error)
const yearValidError = document.getElementById("year-valid-error");
const monthValidError = document.getElementById("month-valid-error");
const dayValidError = document.getElementById("day-valid-error");

// Results
const resultYear = document.getElementById("year-display");
const resultMonth = document.getElementById("month-display");
const resultDay = document.getElementById("day-display");

function changeColor(){
    inputs.forEach(input => {
        input.style.border = '1px solid var(--LightRed)'
    });

    labels.forEach(label => {
        label.style.color = 'var(--LightRed)'
    });
};

function clean(){
    inputs.forEach(input => {
        input.style.border = '1px solid var(--LightGrey)'
    });

    labels.forEach(label => {
        label.style.color = 'var(--SmokeyGrey)'
    });

    spans.forEach(msg => {
        msg.style.display = 'none'
    });
}

function calculateYear(year, month, day) {
    let ageInYears = currentYear - year;
    if (month < currentMonth) {
        resultYear.textContent = ageInYears;
    } else if (month > currentMonth) {
        resultYear.textContent = ageInYears -1;
    } else {
        if (day <= currentDay) {
            resultYear.textContent = ageInYears;
        } else {
            resultYear.textContent = ageInYears -1;
        }
    }
}

function calculateMonth(month, day){
    let ageMonths = currentMonth - month;
    if(ageMonths < 0) {
        resultMonth.textContent = ageMonths += 12;
    } else {
        if(currentDay < day) {
            resultMonth.textContent = ageMonths - 1;
        } else if (currentDay >= day) {
            resultMonth.textContent = ageMonths;
        }
    }
}

function calculateDay(month, day) {
    let lastMonthDays;

    switch (month - 1) {
        case 2: // Fevereiro (verificar se o ano é bissexto)
            if ((currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0)) {
                lastMonthDays = 29; // Ano bissexto
            } else {
                lastMonthDays = 28; // Ano comum
            }
            break;
        case 4: case 6: case 9: case 11:
            lastMonthDays = 30; // Meses com 30 dias
            break;
        default:
            lastMonthDays = 31; // Meses com 31 dias
    }

    if (currentDay === day) {
        resultDay.textContent = 0; // Dia do "mêsversário"
    } else if (currentDay < day) {
        let calc1 = (lastMonthDays - day) + currentDay;
        resultDay.textContent = calc1 // Se o "mêsversário" ainda não passou
    } else if (currentDay > day) {
        let calc2 = currentDay - day;
        resultDay.textContent = calc2 // Se o "mêsversário" já passou
    }
    
}

function dataValidation(year, month, day) {
    // Verfica se o campo está vazio ou se número é válido
    if(!year) {
        yearValidError.style.display = 'none';
        yearRequiredMsg.style.display = 'block';
        changeColor();
    } else if (year > currentYear){
        yearRequiredMsg.style.display = 'none';
        yearValidError.style.display = 'block';
        changeColor();
    } else {
        calculateYear(year, month, day);
    }

    if(!month) {
         monthValidError.style.display = 'none';
        monthRequiredMsg.style.display = 'block';
        changeColor();
    } else if (month > 12 || month <= 0) {
        monthRequiredMsg.style.display = 'none';
        monthValidError.style.display = 'block';
        changeColor()
    } else {
        calculateMonth(month, day);
    }

    if(!day) {
         dayValidError.style.display = 'none';
        dayRequiredMsg.style.display = 'block';
        changeColor();
    } else if (day > 31 || day <= 0) {
        dayRequiredMsg.style.display = 'none';
        dayValidError.style.display = 'block';
        changeColor()
    } else {
        calculateDay(month, day)
    }
}

button.addEventListener('click', () => {
    clean()
    dataValidation(
        Number(userYear.value), 
        Number(userMonth.value), 
        Number(userDay.value)
    );
})