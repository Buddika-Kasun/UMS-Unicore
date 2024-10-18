import "server-only";

const CryptoJS = require('crypto-js');

const secretKey = process.env.ENCRYPTION_KEY;

// Encrypt function
export async function encrypt(value) {
    try {
        const ciphertext = await CryptoJS.AES.encrypt(value, secretKey).toString();
        return ciphertext;
    } catch (error) {
        console.error('Error encrypting value:', error);
        return null;
    }
}

// Decrypt function
export async function decrypt(encryptedvalue) {
    try {
        // Check if encryptedvalue is defined
        if (!encryptedvalue) {
            throw new Error('Encrypted value is undefined');
        }

        const bytes = await CryptoJS.AES.decrypt(encryptedvalue, secretKey);
        const originalvalue = await bytes.toString(CryptoJS.enc.Utf8);

        // Ensure the decryption resulted in a valid string
        if (!originalvalue) {
            throw new Error('Failed to decrypt value');
        }

        return originalvalue;
    } catch (error) {
        console.error('Error decrypting value:', error);
        return null;
    }
}