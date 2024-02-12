/**
 * Calculates the 2's complement binary representation of a number.
 * If the number is negative, returns its 2's complement with the specified length;
 * otherwise, returns the binary representation with leading zeros padded to the specified length.
 * @param {number} number The decimal number to convert.
 * @param {number} numLength The length of the binary representation (optional).
 * @returns {string} The 2's complement or binary representation as a string.
 */
function calculateTwosComplement(number, numLength) {
  // Check if number is negative
  if (number < 0) {
    // Calculate 1's complement
    let onesComplement = (~Math.abs(number) + 1) >>> 0; // Using bitwise NOT and adding 1
    // Convert 1's complement to binary string
    let binaryString = onesComplement.toString(2);

    // Pad with leading zeros to match numLength (if necessary)
    while (binaryString.length < numLength) {
      binaryString = "0" + binaryString;
    }

    // Trim from left if binary string is longer than numLength
    if (binaryString.length > numLength) {
      binaryString = binaryString.substr(binaryString.length - numLength);
    }

    return binaryString;
  } else {
    // Convert positive number to binary string
    let binaryString = (number >>> 0).toString(2);

    // Pad with leading zeros to match numLength (if necessary)
    while (binaryString.length < numLength) {
      binaryString = "0" + binaryString;
    }

    // Trim from left if binary string is longer than numLength
    if (binaryString.length > numLength) {
      binaryString = binaryString.substr(binaryString.length - numLength);
    }

    return binaryString;
  }
}
/**
 * Converts a binary string to its decimal representation.
 * @param {string} binaryString The binary string to convert.
 * @returns {number} The decimal representation of the binary string.
 */
function binaryToDecimal(binaryString) {
  // Convert the binary string to an array of digits (0s and 1s)
  const binaryArray = binaryString.split("").map(Number);

  // Calculate the decimal value using reduceRight
  return binaryArray.reduceRight(
    (acc, digit, index) => acc + digit * 2 ** (binaryArray.length - index - 1),
    0
  );
}
/**
 * Calculates the 2's complement binary representation of a number.
 * @param {number} number The decimal number to convert.
 * @returns {string} The 2's complement binary representation as a string.
 */
function calculateTwosComplement(number) {
  // Check if number is negative
  if (number < 0) {
    // Calculate 1's complement
    let onesComplement = (~Math.abs(number) + 1) >>> 0; // Using bitwise NOT and adding 1
    // Convert 1's complement to binary string
    let binaryString = onesComplement.toString(2);
    return binaryString;
  } else {
    // Convert positive number to binary string
    let binaryString = (number >>> 0).toString(2);
    return binaryString;
  }
}
/**
 * Converts a 2's complement binary string to its decimal representation.
 * @param {string} binaryString The 2's complement binary string to convert.
 * @returns {number} The decimal representation of the 2's complement binary string.
 */
function getDecimalFromTwosComplement(binaryString) {
  // Check if the first bit is 1 (indicating a negative number)
  if (binaryString.charAt(0) === "1") {
    // Convert the binary string to its decimal value
    const decimalValue = parseInt(binaryString, 2);

    // Convert the decimal value to its two's complement representation
    const twosComplement = calculateTwosComplement(binaryString); // Using bitwise NOT and adding 1

    // Return the negative value
    return -twosComplement;
  } else {
    // Convert the binary string to its decimal value
    return parseInt(binaryString, 2);
  }
}

/**
 * Converts a number to its 64-bit representation using IEEE 754 format.
 * @param {number} number The number to convert.
 * @returns {object} An object containing the sign bit, exponent, mantissa, and binary string.
 */
function numberToJsRepresentation(number) {
  // Get the IEEE 754 representation of the number
  const float64Array = new Float64Array(1);
  float64Array[0] = number;
  const int64View = new BigInt64Array(float64Array.buffer);
  const binaryString = int64View[0].toString(2).padStart(64, "0");

  // Separate the signed bit, exponent, and mantissa
  const signBit = binaryString.charAt(0);
  const exponent = binaryString.substring(1, 12);
  const mantissa = binaryString.substring(12);

  return {
    signBit: signBit,
    exponent: exponent,
    mantissa: mantissa,
    binaryString: binaryString,
  };
}

// Example usage:
const inputNumber = 4.35;
const representation = numberToJsRepresentation(inputNumber);
console.log("Input Number:", inputNumber);
console.log("64-bit Representation:");
console.log("Sign Bit:", representation.signBit);
console.log("Exponent:", representation.exponent);
console.log("Mantissa:", representation.mantissa);
console.log("Binary String:", representation.binaryString);

/**
 * Converts a string to js representation
 * @param {string} binaryString The 64-bit binary string to convert.
 * @returns {number} The decimal representation of the 64-bit binary string.
 * @throws {Error} If the binary string is invalid.
 */

function jsBinaryToDecimalReprenstation(binaryString) {
  // Check if the binary string is valid
  if (binaryString.length !== 64 || !/^[01]+$/.test(binaryString)) {
    throw new Error("Invalid 64-bit binary string.");
  }

  // Extract sign bit, exponent, and mantissa from the binary string
  const signBit = binaryString.charAt(0);
  const exponent = binaryString.substring(1, 12);
  const mantissa = binaryString.substring(12);

  // Calculate the decimalJs
  const bias = 1023; // Exponent bias for double-precision floating-point format
  const exponentValue = parseInt(exponent, 2) - bias;
  const mantissaValue = parseInt(mantissa, 2) / Math.pow(2, mantissa.length);
  const decimalValue =
    Math.pow(-1, parseInt(signBit)) *
    (1 + mantissaValue) *
    Math.pow(2, exponentValue);

  return decimalValue;
}

// Example usage:
const binaryString =
  "0100000000010001011001100110011001100110011001100110011001100110";
const decimalNumber = jsBinaryToDecimalReprenstation(binaryString);

console.log("Decimal Number:", decimalNumber);
