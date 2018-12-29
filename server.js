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