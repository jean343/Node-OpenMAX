//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

var util = require('util');
var omx = require('../../');
var Component = omx.Component;
var ILCLIENT_CREATE_FLAGS = omx.ILCLIENT_CREATE_FLAGS;
var OMX_STATETYPE = omx.Core.OMX_STATETYPE;
var OMX_INDEXTYPE = omx.Index.OMX_INDEXTYPE;

function VideoDecode() {
  if (!(this instanceof VideoDecode)) {
    return new VideoDecode();
  }
  Component.call(this, 'video_decode'); // call parent constructor
  
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
  this.component.setPorts(130, 131);
}

util.inherits(VideoDecode, Component);

VideoDecode.prototype.setVideoPortFormat = function (eCompressionFormat) {
  var format = this.component.getParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
  format.eCompressionFormat = eCompressionFormat;
  this.component.setParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);
};

module.exports = VideoDecode;
