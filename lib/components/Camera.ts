// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../')

export class Camera extends omx.Component {
  constructor(name?: string) {
    super('camera', name);
    this.setPorts(73, 71);
  }
  
  // ---- Text can be edited below this line --------
  setFormat() {
    var vf = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
    vf.video.nSliceHeight = vf.video.nFrameHeight;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, vf);
    return this;
  };
  enable() {
    var format = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing);
    format.bEnabled = 1;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing, format);
    return this;
  };
  disable() {
    var format = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing);
    format.bEnabled = 0;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing, format);
    return this;
  };
  // ---- Text can be edited above this line --------
}