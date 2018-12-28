const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express();
const server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.sendFile(index.html)
})

app.get('/game', (req, res) => {
    res.sendFile(game.html)
})

server.listen(port, () => {
    console.log(`server started on port ${port}`)
})
