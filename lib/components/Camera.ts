// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../index')
import clamp = require('clamp')

export class Camera extends omx.Component {
  constructor(name?: string) {
    super('camera', name);
    this.setPorts(73, 71);
  }

  // ---- Text can be edited below this line --------
  setFormat(): Camera {
    var vf = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
    vf.video.nSliceHeight = vf.video.nFrameHeight;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, vf);
    return this;
  };
  enable(): Camera {
    var format = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing);
    format.bEnabled = 1;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing, format);
    return this;
  };
  disable(): Camera {
    var format = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing);
    format.bEnabled = 0;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing, format);
    return this;
  };

  getDigitalZoom(): omx.CameraZoom {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonDigitalZoom);
    return p.xWidth;
  }
  setDigitalZoom(zoom?: omx.CameraZoom) {
    if (zoom === undefined) zoom = omx.CameraZoom.CAMERA_ZOOM_1X;
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonDigitalZoom, {
      xWidth: zoom,
      xHeight: zoom
    });
  }

  getCamplusId(): number {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexParamCameraCamplusId);
    return p.nU32;
  }
  setCamplusId(nU32: number): number {
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexParamCameraCamplusId, {
      nU32: nU32
    });
  }

  getCameraDeviceNumber(): number {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexParamCameraDeviceNumber);
    return p.nU32;
  }
  setCameraDeviceNumber(nU32: number) {
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexParamCameraDeviceNumber, {
      nU32: nU32
    });
  }

  getContrast(): number {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonContrast);
    return p.nContrast;
  }
  setContrast(nContrast?: number) {
    if (nContrast === undefined) nContrast = 0;
    nContrast = clamp(nContrast, -100, 100);
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonContrast, { nContrast: nContrast });
  }

  getBrightness(): number {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonBrightness);
    return p.nBrightness;
  }
  setBrightness(nBrightness?: number) {
    if (nBrightness === undefined) nBrightness = 50;
    nBrightness = clamp(nBrightness, 0, 100);
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonBrightness, { nBrightness: nBrightness });
  }

  getSaturation(): number {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonSaturation);
    return p.nSaturation;
  }
  setSaturation(nSaturation?: number) {
    if (nSaturation === undefined) nSaturation = 0;
    nSaturation = clamp(nSaturation, -100, 100);
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonSaturation, { nSaturation: nSaturation });
  }

  getVideoFramerate(): number {
    var p = this.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigVideoFramerate);
    return p.xEncodeFramerate >> 16;
  }
  setVideoFramerate(fps: number) {
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigVideoFramerate, { xEncodeFramerate: fps << 16 });
  }
  // ---- Text can be edited above this line --------
}