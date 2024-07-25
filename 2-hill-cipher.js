const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const charToNum = {
  'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
  'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18,
  'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25,
  ' ': 26, '?': 27, '!': 28
};

const numToChar = {
  0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
  10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S',
  19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z',
  26: ' ', 27: '?', 28: '!'
};

const M1 = [
  [6, 11],
  [25, 15]
];

const M2 = [
  [28, 7],
  [19, 18]
];

const M3 = [
  [21, 21],
  [17, 24]
];

const M4 = [
  [26, 6],
  [8, 5]
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
  if (choice === 'encrypt') {
    console.log('Please enter the text (even count, uppercase A-Z only):');
  } else {
    console.log('Please enter the text (even count, uppercase A-Z, space, ?, or ! only):');
  }
  
  rl.question('', (text) => {
    const validationMessage = getValidationMessage(text, choice);
    if (validationMessage === '') {
      if (choice === 'encrypt') {
        console.log('You chose to encrypt.');
        console.log('Input text:', text);
        const vectors = createVectors(text);
        console.log('Input vectors (V1):', vectors);
        const [v2Vectors, encryptedVectors] = encryptVectors(vectors);
        console.log('Vectors after first encryption (V2):', v2Vectors);
        console.log('Vectors after second encryption (V3):', encryptedVectors);
        const encryptedMessage = convertVectorsToString(encryptedVectors);
        console.log('Encrypted message:', encryptedMessage);
      } else {
        console.log('You chose to decrypt.');
        console.log('Input text:', text);
        const vectors = createVectors(text);
        console.log('Input vectors (V3):', vectors);
        const [v2Vectors, decryptedVectors] = decryptVectors(vectors);
        console.log('Vectors after first decryption (V2):', v2Vectors);
        console.log('Vectors after second decryption (V1):', decryptedVectors);
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
  const isUppercase = text === text.toUpperCase();
  const hasEvenLength = text.length % 2 === 0;
  const validEncryptChars = /^[A-Z]+$/;
  const validDecryptChars = /^[A-Z ?!]+$/;
  let message = '';

  if (!isUppercase) {
    message += 'Text must be all uppercase characters. ';
  }
  if (!hasEvenLength) {
    message += 'Text must have an even count of characters. ';
  }
  if (choice === 'encrypt' && !validEncryptChars.test(text)) {
    message += 'Text must contain only A-Z characters for encryption. ';
  }
  if (choice === 'decrypt' && !validDecryptChars.test(text)) {
    message += 'Text must contain only A-Z, " ", "?", or "!" characters for decryption.';
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
  const v2Vectors = [];
  const encryptedVectors = vectors.map(vector => {
    let v2 = matrixMultiply(M1, vector);
    v2 = mod(v2, 26);
    v2Vectors.push(v2);
    let v3 = matrixMultiply(M2, v2);
    v3 = mod(v3, 29);
    return v3;
  });
  return [v2Vectors, encryptedVectors];
}

function decryptVectors(vectors) {
  const v2Vectors = [];
  const decryptedVectors = vectors.map(vector => {
    let v2 = matrixMultiply(M4, vector);
    v2 = mod(v2, 29); 
    v2Vectors.push(v2);
    let v1 = matrixMultiply(M3, v2);
    v1 = mod(v1, 26);
    return v1;
  });
  return [v2Vectors, decryptedVectors];
}

function convertVectorsToString(vectors) {
  return vectors.flat().map(num => numToChar[num]).join('');
}

promptForChoice();
