//This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../')

export class ImageDecode extends omx.Component {
  constructor(name?: string) {
    super('image_decode', name);
    this.setPorts(320, 321);
  }
  
  setInputFormat (eCompressionFormat: omx.OMX_IMAGE_CODINGTYPE) {
    var format = this.getParameter(this.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamImagePortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.setParameter(this.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamImagePortFormat, format);
  };

}