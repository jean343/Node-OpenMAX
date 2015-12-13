var fs = require('fs');
var stream = require('stream');
var Readable = require('stream').Readable;
var rs = Readable();
var util = require('util');

var a = 0;
rs._read = function () {
  console.log('rs._read');
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
  console.log('t._transform ');
  this.push(chunk + ' transformed');
  done();
};

var Duplex = require('stream').Duplex;
var Dup = function(options){
  if (!(this instanceof Dup))
    return new Dup(options);
  Duplex.call(this, options);
};
util.inherits(Dup, Duplex);
Dup.prototype._read = function () {
  console.log('dp._read');
};
Dup.prototype._write = function (chunk, enc, next) {
  console.log('dp._write');
  this.push(chunk + ' Duplex');
  next();
};
var dp = new Dup();

var Writable = require('stream').Writable;
var w = Writable();
w._write = function (chunk, enc, next) {
  console.log('w._write');
  this.push(chunk + ' Writable');
  next();
};

var ws = Writable();
ws._write = function (chunk, enc, next) {
  console.log('ws._write');
  console.log(chunk);
//  console.log(chunk.toString());
  next();
};

//rs.pipe(t).pipe(dp).pipe(ws);



fs.createReadStream("test/test.h264").pipe(dp);;//.pipe(ws);