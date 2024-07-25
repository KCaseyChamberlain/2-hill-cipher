Hill 2-Cipher Encryption and Decryption System

Application PreReq: 
Input string for encryption must be all capitals A-Z, and have an even count of characters. 
Input string for decryption must be all capitals A-Z and can include a space, question mark, and/or exclamation mark. Decryption input string must also have an even count of characters.

Predefined Characteristics: 
A=0, B=1, C=2, …, “space”=26, “?”=27, “!”=28.
M1 = [6 11 25 15]
M2 = [28 7 19 18]
M3 = Modular inverse M1 = [21 21 17 24]
M4 = Module inverse M2 = [26 6 8 5]

***Initial run for both encryption and decryption will validate prerequisite requirements are fulfilled.

Encryption:
First, we will assign each character to a numerical value.
The code will create an array that will store inner arrays that will represent a 2x1 vertex. In the order of the input string, each vertex will hold two numerical values that each represents a specific character.
For each inner array that represents a vertex (we will call this V1) that needs encryption the application will:
Multiply (M1 * V1) % 26 = V2. (This will result in a new 2x1 vertex.)
Multiply(M2 * V2) % 29 = V3. (This will result in a new 2x1 vertex.)
V3 now has an encrypted value of 0-28, which represents A-Z, “space”, “?”, and “!”.
The code will then take each of these number values in order, convert them to a string and print the encrypted message.

Decryption:
First, we will assign each character to a numerical value.
The code will create an array that will store inner arrays that will represent a 2x1 vertex. In the order of the input string, each vertex will hold two numerical values that each represents a specific character.
For each inner array that represents a vertex (we will call this V3) that needs decryption the application will:
Multiply (M4 * V3) = V2. (This will result in a new 2x1 vertex.)
Multiply(M3 * V2) = V1. (This will result in a new 2x1 vertex.)
V1 now has the decrypted value of 0-25, which represents A-Z.
The code will then take each of these number values in order, convert them to a string and print the decrypted message.
