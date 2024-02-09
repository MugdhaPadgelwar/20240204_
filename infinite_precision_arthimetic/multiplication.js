/**
 * Multiplies two numbers represented as arrays of digits.
 * @param {number[]} numArr1 - The first number represented
 * as an array of digits.
 * @param {number[]} numArr2 - The second number represented
 * as an array of digits.
 * @returns {number[]} - The result of multiplying the two numbers
 * as an array of digits.
 * @throws {Error} - If either input array is empty.
 */
function multiplyArrays(numArr1, numArr2) {
  // Check for inputs
  if (
    numArr1.length === 0 ||
    numArr2.length === 0 ||
    numArr1.some((num) => typeof num !== "number" || num < 0) ||
    numArr2.some((num) => typeof num !== "number" || num < 0)
  ) {
    throw new Error("Invalid input arrays");
  }

  // Reverse both arrays to simplify the multiplication process
  numArr1.reverse();
  numArr2.reverse();

  const result = [];
  const maxLength = numArr1.length + numArr2.length;

  // Initialize the result array with zeros
  for (let i = 0; i < maxLength; i++) {
    result.push(0);
  }

  // Perform multiplication
  for (let i = 0; i < numArr1.length; i++) {
    for (let j = 0; j < numArr2.length; j++) {
      /**  Multiply digits at position i of numArr1 and position j of numArr2
       and add the result to position (i+j) in the result array*/
      result[i + j] += numArr1[i] * numArr2[j];
    }
  }

  // Perform carryover
  for (let i = 0; i < maxLength - 1; i++) {
    // Calculate the carryover by dividing the current digit by 10
    let carryOver = Math.floor(result[i] / 10);
    // Update the current digit to be the remainder of the division
    result[i] = result[i] % 10;
    // Add the carryover to the next digit in the result array
    result[i + 1] += carryOver;
  }

  // Remove leading zeros and reverse the result
  while (result.length > 1 && result[result.length - 1] === 0) {
    result.pop(); // Remove leading zeros from the end of the result array
  }
  result.reverse(); // Reverse the result array to obtain the final result

  return result.join("");
}

// Example usage:
/**
 * Function to test the 'multiplication' function with different scenarios.
 */
function testingFunction() {
  try {
    console.log(multiplyArrays([9, 9, 9], [1, 1, 1]));
    console.log(multiplyArrays([1, 2, 3, 5], [4, 5, 6]));
    console.log(multiplyArrays([5], [2, 1, 3]));
    console.log(multiplyArrays([2, 1, 2], [2, 1, 2]));
    console.log(multiplyArrays([1, 2, 3], [0]));

    console.log(
      multiplyArrays(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3],
        [1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 8, 9, 1, 2, 3]
      )
    );
    console.log(
      multiplyArrays(
        [3, 7, 5, 9, 1, 6, 2, 3, 2, 3],
        [6, 8, 0, 2, 5, 3, 8, 1, 2]
      )
    );
    console.log(multiplyArrays([], []));
  } catch (error) {
    console.error(error.message);
  }
}

testingFunction();
