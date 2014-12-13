var WebSocketServer = require('ws').Server
var websocket = require('websocket-stream')

var wss = new WebSocketServer({port: 3000})
wss.on('connection', function(ws) {
  var stream = websocket(ws)
  process.stdin.pipe(stream)
})
