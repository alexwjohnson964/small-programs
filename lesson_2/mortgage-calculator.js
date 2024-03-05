let monthlyPayment;

let loanAmount;
let yearlyInterestRate;
let loanDuration; // In years
const readlineSync = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
  return readlineSync.question();
}
function calculatePayment(amount, interestRate, duration) {
  return amount * (interestRate / (1 - Math.pow((1 + interestRate), (-duration))));
}
function isValidNumericInput(input) {
  return !(Number.isNaN(Number(input)) || Number(input <= 0));
}

loanAmount = prompt('Enter the amount of the loan in USD: ');
while (!isValidNumericInput(loanAmount)) {
  loanAmount = prompt('Enter a valid loan amount in USD: ');
}

yearlyInterestRate = prompt('Enter the Annual Percentange Rate (APR) of the loan: ');
while (!isValidNumericInput(yearlyInterestRate)) {
  yearlyInterestRate = prompt('Enter a valid APR: ');
}

loanDuration = prompt('Enter the duration of the loan in years');
while (!isValidNumericInput(loanDuration)) {
  loanDuration = prompt('Enter a valid loan duration in years');
}
// TODO: Handle interest rate more cleanly
monthlyPayment = calculatePayment(loanAmount, yearlyInterestRate / 100 / 12, loanDuration * 12);
console.log(`$${monthlyPayment.toFixed(2)}`);
