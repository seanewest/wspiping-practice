var WebSocketServer = require('ws').Server;
var websocket = require('websocket-stream');
var duplex = require('duplexer');
var through = require('through')

var bstreams = [];
var addToBroadcast = function(stream) {
  bstreams.push(stream);
  stream.on("data", function(data) {
    bstreams.forEach(function(bstream) {
      if (bstream !== stream) {
        bstream.write(data);
      }
    })
  })
}

var wss = new WebSocketServer({port: 3000})
wss.on('connection', function(ws) {
  var wsstream = websocket(ws)
  addToBroadcast(wsstream);

  process.stdin
    .pipe(through(function (data) {
      var text = data.toString().trim();
      this.queue(text)}))
    .pipe(wsstream)
    .pipe(through(function (data) {
      var text = data + "\r\n";
      this.queue(text)}))
    .pipe(process.stdout)

})
