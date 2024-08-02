const CryptoJS = require('crypto-js');

// Encrypt function
export function encrypt(value, secretKey = 'test') {
    try {
        const ciphertext = CryptoJS.AES.encrypt(value, secretKey).toString();
        return ciphertext;
    } catch (error) {
        console.error('Error encrypting value:', error);
        return null;
    }
}

// Decrypt function
export function decrypt(encryptedvalue, secretKey = 'test') {
    try {
        // Check if encryptedvalue is defined
        if (!encryptedvalue) {
            throw new Error('Encrypted value is undefined');
        }

        const bytes = CryptoJS.AES.decrypt(encryptedvalue, secretKey);
        const originalvalue = bytes.toString(CryptoJS.enc.Utf8);

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