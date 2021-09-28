const socket = io('http://localhost:3000');


const chatBox = document.getElementById('chatBox');
const messageBox = document.getElementById('txtBox');

const user = JSON.parse(localStorage.getItem("user"));

// const { name, email, id } = user;

socket.emit('new-user', user)

socket.on('chat-message', data => {
    console.log("chat-message ", `name ${data.name}: message ${data.message}`);
    appendMessage(data.name, data.message)
})

socket.on('user-connected', user => {
    appendUsers(user.socketId, user.name)
})

socket.on('user-disconnected', user => {
    removeUsers(user)
})

socket.on('connected-users', (users, messages) => {
    // retrieve  all messages from the server
    console.log(messages);
    if (messages !== null) {
        messages.forEach(message => {
            console.log(message);
            appendMessage(message.name, message.message)
        });
    }
    // retrieve  online users from the server
    for (const user in users) {
        appendUsers(user, users[user].name)
    }
})





function appendMessage(userName, message) {
    const messageElement = document.createElement('li')
    messageElement.innerText = `${userName}: ${atob(message)}`
    chatBox.appendChild(messageElement)
}

const appendUsers = (userSocketId, userName) => {
    const li = document.createElement('li');
    li.id = userSocketId;
    li.innerText = userName;
    document.getElementById('users').appendChild(li);
}

const removeUsers = (user) => {
    const userLi = document.getElementById(user.socketId)
    userLi.parentNode.removeChild(userLi)
}

const sendMessage = () => {
    // add user message to the chat box
    const messageBase64 = btoa(messageBox.value);
    appendMessage(user.name, messageBase64)
    // Buffer.from(str, 'base64') andbuf.toString('base64')
    // send the message to the server
    socket.emit('send-chat-message', messageBase64)
    messageBox.value = ''
}