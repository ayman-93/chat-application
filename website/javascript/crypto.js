// take the secret key from the user
// let secritKedyValue = prompt("Please enter your secret key")

const user = JSON.parse(localStorage.getItem("user"));
const receiver = JSON.parse(localStorage.getItem("receiver"));

secretKey = [receiver.name, user.name].sort().join();
console.log("secretKey out ", secretKey);
const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
}

const decryptMessage = (ciphertext, senderName = null) => {
    if (senderName != null) {
        console.log(senderName, user.name);
        secretKey = [senderName, user.name].sort().join();
        console.log("secretKey in ", secretKey);

    }
    try {
        return CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);
    } catch {
        return "";
    }
}

