// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../index')

export class VideoDecode extends omx.Component {
  constructor(name?: string) {
    super('video_decode', name);
    this.setPorts(130, 131);
  }

  // ---- Text can be edited below this line --------
  setVideoPortFormat(eCompressionFormat: omx.VIDEO_CODINGTYPE) {
    var format: omx.VIDEO_PARAM_PORTFORMATTYPE = this.getParameter(this.in_port, omx.INDEXTYPE.IndexParamVideoPortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.setParameter(this.in_port, omx.INDEXTYPE.IndexParamVideoPortFormat, format);
    return this;
  };
  setBufferCount(countIN: number, countOUT: number) {
    var portdef: omx.PARAM_PORTDEFINITIONTYPE = this.getParameter(this.in_port, omx.INDEXTYPE.IndexParamPortDefinition);
    portdef.nBufferCountActual = Math.max(countIN, portdef.nBufferCountMin);
    portdef.nBufferSize = 65536;
    this.setParameter(this.in_port, omx.INDEXTYPE.IndexParamPortDefinition, portdef);

    portdef = this.getParameter(this.out_port, omx.INDEXTYPE.IndexParamPortDefinition);
    portdef.nBufferCountActual = Math.max(countOUT, portdef.nBufferCountMin);
    this.setParameter(this.out_port, omx.INDEXTYPE.IndexParamPortDefinition, portdef);
    return this;
  };
  // ---- Text can be edited above this line --------
}