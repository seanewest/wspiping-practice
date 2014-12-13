var WebSocketServer = require('ws').Server
var websocket = require('websocket-stream')
var wss = new WebSocketServer({port: 3000})
var fs = require('fs');
wss.on('connection', function(ws) {
  var stream = websocket(ws)
  fs.createReadStream('quote.txt').pipe(stream)
})
