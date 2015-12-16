//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');
var OMX_STATETYPE = require('./OMX_STATETYPE');
var OMX_INDEXTYPE = require('./OMX_INDEXTYPE');

function AudioRender() {
  if (!(this instanceof AudioRender)) {
    return new AudioRender();
  }
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS);
  this.component.setPorts(100, 0);

  self.on('finish', function () {
    console.log('AudioRender on finish');
    self.component.emptyBuffer(undefined, function () {
      self.component.changeState(OMX_STATETYPE.OMX_StateIdle);
      self.component.changeState(OMX_STATETYPE.OMX_StateLoaded);
    });
  });
}

AudioRender.prototype = new Component('audio_render');



module.exports = AudioRender;
