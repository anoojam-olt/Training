
$(document).ready(function() {
  const $butnOne = $('#numOne');
  const $butnTwo = $('#numTwo');
  const $butnThree = $('#numThree');
  const $butnFour = $('#numFour');
  const $butnFive = $('#numFive');
  const $butnSix = $('#numSix');
  const $butnSeven = $('#numSeven');
  const $butnEight = $('#numEight');
  const $butnNine = $('#numNine');
  const $butnZero = $('#numZero');
  const $butnPoint = $('#numPoint');
  const $addition = $('#butnAdd');
  const $subtraction = $('#butnSub');
  const $multiplication = $('#butnMul');
  const $division = $('#butnDiv');

  const $eqlSym = $('#equalSymbol');
  const $clearButton = $('#clearDisplayScreen');

  $butnOne.click(() => addNumToDisplay('1'));
  $butnTwo.click(() => addNumToDisplay('2'));
  $butnThree.click(() => addNumToDisplay('3'));

  $butnFour.click(() => addNumToDisplay('4'));
  $butnFive.click(() => addNumToDisplay('5'));
  $butnSix.click(() => addNumToDisplay('6'));

  $butnSeven.click(() => addNumToDisplay('7'));
  $butnEight.click(() => addNumToDisplay('8'));
  $butnNine.click(() => addNumToDisplay('9'));

  $butnZero.click(() => addNumToDisplay('0'));
  $butnPoint.click(() => addNumToDisplay('.'));

  $addition.click(() => addOprToDisplay('+'));
  $subtraction.click(() => addOprToDisplay('-'));
  $multiplication.click(() => addOprToDisplay('*'));
  $division.click(() => addOprToDisplay('/'));

  $clearButton.click(() => clearDis());

  function clearDis() {
    $('#displayNum').html('');
    $('#displayOpr').html('');
    inputHistory = 0;
    currentInput = 0;
  }

  let inputHistory = 0;
  let calculationOutput = 0;
  let currentInput = 0;
  let hasOPerator = false;
  let equal = false;
  let count = 0;
  let operator = 0;
  let expression = 0;

  function showNumber(numbers) {
    clr();
    $('#displayNum').append(numbers);
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

    $('#displayOpr').html(operators);
    if (operator != operators) {
      operator = operators;
      expression += operator;
      inputHistory += operators;
      count = 0;
      return count;
    }
  }

  function secondNum() {
    $('#displayNum').html(currentInput);
    $('#displayOpr').html('');
    hasOPerator = false;
  }

  $eqlSym.click(() => {

    calculationOutput = math.evaluate(inputHistory);
    console.log(calculationOutput);
    $('#displayOpr').html('=');
    $('#displayNum').html(calculationOutput);
    inputHistory = 0;
    inputHistory += calculationOutput;
    operator = 0;
    equal = true;
    count = 0;
  });

  function clr() {
    if (equal == true) {
      $('#displayNum').html('');
      $('#displayOpr').html('');
    }
    equal = false;
  }
});
