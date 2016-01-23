//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

import omx = require('../../')

export class VideoDecode extends omx.Component {
  constructor(name?: string) {
    super('video_decode', name);
    this.setPorts(130, 131);
  }

  setVideoPortFormat(eCompressionFormat: omx.OMX_VIDEO_CODINGTYPE) {
    var format = this.getParameter(this.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.setParameter(this.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);
  };

  setBufferCount(count: number) {
    var portdef = this.getParameter(this.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
    portdef.nBufferCountActual = portdef.nBufferCountMin;
    portdef.nBufferSize = 65536;
    this.setParameter(this.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, portdef);

    portdef = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
    portdef.nBufferCountActual = portdef.nBufferCountMin;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, portdef);
  };
}