var stream = require('stream');
var Readable = require('stream').Readable;
var rs = Readable();

var a = 0;

rs._read = function () {
  var self = this;
  setTimeout(function () {
    if (a > 20)
      return self.push(null);
    self.push('' + (a++));
  }, 100);
};

var Transform = require('stream').Transform;
var t = Transform();
t._transform = function (chunk, encoding, done) {
  this.push(chunk + 'transformed');
  done();
};


var Writable = require('stream').Writable;
var ws = Writable();
ws._write = function (chunk, enc, next) {
  console.log(chunk.toString());
  next();
};

rs.pipe(t).pipe(ws);