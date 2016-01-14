//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

import util = require('util')
import omx = require('../../')

export class VideoDecode extends omx.Component {
  constructor() {
    super('video_decode');
    var self = this;
    this.init();
    this.setPorts(130, 131);
  }
  
  setVideoPortFormat (eCompressionFormat: omx.OMX_VIDEO_CODINGTYPE) {
    var format = this.component.getParameter(this.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
    format.eCompressionFormat = eCompressionFormat;
    this.component.setParameter(this.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);
  };
}