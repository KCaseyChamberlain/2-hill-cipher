# 2-Hill Cipher

## Application PreRequisites

- **Encryption**:
  - Input string must be all capitals A-Z.
  - Must have an even count of characters.

- **Decryption**:
  - Input string must be all capitals A-Z.
  - Can include a space, question mark, and/or exclamation mark.
  - Must have an even count of characters.

## Predefined Characteristics

- A=0, B=1, C=2, …, “space”=26, “?”=27, “!”=28.
- \( M1 = \begin{bmatrix} 6 & 11 \\ 25 & 15 \end{bmatrix} \)
- \( M2 = \begin{bmatrix} 28 & 7 \\ 19 & 18 \end{bmatrix} \)
- \( M3 = \text{Modular inverse of } M1 = \begin{bmatrix} 21 & 21 \\ 17 & 24 \end{bmatrix} \)
- \( M4 = \text{Modular inverse of } M2 = \begin{bmatrix} 26 & 6 \\ 8 & 5 \end{bmatrix} \)

> **Note**: Initial run for both encryption and decryption will validate prerequisite requirements are fulfilled.

## Encryption Process

1. **Character to Numerical Value Assignment**:
   - Assign each character in the input string to its corresponding numerical value.

2. **Create Vertex Array**:
   - Create an array to store inner arrays, each representing a 2x1 vertex.
   - Each vertex holds two numerical values representing specific characters from the input string.

3. **Encrypt Each Vertex**:
   - For each vertex \( V1 \):
     - Multiply: \( V2 = (M1 \times V1) \mod 26 \).
     - Multiply: \( V3 = (M2 \times V2) \mod 29 \).

4. **Convert Encrypted Values to String**:
   - Convert each number value in \( V3 \) to its corresponding character.
   - Print the encrypted message.

## Decryption Process

1. **Character to Numerical Value Assignment**:
   - Assign each character in the input string to its corresponding numerical value.

2. **Create Vertex Array**:
   - Create an array to store inner arrays, each representing a 2x1 vertex.
   - Each vertex holds two numerical values representing specific characters from the input string.

3. **Decrypt Each Vertex**:
   - For each vertex \( V3 \):
     - Multiply: \( V2 = M4 \times V3 \).
     - Multiply: \( V1 = M3 \times V2 \).

4. **Convert Decrypted Values to String**:
   - Convert each number value in \( V1 \) to its corresponding character.
   - Print the decrypted message.
