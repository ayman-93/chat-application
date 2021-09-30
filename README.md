# Chat Application

## Application Description
Chat Application is Encrypted messaging provides end-to-end encryption for user-to-user text messaging.

## Requirements
XAMPP: to run the php files <br>
Nodejs: to run the socket server.

## Installation

first clone the project 
```bash
git clone https://github.com/ayman-93/chat-application.git 
```

copy the project folder to hdocs folder(default path for windows 'C:\xampp\htdocs') of xampp application, to run the php files<br>
open the project folder in terminal and run
```bash
npm i
```
to install the node_modules requred for the node server.

```bash
npm start
```
to run the node server<br>
open xampp application and start appache server.

## Info
used php and sqlite to make the authencation api<br>
node.js to run the socket server and store messages in sqlite database (same database of authentication)


## Used library for the website
Bootstrap 4.3<br>
Crypto.js

## Used Library for node.js server
Express.js<br>
Socket.IO<br>
Sqlite3<br>
knex


## Refrances
https://bootstrapious.com/p/bootstrap-chat (theme)
