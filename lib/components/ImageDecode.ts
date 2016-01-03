//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

import util = require('util')
import omx = require('../../')
var Component = omx.Component;
var ILCLIENT_CREATE_FLAGS = omx.ILCLIENT_CREATE_FLAGS;
var OMX_STATETYPE = omx.OMX_STATETYPE;
var OMX_INDEXTYPE = omx.OMX_INDEXTYPE;

export class ImageDecode extends omx.Component {
  constructor() {
    super('image_decode');
    var self = this;
    this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
    this.component.setPorts(320, 321);
  }
  
  setInputFormat (eCompressionFormat) {
  var format = this.component.getParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat);
  format.eCompressionFormat = eCompressionFormat;
  this.component.setParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat, format);
};
}