// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../index')

export class ImageDecode extends omx.Component {
  constructor(name?: string) {
    super('image_decode', name);
    this.setPorts(320, 321);
  }

  // ---- Text can be edited below this line --------
  setInputFormat (eCompressionFormat: omx.IMAGE_CODINGTYPE) {
    var format = this.getParameter(this.in_port, omx.INDEXTYPE.IndexParamImagePortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.setParameter(this.in_port, omx.INDEXTYPE.IndexParamImagePortFormat, format);
    return this;
  };
  // ---- Text can be edited above this line --------
}