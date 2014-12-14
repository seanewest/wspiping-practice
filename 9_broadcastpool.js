var WebSocketServer = require('ws').Server;
var websocket = require('websocket-stream');
var through = require('through');
var BroadcastPool = require('./9_broadcastpool_lib')

var pool = new BroadcastPool();

var wss = new WebSocketServer({port: 3000})
wss.on('connection', function(ws) {
  var wsstream = websocket(ws)

  process.stdin
    .pipe(through(function (data) {
      var text = data.toString().trim();
      this.queue(text)}))
    .pipe(wsstream)
    .pipe(pool.createStream())
    .pipe(wsstream)
    .pipe(through(function (data) {
      var text = data + "\r\n";
      this.queue(text)}))
    .pipe(process.stdout)
})
