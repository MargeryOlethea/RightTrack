function capitalizeFirstLetter(inputString) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return inputString;
  }

  return (
    inputString.toLowerCase().charAt(0).toUpperCase() +
    inputString.slice(1).toLowerCase()
  );
}

module.exports = capitalizeFirstLetter;
