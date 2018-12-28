
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express()
var server = http.createServer(app);
var io = socketIO(server);

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = {
            id,
            name,
            room: room.toLowerCase()
        }
        this.users.push(user);
        return user
    }
    removeUser(id) {
        //return user that was removed
        let removedUser = this.users.filter((user, i) => user.id === id)
        this.users = this.users.filter((user) => user.id !== id)
        return removedUser[0]
    }
    getUser(id) {
        let getUser = this.users.filter((user, i) => user.id === id)
        return getUser[0]
    }
    getUserList(room) {
        let users = this.users.filter((user) =>  user.room === room);
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

const users = new Users();

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {users})
})

app.get('/game', (req, res) => {
    res.render('game')
})

server.listen(3000, () => {
    console.log('starting up server on port 3000')
})

io.on('connection', (socket) => {
    console.log('New User Connected')

    socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})