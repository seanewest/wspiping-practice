var WebSocketServer = require('ws').Server
var websocket = require('websocket-stream')
var through2 = require('through2')
var es = require('event-stream')

var broadcastPipe = through2();

var wss = new WebSocketServer({port: 3000})
wss.on('connection', function(ws) {
  var wsstream = websocket(ws)
  process.stdin
    .pipe(es.through(function write(data) {
      var text = data.toString().trim();
      this.emit('data', text)}))
    .pipe(wsstream)
    .pipe(broadcastPipe)
    .pipe(wsstream)
    .pipe(process.stdout)
})
