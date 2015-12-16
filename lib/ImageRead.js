//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');
var OMX_STATETYPE = require('./OMX_STATETYPE');
var OMX_INDEXTYPE = require('./OMX_INDEXTYPE');

function ImageRead() {
  if (!(this instanceof ImageRead)) {
    return new ImageRead();
  }
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
  this.component.setPorts(0, 310);

  self.on('finish', function () {
    console.log('ImageRead on finish');
    self.component.emptyBuffer(undefined, function () {
      self.component.changeState(OMX_STATETYPE.OMX_StateIdle);
      self.component.changeState(OMX_STATETYPE.OMX_StateLoaded);
    });
  });
}

ImageRead.prototype = new Component('image_read');



module.exports = ImageRead;
