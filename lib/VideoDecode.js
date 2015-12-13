var Node_OMX = require('bindings')('Node_OMX');
var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');

//function VideoDecode() {
//  if (!(this instanceof VideoDecode)) {
//    return new VideoDecode();
//  }
//  var component = new Component("video_decode", ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS);
//  component.setPorts(130, 131);
//}

function VideoDecode() {
  if (!(this instanceof VideoDecode)) {
    return new VideoDecode();
  }
//  console.log('this', this, this.__proto__);
  this.component.setPorts(130, 131);
}

VideoDecode.prototype = new Component("video_decode", ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS);

module.exports = VideoDecode;