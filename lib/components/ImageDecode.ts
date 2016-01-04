//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

import util = require('util')
import omx = require('../../')

export class ImageDecode extends omx.Component {
  constructor() {
    super('image_decode');
    var self = this;
    this.init(omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
    this.component.setPorts(320, 321);
  }
  
  setInputFormat (eCompressionFormat: omx.OMX_IMAGE_CODINGTYPE) {
    var format = this.component.getParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.component.setParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat, format);
  };
}