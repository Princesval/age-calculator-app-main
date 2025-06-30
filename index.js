// Button
const submitBtn = document.getElementById('submit-btn');

// Date today
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

// User Day input / error / label
const userBirthDay = document.getElementById('age-day');
const dayLabel = document.getElementById('day-label');
const dayErrorSpan = document.getElementById('day-error-span');

// User month input / error / label
const userBirthMonth = document.getElementById('age-month');
const monthLabel = document.getElementById('month-label');
const monthErrorSpan = document.getElementById('month-error-span');

// User year input / error / label
const userBirthYear = document.getElementById('age-year');
const yearLabel = document.getElementById('year-label');
const yearErrorSpan = document.getElementById('year-error-span');

// Spans
const spanDay = document.getElementById('day-span');
const spanMonth = document.getElementById('month-span');
const spanYear = document.getElementById('year-span');

// Main-----------------------------------------------------------
function checkDate() {
    const userBirthDayValue = userBirthDay.value;
    const userBirthMonthValue = userBirthMonth.value;
    const userBirthYearValue = userBirthYear.value;

    if (checkEmptyDate(userBirthDayValue, userBirthMonthValue, userBirthYearValue) === true) {
        console.log('There are no empty fields');
        const numDay = Number(userBirthDayValue);
        const numMonth = Number(userBirthMonthValue);
        const numYear = Number(userBirthYearValue);

        if (validDate(numDay, numMonth, numYear) === true) {
            const birthDate = new Date(numYear, numMonth - 1, numDay);
            const today = new Date();

            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();

            if (days < 0) {
                months -= 1;
                const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                days += lastMonth.getDate();
            }

            if (months < 0) {
                years -= 1;
                months += 12;
            }

            spanYear.textContent = years;
            spanMonth.textContent = months;
            spanDay.textContent = days;
        } else {
            console.log('data inválida')
        }
    };
}

function validDate(day, month, year) {
    validDay(day, month, year);
    validMonth(month)
    validYear(day, month, year)
    if (validDay(day, month, year) === true && 
        validMonth(month) === true && 
        validYear(day, month, year) === true) {
        return true;
    } else {
        return false;
    }
}

function validYear(day, month, year) {
    if (year > today.getFullYear()) {
        errorMsg(yearLabel, userBirthYear, yearErrorSpan, 'Must be in the past');
    } else if (year === today.getFullYear()) {
        if (month > today.getMonth()) {
            errorMsg(yearLabel, userBirthYear, yearErrorSpan, 'Must be in the past');
        } else if (month < today.getMonth()) {
            clearError(yearLabel, userBirthYear, yearErrorSpan);
            return true
        } else {
            if (day > today.getDate()) {
                errorMsg(yearLabel, userBirthYear, yearErrorSpan, 'Must be in the past');
            } else {
                clearError(yearLabel, userBirthYear, yearErrorSpan);
                return true
            }
        }
    } else {
        clearError(yearLabel, userBirthYear, yearErrorSpan);
        return true
    }
}

function validMonth(month) {
    if (month < 1 || month > 12) {
        errorMsg(monthLabel, userBirthMonth, monthErrorSpan, 'Must be a valid month');
        return false;
    } else {
        clearError(monthLabel, userBirthMonth, monthErrorSpan);
        return true;
    }
}

function validDay(day, month, year) {
    switch(month) {
        // Months with 31 days
        case 1: case 3: case 5: case 7:  case 8:  case 10: case 12:  
            if (day < 1 || day > 31) {
                errorMsg(dayLabel, userBirthDay, dayErrorSpan, 'Must be a valid day');
            } else {
                clearError(dayLabel, userBirthDay, dayErrorSpan);
                return true;
            }
            break
        // Months with 30 days
        case 4: case 6: case 9: case 11:
            if (day < 1 || day > 30) {
                errorMsg(dayLabel, userBirthDay, dayErrorSpan, 'Must be a valid day');
            } else {
                clearError(dayLabel, userBirthDay, dayErrorSpan);
                return true;
            }
            break
        // Month with 28 days//  if is leap year 29 days
        case 2:
            if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                if (day < 1 || day > 29) {
                    errorMsg(dayLabel, userBirthDay, dayErrorSpan, 'Must be a valid day');
                } else {
                    clearError(dayLabel, userBirthDay, dayErrorSpan);
                    return true;
                }
            } else {
                if (day < 1 || day > 28) {
                    errorMsg(dayLabel, userBirthDay, dayErrorSpan, 'Must be a valid day');
                } else {
                    clearError(dayLabel, userBirthDay, dayErrorSpan);
                    return true;
                }
            }
            break
        default:
            console.log('dia inválido// mês inválido')
    }
}

function checkEmptyDate(day, month, year) {
    if (day == '' || month == '' || year == '') {
        if (day == '') {
            errorMsg(dayLabel, userBirthDay, dayErrorSpan, 'This field is required');
        } else {
            clearError(dayLabel, userBirthDay, dayErrorSpan);
        }

         if (month == '') {
            errorMsg(monthLabel, userBirthMonth, monthErrorSpan, 'This field is required');
        } else {
            clearError(monthLabel, userBirthMonth, monthErrorSpan);
        }

         if (year == '') {
            errorMsg(yearLabel, userBirthYear, yearErrorSpan, 'This field is required');
        } else {
            clearError(yearLabel, userBirthYear, yearErrorSpan);
        }

    } else {
        clearError(dayLabel, userBirthDay, dayErrorSpan);
        clearError(monthLabel, userBirthMonth, monthErrorSpan);
        clearError(yearLabel, userBirthYear, yearErrorSpan);

        return true;
    }
}

function errorMsg(label, input, span, msg) {
    label.style.color = 'var(--Red400)';
    input.style.border = '1px solid var(--Red400)';
    span.style.display = 'block';
    span.innerHTML = msg;
}


function clearError(label, input, span) {
    label.style.color = 'var(--Grey500)';
    input.style.border = '1px solid var(--Grey200)';
    span.style.display = 'none';
}

submitBtn.addEventListener('click', () => {
    checkDate()
})