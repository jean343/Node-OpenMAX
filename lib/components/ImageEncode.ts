//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

import util = require('util')
import omx = require('../../')

export class ImageEncode extends omx.Component {
  constructor() {
    super('image_encode');
    var self = this;
    this.init(omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
    this.component.setPorts(340, 341);
  }
  
  setInputFormat (eCompressionFormat: omx.OMX_IMAGE_CODINGTYPE) {
    var format = this.component.getParameter(this.component.out_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.component.setParameter(this.component.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamImagePortFormat, format);
  };
}