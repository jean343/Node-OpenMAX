//This file is auto-generated from 'node headerGeneration/generateComponents.js' 
var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');
var OMX_STATETYPE = require('./OMX_STATETYPE');
var OMX_INDEXTYPE = require('./OMX_INDEXTYPE');

function ImageFx() {
  if (!(this instanceof ImageFx)) {
    return new ImageFx();
  }
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
  this.component.setPorts(190, 191);

  self.on('finish', function () {
    console.log('ImageFx on finish');
    self.component.emptyBuffer(undefined, function () {
      self.component.changeState(OMX_STATETYPE.OMX_StateIdle);
      self.component.changeState(OMX_STATETYPE.OMX_StateLoaded);
    });
  });
}

ImageFx.prototype = new Component('image_fx');



module.exports = ImageFx;
