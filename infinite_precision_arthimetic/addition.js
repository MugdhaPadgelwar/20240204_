/**
 * Function to add two arrays representing numbers.
 * @param {number[]} arr1 - The first array.
 * @param {number[]} arr2 - The second array.
 * @returns {string} The sum of the two arrays as a string.
 * @throws {Error} Empty arrays are not allowed.
 */
function addition(arr1, arr2) {
  //To check if every number of the array is 0
  const allZeros1 = arr1.every((num) => num === 0);
  const allZeros2 = arr2.every((num) => num === 0);

  if (allZeros1 && allZeros2) {
    throw new Error("Both input arrays contain all zeros.");
  }
  // Validate input arrays
  if (arr1.length === 0 || arr2.length === 0) {
    throw new Error("Empty arrays are not allowed.");
  }

  /**
   * Function to add two digits with carry.
   * @param {number} digit1 - The first digit.
   * @param {number} digit2 - The second digit.
   * @param {number} carry - The carry from the previous addition.
   * @returns {object} An object containing the result digit and
   *  the carry for the next addition.
   */
  function addDigitsWithCarry(digit1, digit2, carry) {
    // Calculate the sum of two digits and the carry
    const sum = (digit1 || 0) + (digit2 || 0) + carry;

    // Calculate the result digit
    const resultDigit = sum % 10;

    // Calculate the carry for the next addition
    const nextCarry = Math.floor(sum / 10);

    // Return an object containing the result digit and the carry
    return { resultDigit, nextCarry };
  }

  // Resultant array to store the sum of digits
  let res = [];

  // Initialize indices for iterating through the arrays
  let m = arr1.length - 1;
  let n = arr2.length - 1;

  // Initialize carry for addition
  let carry = 0;

  // Iterate through the arrays and add corresponding digits
  while (m >= 0 || n >= 0 || carry > 0) {
    // Add digits with carry for the current position
    const { resultDigit, nextCarry } = addDigitsWithCarry(
      arr1[m],
      arr2[n],
      carry
    );

    // Push the result digit to the result array
    res.push(resultDigit);

    // Update the carry for the next addition
    carry = nextCarry;

    // Move to the next position in both arrays
    m--;
    n--;
  }

  // Check if the length exceeds a threshold
  if (res.length > 1000000) {
    throw new Error(
      "Array length overflow: The resulting sum array is too large."
    );
  }
  /**  Return the sum as a string, reversing the array to get the 
 correct order of digits*/
  return res.reverse().join("");
}

/**
 * Function to test the 'addition' function with different scenarios.
 */
function testingFunction() {
  try {
    console.log(addition([9, 9], [0, 1, 1]));

    console.log(
      addition(
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [1]
      )
    );

    console.log(addition([0, 0, 0], [0, 0, 0]));
  } catch (error) {
    console.error(error.message);
  }
}

testingFunction();
