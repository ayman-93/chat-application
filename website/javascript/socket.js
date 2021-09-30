const socket = io('http://localhost:3000');

const user = JSON.parse(localStorage.getItem("user"));

const chatBox = document.getElementById('chatBox');
const messageBox = document.getElementById('txtBox');

messageBox.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        sendMessage();
    }
    // e.preventDefault();
})


socket.emit('public-chat', user)

socket.on('chat-message', data => {
    console.log("chat-message ", `name ${data.name}: message ${data.message}`);
    appendMessage(data.name, data.message)
})

socket.on('user-connected', user => {
    appendUsers(user.socketId, user.name, user.id)
})

socket.on('user-disconnected', userSocketId => {
    removeUsers(userSocketId)
})

socket.on('connected-users', (users, messages) => {
    // retrieve  all messages from the server
    if (messages !== null) {
        messages.forEach(message => {
            appendMessage(message.name, message.message)
        });
    }
    // retrieve  online users from the server
    for (const userSocketId in users) {
        appendUsers(userSocketId, users[userSocketId].name, users[userSocketId].id)
    }
})

socket.on('not-loged-in', () => {
    localStorage.clear();
    window.location.replace('login.html');
})



function appendMessage(userName, message) {
    const messageElement = createMessageElement(userName, atob(message), (user.name !== userName))
    chatBox.appendChild(messageElement)
    chatBox.scrollTop = chatBox.scrollHeight;
}

const appendUsers = (userSocketId, userName, id) => {
    const userElement = createUserElement(userSocketId, userName, id);
    document.getElementById('users').appendChild(userElement);
}

const removeUsers = (userSocketId) => {
    const userLi = document.getElementById(userSocketId)
    userLi.parentNode.removeChild(userLi)
}

const sendMessage = () => {
    // add user message to the chat box
    const messageBase64 = btoa(messageBox.value);
    appendMessage(user.name, messageBase64)
    // send the message to the server
    socket.emit('send-chat-message', messageBase64)
    messageBox.value = ''
}