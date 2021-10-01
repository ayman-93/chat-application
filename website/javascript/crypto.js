

const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
}

const decryptMessage = (ciphertext, senderName = null) => {
    if (senderName != null) {
        secretKey = [senderName, user.name].sort().join();
    }
    try {
        return CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);
    } catch {
        return "";
    }
}

