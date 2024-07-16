const palindromes = function (str) {
  const validChars = "abcdefghijklmnopqrstuvwxys0123456789";

  let cleanedNewStr = str.toLowerCase().split("").filter(char => validChars.includes(char)).join("");
  let reverseStr = cleanedNewStr.split("").reverse().join("");
  
  return cleanedNewStr === reverseStr;
};

// Do not edit below this line
module.exports = palindromes;
