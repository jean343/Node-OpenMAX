//This file is auto-generated from 'node headerGeneration/generateComponents.js' 
var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');
var OMX_STATETYPE = require('./OMX_STATETYPE');
var OMX_INDEXTYPE = require('./OMX_INDEXTYPE');

function NullSink() {
  if (!(this instanceof NullSink)) {
    return new NullSink();
  }
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS);
  this.component.setPorts(240, 0);

  self.on('finish', function () {
    console.log('NullSink on finish');
    self.component.emptyBuffer(undefined, function () {
      self.component.changeState(OMX_STATETYPE.OMX_StateIdle);
      self.component.changeState(OMX_STATETYPE.OMX_StateLoaded);
    });
  });
}

NullSink.prototype = new Component('null_sink');



module.exports = NullSink;
