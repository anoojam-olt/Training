$(document).ready(function () {
  const calculatorContainer = document.querySelector('.container');
  let inputHistory = '';
  let currentInput = '';
  let hasOperator = false;
  let equal = false;
  let count = 0;
  let operator = '';
  let expression = '';

  calculatorContainer.addEventListener('click', function (event) {
      const target = event.target;
      if (target.tagName === 'BUTTON') {
          const buttonValue = target.textContent;

          switch (buttonValue) {
              case 'C':
                  clearDisplay();
                  break;
              case '=':
                  calculate();
                  break;
              case '+':
              case '-':
              case '*':
              case '/':
                  addOperatorToDisplay(buttonValue);
                  break;
              case '.':
                  addDecimalPointToDisplay();
                  break;
              default:
                  addNumberToDisplay(buttonValue);
                  break;
          }
      }
  });

  function clearDisplay() {
      document.querySelector('#displayNum').innerHTML = '';
      document.querySelector('#displayOpr').innerHTML = '';
      inputHistory = '';
      currentInput = '';
      hasOperator = false;
      operator = '';
      expression = '';
      equal = false;
      count = 0;
  }

  function addNumberToDisplay(value) {
      if (value === '.') {
          if (!currentInput.includes('.')) {
              currentInput += '.';
              showNumber(currentInput);
              inputHistory += '.';
          }
      } else {
          if (hasOperator) {
              currentInput = ''; // Clear currentInput when an operator is clicked
          }
          currentInput += value;
          showNumber(currentInput);
          inputHistory += value;
          operator = '';
      }
  }

  function addOperatorToDisplay(oper) {
      hasOperator = true;

      document.querySelector('#displayOpr').innerHTML = oper;
      if (operator !== oper) {
          operator = oper;
          expression += operator;
          inputHistory += operator;
          count = 0;
      }
  }

  function addDecimalPointToDisplay() {
      if (!currentInput.includes('.')) {
          currentInput += '.';
          showNumber(currentInput);
          inputHistory += '.';
      }
  }

  function showNumber(numbers)
{
      clearIfEqual();
      document.querySelector('#displayNum').innerHTML = numbers;
      if (hasOperator) {
          showSecondNumber();
      }
  }

  function showSecondNumber() {
      document.querySelector('#displayNum').innerHTML = currentInput;
      document.querySelector('#displayOpr').innerHTML = '';
      hasOperator = false;
  }

  function calculate() {
      if (inputHistory && !equal) {
          const calculationOutput = math.evaluate(inputHistory);
          document.querySelector('#displayOpr').innerHTML = '=';
          document.querySelector('#displayNum').innerHTML = Number(calculationOutput.toFixed(12));
          inputHistory = calculationOutput.toString();
          operator = '';
          equal = true;
          count = 0;
      }
  }

  function clearIfEqual() {
      if (equal) {
          document.querySelector('#displayNum').innerHTML = '';
          document.querySelector('#displayOpr').innerHTML = '';
      }
      equal = false;
  }
});