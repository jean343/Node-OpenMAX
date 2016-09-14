// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../')
import clamp = require('clamp')

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

  getDigitalZoom() {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonDigitalZoom);
    return p;
  }
  setDigitalZoom(zoom?: omx.Camera) {
    if (zoom === undefined) zoom = 0x10000;
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonDigitalZoom, {
      xWidth: zoom,
      xHeight: zoom
    });
  }

  getContrast() {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonContrast);
    return p.nContrast;
  }
  setContrast(nContrast?: number) {
    if (nContrast === undefined) nContrast = 0;
    nContrast = clamp(nContrast, -100, 100);
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonContrast, { nContrast: nContrast });
  }

  getBrightness() {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonBrightness);
    return p.nBrightness;
  }
  setBrightness(nBrightness?: number) {
    if (nBrightness === undefined) nBrightness = 50;
    nBrightness = clamp(nBrightness, 0, 100);
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonBrightness, { nBrightness: nBrightness });
  }

  getSaturation() {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonSaturation);
    return p.nSaturation;
  }
  setSaturation(nSaturation?: number) {
    if (nSaturation === undefined) nSaturation = 0;
    nSaturation = clamp(nSaturation, -100, 100);
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonSaturation, { nSaturation: nSaturation });
  }
  // ---- Text can be edited above this line --------
}