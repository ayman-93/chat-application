const express = require('express');
const app = express();
const http = require('http');
const { emit } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const { isUserExist, saveUserPublicMessage, saveUserPrivateMessage, getMessages, getPrivateMessages } = require('./sqlite')

// Routing
app.use(express.static(__dirname + '/website'));

const users = {}

io.on('connection', socket => {
    socket.on('public-chat', ({ name, email, id }) => {
        console.log("new-user ", socket.id);
        isUserExist(id).then(userExist => {
            if (userExist) {
                getMessages().then(messages => {
                    socket.nsp.to(socket.id).emit("connected-users", users, messages)
                    users[socket.id] = { name, email, id };

                    // if() if user in users don't send
                    socket.broadcast.emit('user-connected', { name, id, socketId: socket.id })

                })
            } else {
                socket.nsp.to(socket.id).emit("not-loged-in", "user Not LogedIn")
                socket.disconnect();
            }
        })
    })

    const getSocketId = (userId) => {
        let value = Object.values(users).find(user => user.id == userId)
        return Object.keys(users).find(key => users[key] === value)
    }

    socket.on('private-chat', ({ user, receiver }) => {

        isUserExist(user.id).then(userExist => {
            if (userExist) {
                getPrivateMessages(user.id, receiver.id).then(messages => {
                    users[socket.id] = { name: user.name, email: user.email, id: user.id };
                    // socket.nsp.to(socket.id).emit("private-connected-users", users[receiver.socketId], messages)
                    // if(Object.values(users).some( user => user.id == receiver.id)){

                    // }

                    socket.nsp.to(socket.id).emit("retrieve-private-chat", messages)
                    const receiverSocketId = getSocketId(receiver.id)
                    socket.broadcast.emit('user-connected', { name: user.name, id: user.id, socketId: socket.id })
                    socket.to(receiverSocketId).emit('private-chat-message', { message: encryptedMessage, name: users[socket.id].name })

                    // socket.to(receiverSocketId).emit('requeste-private-chat', { name: user.name, id: user.id, socketId: socket.id });
                    // socket.to(receiverSocketId).emit('requeste-private-chat', { name: user.name, id: user.id, socketId: socket.id })

                })
            } else {
                socket.nsp.to(socket.id).emit("not-loged-in", "user Not LogedIn")
                socket.disconnect();
            }
        })
    })


    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id].name })

        saveUserPublicMessage(users[socket.id].id, message, users[socket.id].name)
    })

    socket.on('send-private-chat-message', ({ encryptedMessage, receiver }) => {
        const receiverSocketId = getSocketId(receiver.id)
        socket.to(receiverSocketId).emit('private-chat-message', { message: encryptedMessage, name: users[socket.id].name })
        console.log("receiver", receiver);
        console.log("users[socket.id]", users[socket.id]);
        saveUserPrivateMessage(users[socket.id].id, encryptedMessage, users[socket.id].name, receiver.id)
    })

    socket.on('disconnect', () => {
        if (users[socket.id] === undefined) {
            console.log("user disconnect not loged in users", users);
        } else {
            // console.log("user disconnect");
            console.log("user disconnect ", socket.id);
            socket.broadcast.emit('user-disconnected', socket.id)
            delete users[socket.id]
        }
    })



})


server.listen(3000, () => {
    console.log('listening on *:3000');
});