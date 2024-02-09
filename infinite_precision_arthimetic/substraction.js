/**
 * Function to pad the smaller number array with zeros
 * to make both arrays of equal length.
 * @param {number[]} numberArray1 - The first number array.
 * @param {number[]} numberArray2 - The second number array.
 */
function padArrays(numberArray1, numberArray2) {
  // Determine the maximum length between the two arrays
  const maxLength = Math.max(numberArray1.length, numberArray2.length);

  // If numberArray1 is smaller, add leading zeros to numberArray1
  if (numberArray1.length < maxLength) {
    numberArray1.unshift(...Array(maxLength - numberArray1.length).fill(0));
  } else if (numberArray2.length < maxLength) {
    // If numberArray2 is smaller, add leading zeros to numberArray2
    numberArray2.unshift(...Array(maxLength - numberArray2.length).fill(0));
  }
}

/**
 * Function to subtract two digits with borrow.
 * @param {number} digit1 - The first digit.
 * @param {number} digit2 - The second digit.
 * @param {number} borrow - The borrow from the previous subtraction.
 * @returns {object} An object containing the result digit and
 *  the borrow for the next subtraction.
 */
function subtractDigitsWithBorrow(digit1, digit2, borrow) {
  // Validate input: digit1 and digit2 must be numbers
  if (typeof digit1 !== "number" || typeof digit2 !== "number") {
    throw new Error("Invalid input: digit1 and digit2 must be numbers.");
  }

  // Validate input: digit1, digit2, and borrow must be non-negative
  if (digit1 < 0 || digit2 < 0 || borrow < 0) {
    throw new Error(
      "Invalid input: digit1, digit2, and borrow must be non-negative."
    );
  }

  // Validate input: digit1 and digit2 must be between 0 and 9
  if (digit1 > 9 || digit2 > 9 || borrow > 1) {
    throw new Error("Invalid input: digit1, digit2 must be between 0 and 9.");
  }

  // Calculate the difference between digit1 and digit2 with borrow
  let difference = (digit1 || 0) - (digit2 || 0) - borrow;

  // Adjust difference and borrow if the result is negative
  if (difference < 0) {
    difference += 10;
    borrow = 1;
  } else {
    borrow = 0;
  }

  // Return the result digit and the borrow for the next subtraction
  return { resultDigit: difference.toString(), nextBorrow: borrow };
}

/**
 * Function to find the index of the first non-zero digit in the result.
 * @param {string} resultString - The result string.
 * @returns {number} The index of the first non-zero digit.
 */
function findFirstNonZeroIndex(resultString) {
  // Initialize the index of the first non-zero digit
  let index = 0;

  // Find the index of the first non-zero digit in the result string
  while (index < resultString.length && resultString[index] === "0") {
    index++;
  }

  // Return the index of the first non-zero digit
  return index;
}

/**
 * Function to perform subtraction of two arrays representing numbers.
 * @param {number[]} numberArray1 - The first number array.
 * @param {number[]} numberArray2 - The second number array.
 * @returns {string} The subtraction result as a string.
 */
function subtract(numberArray1, numberArray2) {
  // Validate input: numberArray1 and numberArray2 must be arrays
  if (!Array.isArray(numberArray1) || !Array.isArray(numberArray2)) {
    throw new Error(
      "Invalid input: numberArray1 and numberArray2 must be arrays."
    );
  }

  // Validate input: numberArray1 and numberArray2 must contain only numbers
  if (numberArray1.some(isNaN) || numberArray2.some(isNaN)) {
    throw new Error(
      "Invalid input: numberArray1 and numberArray2 must contain only numbers."
    );
  }

  // Validate input: numberArray1 and numberArray2 must contain non-negative numbers
  if (
    numberArray1.some((num) => num < 0) ||
    numberArray2.some((num) => num < 0)
  ) {
    throw new Error(
      "Invalid input: numberArray1 and numberArray2 must contain non-negative numbers."
    );
  }

  // Pad the arrays to make them of equal length
  padArrays(numberArray1, numberArray2);

  // Determine the sign of the result by comparing the arrays digit by digit
  let comparison = numberArray1.join("") > numberArray2.join("") ? 1 : -1;
  if (numberArray1.join("") === numberArray2.join("")) {
    return "0";
  }

  // If numberArray1 is smaller, swap numberArray1 and numberArray2
  if (comparison === -1) {
    [numberArray1, numberArray2] = [numberArray2, numberArray1];
  }

  // Initialize variables for the subtraction algorithm
  let result = []; // Resultant array
  let indexA = numberArray1.length - 1; // Index of the last digit in numberArray1
  let indexB = numberArray2.length - 1; // Index of the last digit in numberArray2
  let borrow = 0; // Borrow from the previous subtraction

  // Iterate through the arrays and subtract corresponding digits
  while (indexA >= 0 || indexB >= 0) {
    // Subtract digits with borrow for the current position
    const { resultDigit, nextBorrow } = subtractDigitsWithBorrow(
      numberArray1[indexA],
      numberArray2[indexB],
      borrow
    );

    // Push the result digit to the result array
    result.unshift(resultDigit);

    // Update the borrow for the next subtraction
    borrow = nextBorrow;

    // Move to the next position in both arrays
    indexA--;
    indexB--;
  }

  // Add negative sign if necessary
  if (comparison === -1) {
    result.unshift("-"); // Add negative sign to the beginning of the result array
  }

  // Convert the result array to a string
  let resultString = result.join("");

  // Find the index of the first non-zero digit
  let firstNonZeroIndex = findFirstNonZeroIndex(resultString);

  // Return the substring starting from the first non-zero digit
  // (remove leading zeros)
  return firstNonZeroIndex === resultString.length
    ? "0"
    : resultString.substring(firstNonZeroIndex);
}
/**
 * Function to test the 'subtraction' function with different scenarios.
 */
function testingFunction() {
  try {
    console.log(subtract([0, 1, 1], [7, 7]));
    console.log(subtract([1, 2, 3, 5], [4, 5, 6]));
    console.log(subtract([5], [2, 1, 3]));
    console.log(subtract([2, 1, 2], [2, 1, 2]));
    console.log(subtract([10, 5, 6], [2, 1]));
  } catch (error) {
    console.error(error.message);
  }
}

testingFunction();
