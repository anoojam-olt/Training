    const $displayNumber = $('#displayNum');
    const $displayOperator = $('#displayOpr');
    let inputHistory = '';
    let currentInput = '';
    let hasOperator = false;
    let equal = false;
    let operator = '';
    let expression = '';
    
    $('.container').on('click', 'button', function() {
        const buttonValue = $(this).text();

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
    });

    function clearDisplay() {
        $displayNumber.html('');
        $displayOperator.html('');
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
                if (currentInput.length < 27) {
                    currentInput += '.';
                    showNumber(currentInput);
                    inputHistory += '.';
                }
            }
        } else {
            if (hasOperator) {
                currentInput = '';
            } else if (equal) {
                inputHistory = '';
                currentInput = '';
                equal = false;
            }
            if (currentInput.length < 27) {
                currentInput += value;
                showNumber(currentInput);
                inputHistory += value;
                operator = '';
            }
        }
    }

    function addOperatorToDisplay(oper) {
        hasOperator = true;

        $displayOperator.html(oper);
        if (operator !== oper) {
            operator = oper;
            expression += operator;
            inputHistory += operator;
            count = 0;
        }
    }

    function addDecimalPointToDisplay() {
        if (!currentInput.includes('.') && (!equal || (equal && hasOperator))) {
            if (!hasOperator) {
                currentInput += '.';
                showNumber(currentInput);
                inputHistory += '.';
            } else {
                currentInput = operator;
                showNumber(currentInput);
                inputHistory += operator + '.';
                hasOperator = false;
            }
        }
    }

    function showNumber(numbers) {
        clearIfEqual();
        $displayNumber.html(numbers);
        if (hasOperator) {
            showSecondNumber();
        }
    }

    function showSecondNumber() {
        $displayNumber.html(currentInput);
        $displayOperator.html('');
        hasOperator = false;
    }

    function calculate() {
        if (inputHistory && !equal) {
            const calculationOutput = math.evaluate(inputHistory);
            $displayOperator.html('=');
            $displayNumber.html(Number(calculationOutput.toFixed(12)));
            inputHistory = calculationOutput.toString();
            operator = '';
            equal = true;
            count = 0;
        }
    }

    function clearIfEqual() {
        if (equal) {
            $displayNumber.html('');
            $displayOperator.html('');
        }
        equal = false;
    }
