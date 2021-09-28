// take the secret key from the user
let secritKedyValue = prompt("Please enter your secret key")
secretKey.value = secritKedyValue;
const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, secretKey.value).toString();
}

const decryptMessage = (ciphertext) => {
    try {
        return CryptoJS.AES.decrypt(ciphertext, secretKey.value).toString(CryptoJS.enc.Utf8);
    } catch {
        return "";
    }
}

