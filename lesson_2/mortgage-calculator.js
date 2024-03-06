let loanAmount;
let yearlyInterestRate;
let loanDuration; // In years
const MONTHS = 12;
const readlineSync = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
  return readlineSync.question();
}
function calculatePayment(amount, interestRate, duration) {
  if (interestRate === 0) {
    return amount / duration;
  }
  return amount * (interestRate / (1 - (1 + interestRate) ** (-duration)));
}

function isValidNumericInput(input) {
  return !(Number.isNaN(Number(input)) || Number(input) <= 0);
}

function validateInterestRate(interestRate) {
  if (Number(interestRate) === 0) {
    return 0;
  }
  if (!isValidNumericInput(interestRate)) {
    return false;
  }
  if (Number(interestRate) < 1) {
    const response = prompt(`Did you mean ${interestRate * 100}%?\nReply 'yes' to convert or anything else to use ${interestRate}%)`);
    if (response.toLowerCase() === 'yes') {
      return Number(interestRate) * 100;
    }
  }
  return Number(interestRate);
}

loanAmount = prompt('Enter the amount of the loan in USD: ');
while (!isValidNumericInput(loanAmount)) {
  loanAmount = Number(prompt('Enter a valid loan amount in USD: '));
}

yearlyInterestRate = prompt('Enter the Annual Percentange Rate (APR) of the loan: ');
while (validateInterestRate(yearlyInterestRate) === false) {
  yearlyInterestRate = Number(prompt('Enter a valid APR: '));
}
const monthlyInterestRate = yearlyInterestRate / 100 / MONTHS;

loanDuration = prompt('Enter the duration of the loan in years');
while (!isValidNumericInput(loanDuration)) {
  loanDuration = Number(prompt('Enter a valid loan duration in years'));
}

const monthlyPayment = calculatePayment(loanAmount, monthlyInterestRate, loanDuration * MONTHS);
console.log(`The monthly payment is $${monthlyPayment.toFixed(2)}`);
