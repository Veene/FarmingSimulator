const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.set('port', 5000)
app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(5000, () => {
    console.log('starting server on port 5000')
})

let players = {};
io.on('connection', (socket) => {
    //when a client joins, it emits a new players message, and this socket.on handler activates when it receives it.
    socket.on('new player', () => {
        console.log(`Player ${socket.id} has joined.`)
        players[socket.id] = {
            x: 300,
            y: 300
        }
    })
    socket.on('movement', (data) => {
    
            let player = players[socket.id] || {}
            if(data.left) {
                player.x -= 5
            }
            if(data.up) {
                player.y -= 5
            }
            if(data.right) {
                player.x += 5
            }
            if(data.down) {
                player.y += 5
            }
        
    })
})

setInterval(() => {
    io.sockets.emit('state', players)
}, 1000/60)

