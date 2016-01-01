//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

var util = require('util');
var omx = require('../../');
var Component = omx.Component;
var ILCLIENT_CREATE_FLAGS = omx.ILCLIENT_CREATE_FLAGS;
var OMX_STATETYPE = omx.Core.OMX_STATETYPE;
var OMX_INDEXTYPE = omx.Index.OMX_INDEXTYPE;

function VideoEncode() {
  if (!(this instanceof VideoEncode)) {
    return new VideoEncode();
  }
  Component.call(this, 'video_encode'); // call parent constructor
  
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
  this.component.setPorts(200, 201);
}

util.inherits(VideoEncode, Component);

VideoEncode.prototype.setVideoPortFormat = function (eCompressionFormat) {
  var format = {
    eCompressionFormat: eCompressionFormat
  };
  this.component.setParameter(this.component.out_port, OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);
};

module.exports = VideoEncode;
