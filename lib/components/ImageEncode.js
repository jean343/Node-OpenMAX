//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

var util = require('util');
var omx = require('../../');
var Component = omx.Component;
var ILCLIENT_CREATE_FLAGS = omx.ILCLIENT_CREATE_FLAGS;
var OMX_STATETYPE = omx.Core.OMX_STATETYPE;
var OMX_INDEXTYPE = omx.Index.OMX_INDEXTYPE;

function ImageEncode() {
  if (!(this instanceof ImageEncode)) {
    return new ImageEncode();
  }
  Component.call(this, 'image_encode'); // call parent constructor
  
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
  this.component.setPorts(340, 341);
}

util.inherits(ImageEncode, Component);

ImageEncode.prototype.setInputFormat = function (eCompressionFormat) {
  var format = this.component.getParameter(this.component.out_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat);
  format.eCompressionFormat = eCompressionFormat;
  this.component.setParameter(this.component.out_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat, format);
};

module.exports = ImageEncode;
