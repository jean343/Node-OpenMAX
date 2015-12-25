//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

var util = require('util');
var omx = require('../../');
var Component = omx.Component;
var ILCLIENT_CREATE_FLAGS = omx.ILCLIENT_CREATE_FLAGS;
var OMX_STATETYPE = omx.Core.OMX_STATETYPE;
var OMX_INDEXTYPE = omx.Index.OMX_INDEXTYPE;

function AudioSplitter() {
  if (!(this instanceof AudioSplitter)) {
    return new AudioSplitter();
  }
  Component.call(this, 'audio_splitter'); // call parent constructor
  
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
  this.component.setPorts(260, 262);

  self.on('finish', function () {
    console.log('AudioSplitter on finish');
    self.component.emptyBuffer(undefined, function () {
      self.component.changeState(OMX_STATETYPE.OMX_StateIdle);
      self.component.changeState(OMX_STATETYPE.OMX_StateLoaded);
    });
  });
}

util.inherits(AudioSplitter, Component);



module.exports = AudioSplitter;
