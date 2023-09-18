/* eslint-disable func-style */
const butnOne = document.getElementById('numOne');
const butnTwo = document.getElementById('numTwo');
const butnThree = document.getElementById('numThree');
const butnFour = document.getElementById('numFour');
const butnFive = document.getElementById('numFive');
const butnSix = document.getElementById('numSix');
const butnSeven = document.getElementById('numSeven');
const butnEight = document.getElementById('numEight');
const butnNine = document.getElementById('numNine');
const butnZero = document.getElementById('numZero');
const butnPoint = document.getElementById('numPoint');
const addition = document.getElementById('butnAdd');
const subtraction = document.getElementById('butnSub');
const multiplication = document.getElementById('butnMul');
const division = document.getElementById('butnDiv');

const eqlSym = document.getElementById('equalSymbol');
const clearButton = document.getElementById('clearDisplayScreen');

butnOne.addEventListener('click', () => addNumToDisplay('1'));
butnTwo.addEventListener('click', () => addNumToDisplay('2'));
butnThree.addEventListener('click', () => addNumToDisplay('3'));

butnFour.addEventListener('click', () => addNumToDisplay('4'));
butnFive.addEventListener('click', () => addNumToDisplay('5'));
butnSix.addEventListener('click', () => addNumToDisplay('6'));

butnSeven.addEventListener('click', () => addNumToDisplay('7'));
butnEight.addEventListener('click', () => addNumToDisplay('8'));
butnNine.addEventListener('click', () => addNumToDisplay('9'));

butnZero.addEventListener('click', () => addNumToDisplay('0'));
butnPoint.addEventListener('click', () => addNumToDisplay('.'));

addition.addEventListener('click', () => addOprToDisplay('+'));
subtraction.addEventListener('click', () => addOprToDisplay('-'));
multiplication.addEventListener('click', () => addOprToDisplay('*'));
division.addEventListener('click', () => addOprToDisplay('/'));

clearDisplayScreen.addEventListener('click', () => clearDis());

function clearDis() {

  document.getElementById('displayNum').innerHTML = '';
  document.getElementById('displayOpr').innerHTML = '';
  result = 0;
  inputHistory = 0;
  currentInput = 0;
}

let inputHistory = 0;

let calculationOutput = 0; // Stores the result of calculations.

let currentInput = 0;

let hasOPerator = false;

let equal = false;

let count = 0;

let operator = 0;

let expression = 0;

// The showNumber function displays numbers on the calculator screen.
function showNumber(numbers) {
  clr();
  document.getElementById('displayNum').innerHTML += numbers;
  if (hasOPerator == true) secondNum();
}

function addNumToDisplay(values) {
  if (values === '.') {
    count++;
  }

  if (values === '.' && currentInput.includes('.') || count > 1) {
    count = 1;
    return;
  }

  currentInput = values;
  showNumber(currentInput);
  inputHistory += currentInput;
  console.log(inputHistory);
  operator = 0;
}

function addOprToDisplay(operators) {
  hasOPerator = true;

  document.getElementById('displayOpr').innerHTML = operators;
  if (operator != operators) {
    operator = operators;
    expression += operator;
    inputHistory += operators;
    count = 0;
    return count;
  }
}

function secondNum() {
  document.getElementById('displayNum').innerHTML = currentInput;
  document.getElementById('displayOpr').innerHTML = '';
  hasOPerator = false;
}

eqlSym.addEventListener('click', () => {

  calculationOutput = math.evaluate(inputHistory);
  console.log(calculationOutput);
  document.getElementById('displayOpr').innerHTML = '=';
  document.getElementById('displayNum').innerHTML = calculationOutput;
  inputHistory = 0;
  inputHistory += calculationOutput;
  operator = 0;
  equal = true;
  count = 0;
});

function clr() {
  if (equal == true) {
    document.getElementById('displayNum').textContent = '';
    document.getElementById('displayOpr').innerHTML = '';
  }
  equal = false;}