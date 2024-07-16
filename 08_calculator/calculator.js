const add = function(num1, num2) {
	return num1 + num2;
};

const subtract = function(num1, num2) {
	return num1 - num2;
};

const sum = function(numArr) {
	const sum = numArr.length > 0 ? numArr.reduce((total, currentValue) => {
    return total + currentValue;
  }) : 0;

  return sum;
};

const multiply = function(numArr) {
  return numArr.reduce((total, currentValue) => {
    return total * currentValue;
  });
};

const power = function(num, powerNum) {
  let result = num;
	for (let i = 1; i < powerNum; i++) {
    result *= num;
  }
  return result;
};

const factorial = function(num) {
  let result = num;
	for (let i = 1; i < num; i++) {
    result *= num - i;
  }
  return num === 0 ? 1 : result;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
