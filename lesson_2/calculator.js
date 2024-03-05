const readline = require('readline-sync');
const messages = require('./calculator_messages.json');
const LANG = 'en';
function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}
let running = true;
while (running === true) {
  prompt(messages[LANG].welcomeMessage);

  prompt(messages[LANG].firstNumberPrompt);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(messages[LANG].invalidNumberPrompt);
    number1 = readline.question();
  }

  prompt(messages[LANG].secondNumberPrompt);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(messages[LANG].invalidNumberPrompt);
    number2 = readline.question();
  }

  prompt(messages[LANG].operationPrompt);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages[LANG].invalidOperationPrompt);
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
    default:
      break;
  }

  prompt(`${messages[LANG].resultMessage}${output}`);
  prompt(`${messages[LANG].repeatCalculationPrompt}${messages[LANG].repeatCalculationExpected}`);
  let runAgain = readline.question(); // Disable lint for this?
  if (runAgain.toLowerCase() !== 'yes') {
    running = false;
  }
}
