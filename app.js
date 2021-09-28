const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const { isUserExist, saveUserPublicMessage, getMessages } = require('./sqlite')

// Routing
app.use(express.static(__dirname + '/website'));

const users = {}

io.on('connection', socket => {
    socket.on('new-user', ({ name, email, id }) => {
        console.log(id);
        isUserExist(id).then(userExist => {
            if (userExist) {
                getMessages().then(messages => {
                    socket.nsp.to(socket.id).emit("connected-users", users, messages)
                    users[socket.id] = { name, email, id };

                    socket.broadcast.emit('user-connected', { name, socketId: socket.id })

                })
            } else {
                socket.disconnect();
            }
        })
    })


    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id].name })

        saveUserPublicMessage(users[socket.id].id, message, users[socket.id].name)
    })

    socket.on('disconnect', () => {
        if (users[socket.id] === undefined) {
            console.log("user disconnect no users", users);
        } else {
            console.log("user disconnect");
            io.emit('user-disconnected', { name: users[socket.id].name, socketId: socket.id })
            delete users[socket.id]
        }
    })

})


server.listen(3000, () => {
    console.log('listening on *:3000');
});