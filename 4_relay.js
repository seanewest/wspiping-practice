var WebSocketServer = require('ws').Server
var websocket = require('websocket-stream')
var through2 = require('through2')

var broadcastPipe = through2();

var wss = new WebSocketServer({port: 3000})
wss.on('connection', function(ws) {
  var wsstream = websocket(ws)
  wsstream.pipe(broadcastPipe).pipe(wsstream)
})
