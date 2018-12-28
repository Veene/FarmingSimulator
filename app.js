
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express()
var server = http.createServer(app);
var io = socketIO(server);

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
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