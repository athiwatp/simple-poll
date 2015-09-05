var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendfile('index.html')
})

var redCount = 0
var blueCount = 0
var clients = {}

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.on('disconnect', function () {
    delete clients[socket.id]
  })
  socket.on('chat message', function (color) {
    clients[socket.id] = color
    console.log(clients)

    redCount = 0
    blueCount = 0
    for (var key in clients) {
      console.log(key + ' ' + clients[key])
      if (clients[key] === 'red') {
        redCount++
      } else if (clients[key] === 'blue') {
        blueCount++
      }
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
