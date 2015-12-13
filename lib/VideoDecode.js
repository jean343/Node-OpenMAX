

var Node_OMX = require('bindings')('Node_OMX');
var Component = require('./Component');
var BLOCK_TYPE = require('./BLOCK_TYPE');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');

function VideoDecode(options) {
  if (!(this instanceof VideoDecode)) {
    return new VideoDecode(options);
  }

  this.component.setPorts(130, 131);
}

VideoDecode.prototype = new Component("video_decode", ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS);

VideoDecode.prototype._read = function () {
};
VideoDecode.prototype._write = function (chunk, enc, next) {
  var inputBuffer = this.component.getInputBuffer(BLOCK_TYPE.DO_BLOCK);
  inputBuffer.set(chunk);
  this.component.emptyBuffer(inputBuffer, function () {
    setTimeout(next, 0);
  });

};

module.exports = VideoDecode;