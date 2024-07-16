const fibonacci = function(num) {
  let target = Number(num);

  let firstNum = 0;
  let secondNum = 1;

  if (target < 0) {
    return "OOPS";
  } else {
    for (let i = 1; i <= target; i++) {
      const nextNum = firstNum + secondNum; 
      firstNum = secondNum;
      secondNum = nextNum;
    }
    return firstNum;
  }
};

// Do not edit below this line
module.exports = fibonacci;
