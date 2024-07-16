const convertToCelsius = function(temp) {
  return Number(((temp - 32) * 5 / 9).toFixed(1));
};

const convertToFahrenheit = function(temp) {
  return Number(((temp * 1.8) + 32).toFixed(1));
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
