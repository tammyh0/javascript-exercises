const MAX_DISPLAY_LENGTH = 7;
const INITIAL_DISPLAY_VALUE = '0';

// Improvement #1: Encapsulate logic within a module or IIFE to prevent global namespace pollution (no global variables please!)
// Here, we encapsulate the entire calculator into an IIFE (Immediately Invoked Function Expression) called Calculator
// Inside Calculator, we return the init function to expose it and we're able to call it outside Calculator to start it up
const Calculator = () => {
  let displayValue = INITIAL_DISPLAY_VALUE;
  let firstOperandInput = '';
  let secondOperandInput = '';
  let operatorInput = '';

  const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const numBtns = document.querySelectorAll('.number');
      const operationBtns = document.querySelectorAll('.operation');
      const equalBtn = document.querySelector('#equals');
      const clearBtn = document.querySelector('#clear');
      const backBtn = document.querySelector('#back');
      const pointBtn = document.querySelector('#point');

      numBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          handleNumInput(btn.textContent);
          updateDisplayScreen();
          updateOperandInput();
        });
      });

      operationBtns.forEach((btn) => {
        btn.addEventListener('click', () =>
          handleOperatorInput(btn.textContent)
        );
      });

      equalBtn.addEventListener('click', () => {
        if (firstOperandInput && operatorInput) {
          operate();
          updateDisplayScreen();
        }
      });
      clearBtn.addEventListener('click', () => {
        clear();
        updateDisplayScreen();
      });
      backBtn.addEventListener('click', () => {
        if (displayValue !== INITIAL_DISPLAY_VALUE) {
          deleteNum();
          updateDisplayScreen();
        }
      });
      pointBtn.addEventListener('click', () => {
        handlePoint();
        updateDisplayScreen();
      });
    });
  };

  const updateDisplayScreen = () => {
    const display = document.querySelector('#screen');
    display.innerText =
      displayValue.length > MAX_DISPLAY_LENGTH
        ? Number(displayValue).toExponential(1)
        : displayValue;
  };

  const updateOperandInput = () => {
    if (!operatorInput) {
      firstOperandInput = displayValue;
    } else {
      secondOperandInput = displayValue;
    }
  }

  const handleNumInput = (num) => {
    if (displayValue === 'Error') {
      clear();
      updateDisplayScreen();
      displayValue = num;
    } else if (firstOperandInput === '-') {
      displayValue = firstOperandInput + num;
    } else if (
      displayValue === INITIAL_DISPLAY_VALUE ||
      (firstOperandInput && !secondOperandInput && operatorInput)
    ) {
      displayValue = num;
    } else if (displayValue.length < MAX_DISPLAY_LENGTH) {
      displayValue += num;
    }
  };

  const handleOperatorInput = (operator) => {
    if (firstOperandInput && !secondOperandInput) {
      operatorInput = operator;
      displayValue = INITIAL_DISPLAY_VALUE;
    } else if (firstOperandInput && secondOperandInput) {
      firstOperandInput = calculateTotal().toString();
      displayValue = firstOperandInput;
      secondOperandInput = '';
      operatorInput = operator;
      updateDisplayScreen();
    } else if (!firstOperandInput && !secondOperandInput && operator === '-') {
      firstOperandInput = operator;
    }
  };

  // Improvement #2: Used a switch statement for better readability
  const calculateTotal = () => {
    const numOne = Number(firstOperandInput);
    const numTwo = Number(secondOperandInput);
    switch (operatorInput) {
      case '+':
        return add(numOne, numTwo);
      case '-':
        return subtract(numOne, numTwo);
      case 'x':
        return multiply(numOne, numTwo);
      case '/':
        return divide(numOne, numTwo);
      default:
        return 0;
    }
  };

  const operate = () => {
    if (!secondOperandInput) {
      secondOperandInput = firstOperandInput;
    }
    displayValue = calculateTotal().toString();
    firstOperandInput = displayValue;
    secondOperandInput = '';
  };

  const clear = () => {
    displayValue = INITIAL_DISPLAY_VALUE;
    firstOperandInput = '';
    secondOperandInput = '';
    operatorInput = '';
  };

  const deleteNum = () => {
    if (!secondOperandInput) {
      firstOperandInput = firstOperandInput.slice(0, -1);
      displayValue = firstOperandInput;
    } else {
      secondOperandInput = secondOperandInput.slice(0, -1);
      displayValue = secondOperandInput;
    }
  };

  const handlePoint = () => {
    if (!secondOperandInput && !firstOperandInput.includes('.')) {
      firstOperandInput += '.';
      displayValue = firstOperandInput;
    } else if (secondOperandInput && !secondOperandInput.includes('.')) {
      secondOperandInput += '.';
      displayValue = secondOperandInput;
    }
  };

  // Improvement #3: We turned each function declaration into an arrow function since it's more modern and for readability
  const add = (numOne, numTwo) => numOne + numTwo;
  const subtract = (numOne, numTwo) => numOne - numTwo;
  const multiply = (numOne, numTwo) => numOne * numTwo;
  const divide = (numOne, numTwo) => (numTwo === 0 ? 'Error' : numOne / numTwo);

  // Expose the init function to start the calculator
  return { init };
};

Calculator().init();
