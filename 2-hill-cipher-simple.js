const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const charToNum = {
  'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7, 'i': 8, 'j': 9,
  'k': 10, 'l': 11, 'm': 12, 'n': 13, 'o': 14, 'p': 15, 'q': 16, 'r': 17, 's': 18, 't': 19,
  'u': 20, 'v': 21, 'w': 22, 'x': 23, 'y': 24, 'z': 25,
  'A': 26, 'B': 27, 'C': 28, 'D': 29, 'E': 30, 'F': 31, 'G': 32, 'H': 33, 'I': 34, 'J': 35,
  'K': 36, 'L': 37, 'M': 38, 'N': 39, 'O': 40, 'P': 41, 'Q': 42, 'R': 43, 'S': 44, 'T': 45,
  'U': 46, 'V': 47, 'W': 48, 'X': 49, 'Y': 50, 'Z': 51,
  '0': 52, '1': 53, '2': 54, '3': 55, '4': 56, '5': 57, '6': 58, '7': 59, '8': 60, '9': 61,
  '!': 62, '@': 63, '#': 64, '$': 65, '%': 66, '^': 67, '&': 68, '*': 69, '(': 70, ')': 71,
  '?': 72
};

const numToChar = {
  0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', 9: 'j',
  10: 'k', 11: 'l', 12: 'm', 13: 'n', 14: 'o', 15: 'p', 16: 'q', 17: 'r', 18: 's', 19: 't',
  20: 'u', 21: 'v', 22: 'w', 23: 'x', 24: 'y', 25: 'z',
  26: 'A', 27: 'B', 28: 'C', 29: 'D', 30: 'E', 31: 'F', 32: 'G', 33: 'H', 34: 'I', 35: 'J',
  36: 'K', 37: 'L', 38: 'M', 39: 'N', 40: 'O', 41: 'P', 42: 'Q', 43: 'R', 44: 'S', 45: 'T',
  46: 'U', 47: 'V', 48: 'W', 49: 'X', 50: 'Y', 51: 'Z',
  52: '0', 53: '1', 54: '2', 55: '3', 56: '4', 57: '5', 58: '6', 59: '7', 60: '8', 61: '9',
  62: '!', 63: '@', 64: '#', 65: '$', 66: '%', 67: '^', 68: '&', 69: '*', 70: '(', 71: ')',
  72: '?'
};

const M1 = [
  [12, 25],
  [17, 20]
];

const M2 = [
  [65, 10],
  [36, 39]
];

function promptForChoice() {
  rl.question('Would you like to Encrypt or Decrypt? ', (answer) => {
    if (answer.toLowerCase() === 'encrypt' || answer.toLowerCase() === 'decrypt') {
      promptForText(answer.toLowerCase());
    } else {
      console.log('Invalid choice. Please choose either "Encrypt" or "Decrypt".');
      promptForChoice();
    }
  });
}

function promptForText(choice) {
  console.log(`Please enter the text (even count, characters a-z, A-Z, 0-9, ! @ # $ % ^ & * ( ) ?):`);

  rl.question('', (text) => {
    const validationMessage = getValidationMessage(text, choice);
    if (validationMessage === '') {
      if (choice === 'encrypt') {
        console.log('You chose to encrypt.');
        console.log('Input text:', text);
        const vectors = createVectors(text);
        console.log('Input vectors (V1):', vectors);
        const encryptedVectors = encryptVectors(vectors);
        console.log('Encrypted vectors (V2):', encryptedVectors);
        const encryptedMessage = convertVectorsToString(encryptedVectors);
        console.log('Encrypted message:', encryptedMessage);
      } else {
        console.log('You chose to decrypt.');
        console.log('Input text:', text);
        const vectors = createVectors(text);
        console.log('Input vectors (V2):', vectors);
        const decryptedVectors = decryptVectors(vectors);
        console.log('Decrypted vectors (V1):', decryptedVectors);
        const decryptedMessage = convertVectorsToString(decryptedVectors);
        console.log('Decrypted message:', decryptedMessage);
      }
      setTimeout(() => {
        console.log('\nRestarting...\n');
        promptForChoice();
      }, 5000);
    } else {
      console.log(validationMessage);
      promptForText(choice);
    }
  });
}

function getValidationMessage(text, choice) {
  const hasEvenLength = text.length % 2 === 0;
  const validChars = /^[a-zA-Z0-9!@#$%^&*()?\s]+$/;
  let message = '';

  if (!hasEvenLength) {
    message += 'Text must have an even count of characters. ';
  }
  if (!validChars.test(text)) {
    message += 'Text contains invalid characters. Only a-z, A-Z, 0-9, !@#$%^&*()? allowed. ';
  }

  return message;
}

function createVectors(text) {
  const vectors = [];
  for (let i = 0; i < text.length; i += 2) {
    const vector = [charToNum[text[i]], charToNum[text[i + 1]]];
    vectors.push(vector);
  }
  return vectors;
}

function matrixMultiply(matrix, vector) {
  const result = [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1]
  ];
  return result;
}

function mod(vector, modValue) {
  return vector.map(value => ((value % modValue) + modValue) % modValue);
}

function encryptVectors(vectors) {
  return vectors.map(vector => {
    let v2 = matrixMultiply(M1, vector);
    return mod(v2, 73);
  });
}

function decryptVectors(vectors) {
  return vectors.map(vector => {
    let v1 = matrixMultiply(M2, vector);
    return mod(v1, 73);
  });
}

function convertVectorsToString(vectors) {
  return vectors.flat().map(num => numToChar[num]).join('');
}

promptForChoice();