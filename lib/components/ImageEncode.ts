// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../index')

export class ImageEncode extends omx.Component {
  constructor(name?: string) {
    super('image_encode', name);
    this.setPorts(340, 341);
  }

  // ---- Text can be edited below this line --------
  setInputFormat(eCompressionFormat: omx.IMAGE_CODINGTYPE) {
    var format: omx.IMAGE_PARAM_PORTFORMATTYPE = this.getParameter(this.out_port, omx.INDEXTYPE.IndexParamImagePortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.setParameter(this.out_port, omx.INDEXTYPE.IndexParamImagePortFormat, format);
    return this;
  };
  // ---- Text can be edited above this line --------
}