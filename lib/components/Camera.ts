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
    var vf: omx.PARAM_PORTDEFINITIONTYPE = this.getParameter(this.out_port, omx.INDEXTYPE.IndexParamPortDefinition);
    vf.video.nSliceHeight = vf.video.nFrameHeight;
    this.setParameter(this.out_port, omx.INDEXTYPE.IndexParamPortDefinition, vf);
    return this;
  };
  enable(): Camera {
    var format: omx.CONFIG_PORTBOOLEANTYPE = this.getParameter(this.out_port, omx.INDEXTYPE.IndexConfigPortCapturing);
    format.bEnabled = true;
    this.setParameter(this.out_port, omx.INDEXTYPE.IndexConfigPortCapturing, format);
    return this;
  };
  disable(): Camera {
    var format: omx.CONFIG_PORTBOOLEANTYPE = this.getParameter(this.out_port, omx.INDEXTYPE.IndexConfigPortCapturing);
    format.bEnabled = false;
    this.setParameter(this.out_port, omx.INDEXTYPE.IndexConfigPortCapturing, format);
    return this;
  };

  getDigitalZoom(): omx.CameraZoom {
    var p: omx.CONFIG_SCALEFACTORTYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonDigitalZoom);
    return p.xWidth;
  }
  setDigitalZoom(zoom?: omx.CameraZoom) {
    if (zoom === undefined) zoom = omx.CameraZoom.CAMERA_ZOOM_1X;
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonDigitalZoom, new omx.CONFIG_SCALEFACTORTYPE({
      xWidth: zoom,
      xHeight: zoom
    }));
  }

  getCamplusId(): number {
    var p: omx.PARAM_U32TYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexParamCameraCamplusId);
    return p.nU32;
  }
  setCamplusId(nU32: number) {
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexParamCameraCamplusId, {
      nU32: nU32
    });
  }

  getCameraDeviceNumber(): number {
    var p: omx.PARAM_U32TYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexParamCameraDeviceNumber);
    return p.nU32;
  }
  setCameraDeviceNumber(nU32: number) {
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexParamCameraDeviceNumber, {
      nU32: nU32
    });
  }

  getCameraDevicesPresent(): number {
    var p: omx.PARAM_U32TYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexParamCameraDevicesPresent);
    return p.nU32;
  }

  getFrameStabilisation(): boolean {
    var p: omx.CONFIG_FRAMESTABTYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonFrameStabilisation);
    return p.bStab;
  }
  setFrameStabilisation(enabled?: boolean) {
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonFrameStabilisation, { bStab: enabled });
  }

  getExposure(): omx.EXPOSURECONTROLTYPE {
    var p: omx.CONFIG_EXPOSURECONTROLTYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonExposure);
    return p.eExposureControl;
  }
  setExposure(exposureControl?: omx.EXPOSURECONTROLTYPE) {
    if (exposureControl === undefined) exposureControl = omx.EXPOSURECONTROLTYPE.ExposureControlAuto;
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonExposure, { eExposureControl: exposureControl });
  }

  getExposureValue(): omx.CONFIG_EXPOSUREVALUETYPE {
    var p: omx.CONFIG_EXPOSUREVALUETYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonExposureValue);
    return p;
  }
  setExposureValue(value?: omx.CONFIG_EXPOSUREVALUETYPE) {
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonExposureValue, value);
  }

  getFocusControl(): number {
    var p: omx.IMAGE_CONFIG_FOCUSCONTROLTYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexConfigFocusControl);
    return p.nFocusSteps;
  }
  setFocusControl(nContrast?: number) {
    if (nContrast === undefined) nContrast = 0;
    nContrast = clamp(nContrast, -100, 100);
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexConfigFocusControl, { nContrast: nContrast });
  }

  getContrast(): number {
    var p: omx.CONFIG_CONTRASTTYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonContrast);
    return p.nContrast;
  }
  setContrast(nContrast?: number) {
    if (nContrast === undefined) nContrast = 0;
    nContrast = clamp(nContrast, -100, 100);
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonContrast, { nContrast: nContrast });
  }

  getBrightness(): number {
    var p: omx.CONFIG_BRIGHTNESSTYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonBrightness);
    return p.nBrightness;
  }
  setBrightness(nBrightness?: number) {
    if (nBrightness === undefined) nBrightness = 50;
    nBrightness = clamp(nBrightness, 0, 100);
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonBrightness, { nBrightness: nBrightness });
  }

  getSaturation(): number {
    var p: omx.CONFIG_SATURATIONTYPE = this.getParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonSaturation);
    return p.nSaturation;
  }
  setSaturation(nSaturation?: number) {
    if (nSaturation === undefined) nSaturation = 0;
    nSaturation = clamp(nSaturation, -100, 100);
    this.setParameter(omx.ALL, omx.INDEXTYPE.IndexConfigCommonSaturation, { nSaturation: nSaturation });
  }

  getVideoFramerate(): number {
    var p: omx.CONFIG_FRAMERATETYPE = this.getParameter(this.out_port, omx.INDEXTYPE.IndexConfigVideoFramerate);
    return p.xEncodeFramerate >> 16;
  }
  setVideoFramerate(fps?: number) {
    if (fps === undefined) fps = 30;
    this.setParameter(this.out_port, omx.INDEXTYPE.IndexConfigVideoFramerate, { xEncodeFramerate: fps << 16 });
  }
  // ---- Text can be edited above this line --------
}