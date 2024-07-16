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
    const display = document.querySelector('h1');
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

Calculator.init();





// BELOW IS OLD CODE THAT ISNT CLEANED UP - ABOVE IS CLEANED UP BY CHATGPT

/*

let displayValue = "0"; 

let firstOperandInput = ""; 
let secondOperandInput = "";  
let operatorInput = ""; 

function startCalculator() {
  document.addEventListener('DOMContentLoaded', () => {

    const numBtns = document.querySelectorAll(".number");
    numBtns.forEach(btn => {
      btn.addEventListener('click', () => handleNumInput(btn.textContent.toString()));
    });

    const operationBtns = document.querySelectorAll(".operation");
    operationBtns.forEach(btn => {
      btn.addEventListener('click', () => handleOperatorInput(btn.textContent.toString()));
    });

    const equalBtn = document.querySelector("#equals");
    equalBtn.addEventListener('click', () => operate());

    const clearBtn = document.querySelector("#clear");
    clearBtn.addEventListener('click', () => clear());

    const backBtn = document.querySelector("#back");
    backBtn.addEventListener('click', () => deleteNum());

    const pointBtn = document.querySelector("#point");
    pointBtn.addEventListener('click', () => handlePoint());
  });
}

function updateDisplayScreen() {
  const display = document.querySelector("h1");
  if (displayValue.length > 7) {
    display.innerText = Number(displayValue).toExponential(1).toString();
  } else {
    display.innerText = displayValue;
  }
}

function handleNumInput(num) {
  if (displayValue === "Error") {
    clear();
    displayValue = num;
  } else if (firstOperandInput === "-") {
    displayValue = firstOperandInput + num;
  } else if (displayValue === "0" || (firstOperandInput && !secondOperandInput && operatorInput)) {
    displayValue = num;
  } else if (displayValue.length < 7) {
    displayValue += num;
  }

  if (!operatorInput) {
    firstOperandInput = displayValue;
  } else {
    secondOperandInput = displayValue;
  }

  updateDisplayScreen();
}

function handleOperatorInput(operator) {
  if (firstOperandInput && !secondOperandInput) { // First operation
    operatorInput = operator;
    displayValue = "0"; 
  } else if (firstOperandInput && secondOperandInput) {  // Consecutive operations
    firstOperandInput = calculateTotal().toString();
    displayValue = firstOperandInput;
    secondOperandInput = "";
    operatorInput = operator;
    updateDisplayScreen();
  } else if (!firstOperandInput && !secondOperandInput && operator === "-") { // Handle negative num
    firstOperandInput = operator;
  }
}

function calculateTotal() {
  let numOne = Number(firstOperandInput);
  let numTwo = Number(secondOperandInput);
  if (operatorInput === "+") {
    return add(numOne, numTwo);
  } else if (operatorInput === "-") {
    return subtract(numOne, numTwo);
  } else if (operatorInput === "x") {
    return multiply(numOne, numTwo);
  } else {
    return divide(numOne, numTwo);
  }
}

function operate() {
  if (firstOperandInput && operatorInput) {
    if (!secondOperandInput) {
      secondOperandInput = firstOperandInput;
    } 
    displayValue = calculateTotal().toString();
    firstOperandInput = displayValue;
    secondOperandInput = "";
    updateDisplayScreen();
  }
}

function clear() {
  displayValue = "0";
  firstOperandInput = "";
  secondOperandInput = "";
  operatorInput = "";
  updateDisplayScreen();
}

function deleteNum() {
  if (displayValue !== "0") {
    if (!secondOperandInput) {
      firstOperandInput = firstOperandInput.slice(0, firstOperandInput.length - 1);
      displayValue = firstOperandInput;
    } else {
      secondOperandInput = firstOperandInput.slice(0, firstOperandInput.length - 1);
      displayValue = secondOperandInput;
    }
    updateDisplayScreen();
  }
}

function handlePoint() {
  if (!secondOperandInput && !firstOperandInput.includes(".")) {
    firstOperandInput += ".";
    displayValue = firstOperandInput;
  } else if (secondOperandInput && !secondOperandInput.includes(".")) {
    secondOperandInput += ".";
    displayValue = secondOperandInput;
  }
  updateDisplayScreen();
}
 
function add(numOne, numTwo) {
  return numOne + numTwo;
}

function subtract(numOne, numTwo) {
  return numOne - numTwo;
}

function multiply(numOne, numTwo) {
  return numOne * numTwo;
}

function divide(numOne, numTwo) {
  if (numTwo === 0) {
    return "Error";
  } else {
    return numOne / numTwo;
  }
}

startCalculator();

*/
