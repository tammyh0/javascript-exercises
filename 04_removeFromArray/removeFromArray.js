const removeFromArray = function(items, ...removeItems) {
  const result = items.filter(item => {
    for (const removeItem of removeItems) {
      if (item === removeItem) {
        return false;
      }
    }
    return true;
  });

  return result;
};

// Do not edit below this line
module.exports = removeFromArray;
