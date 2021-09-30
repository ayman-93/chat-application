const socket = io('http://localhost:3000');


const chatBox = document.getElementById('chatBox');
const messageBox = document.getElementById('txtBox');

messageBox.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        sendMessage();
    }
    // e.preventDefault();
})

socket.emit('private-chat', { user, receiver })

socket.on('private-chat-message', data => {
    console.log("receiver.name ", receiver.name);
    console.log("data.name ", data.name);
    if (receiver.name === data.name) {
        appendMessage(data.name, data.message)
    } else {
        document.getElementById("messageFrom").innerText = data.name;
        // const message = 
        document.getElementById("meesage-notification").innerText = atob(decryptMessage(data.message, data.name));
        $('.toast').toast("show");
    }
    console.log("private-chat-message ", `name ${data.name}: message ${data.message}`);
})

socket.on('requeste-private-chat', user => {
    // appendUsers(user.socketId, user.name)
    console.log('private-user-connected ', user.name);
})

// socket.on('private-disconnect', user => {
//     removeUsers(user)
// })

socket.on('retrieve-private-chat', (messages) => {
    // retrieve  all messages from the server
    messages.forEach(message => {
        appendMessage(message.name, message.message)
    });
})

socket.on('not-loged-in', () => {
    localStorage.clear();
    window.location.replace('login.html');
})




function appendMessage(userName, message) {
    const decryptedMessage = decryptMessage(message)
    const messageElement = createMessageElement(userName, atob(decryptedMessage), (user.name !== userName))
    chatBox.appendChild(messageElement)
    chatBox.scrollTop = chatBox.scrollHeight;
}



const sendMessage = () => {
    // add user message to the chat box
    const messageBase64 = btoa(messageBox.value);
    const encryptedMessage = encryptMessage(messageBase64);
    appendMessage(user.name, encryptedMessage);
    console.log('encryptedMessage ', encryptedMessage);
    // send the message to the server
    socket.emit('send-private-chat-message', { encryptedMessage, receiver });
    messageBox.value = '';
}