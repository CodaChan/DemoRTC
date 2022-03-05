const express = require('express') // express = express
const app = express() // app = express()

const fs = require('fs')
const options = {
    key: fs.readFileSync(__dirname + '/ssl/nginx.key'),
    cert: fs.readFileSync(__dirname + '/ssl/nginx.crt')
};

const server = require('https').Server(options, app) // server = https.Server(express())
const io = require('socket.io')(server) // io = socket.io(https.Server(express()))
const { v4:uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId)
        })
    })
})

server.listen(5001)