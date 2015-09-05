var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendfile('index.html')
})

var redCount = 0
var blueCount = 0

io.on('connection', function (socket) {
  io.emit('chat message', {
    red: redCount,
    blue: blueCount
  })
  socket.on('chat message', function (color) {
    if (color === 'red') {
      redCount++
    } else if (color === 'blue') {
      blueCount++
    }
    io.emit('chat message', {
      red: redCount,
      blue: blueCount
    })
  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})
