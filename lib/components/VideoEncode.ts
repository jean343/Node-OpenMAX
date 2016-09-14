// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../index')

export class VideoEncode extends omx.Component {
  constructor(name?: string) {
    super('video_encode', name);
    this.setPorts(200, 201);
  }

  // ---- Text can be edited below this line --------
  setVideoPortFormat (eCompressionFormat: omx.OMX_VIDEO_CODINGTYPE) {
    var format = {
      eCompressionFormat: eCompressionFormat
    };
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);
    return this;
  };
  // ---- Text can be edited above this line --------
}