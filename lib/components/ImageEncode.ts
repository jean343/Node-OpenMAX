//This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../')

export class ImageEncode extends omx.Component {
  constructor(name?: string) {
    super('image_encode', name);
    this.setPorts(340, 341);
  }
  
  setInputFormat (eCompressionFormat: omx.OMX_IMAGE_CODINGTYPE) {
    var format = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamImagePortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamImagePortFormat, format);
    return this;
  };

}