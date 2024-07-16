const reverseString = function(string) {
  const reversedString = [];
  const splitString = string.split("");
  for (const char of splitString) {
    reversedString.unshift(char);
  }

  return reversedString.join("");
};

// Do not edit below this line
module.exports = reverseString;
