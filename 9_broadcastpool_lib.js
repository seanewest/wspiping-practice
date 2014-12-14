var through = require('through');
var duplex = require('duplexer');

module.exports = BroadcastPool;

function BroadcastPool() {
  var self = this;
  this.streams = [];
  this.createStream = function() {
    var newstream;
    var fromOutside = through(function(data) {
      self.streams.forEach(function(stream) {
        if (stream !== newstream) {
          stream.toOutside.write(data);
        }
      })
    })
    var toOutside = through();

    newstream = duplex(fromOutside, toOutside);
    newstream.toOutside = toOutside;

    self.streams.push(newstream);
    return newstream;
  }
}
