// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../index')
import clamp = require('clamp')

export class ExposureValue {
  metering: omx.OMX_METERINGTYPE = omx.OMX_METERINGTYPE.OMX_MeteringModeAverage;
  /**
   * Fixed point value stored as Q16
   */
  eVCompensation = 0;
  /**
   * e.g. nApertureFNumber = 2 implies "f/2" - Q16 format
   */
  apertureFNumber = 0;
  /**
   * Whether aperture number is defined automatically
   */
  autoAperture: boolean = false;
  /**
   * Shutterspeed in milliseconds
   */
  shutterSpeedMsec = 0;
  /**
   * Whether shutter speed is defined automatically
   */
  autoShutterSpeed: boolean = true;
  /**
   * e.g. nSensitivity = 100 implies "ISO 100"
   */
  sensitivity = 0;
  /**
   * Whether sensitivity is defined automatically
   */
  autoSensitivity: boolean = true;

  constructor(p?: any) {
    if (p) {
      this.metering = p.eMetering;
      this.eVCompensation = p.xEVCompensation;
      this.apertureFNumber = p.nApertureFNumber;
      this.autoAperture = !!p.bAutoAperture;
      this.shutterSpeedMsec = p.nShutterSpeedMsec;
      this.autoShutterSpeed = !!p.bAutoShutterSpeed;
      this.sensitivity = p.nSensitivity;
      this.autoSensitivity = !!p.bAutoSensitivity;
    }
  }
}

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

  getCameraDevicesPresent(): number {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexParamCameraDevicesPresent);
    return p.nU32;
  }

  getFrameStabilisation(): boolean {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonFrameStabilisation);
    return !!p.bStab;
  }
  setFrameStabilisation(enabled?: boolean) {
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonFrameStabilisation, { bStab: enabled });
  }

  getExposure(): omx.OMX_EXPOSURECONTROLTYPE {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonExposure);
    return p.eExposureControl;
  }
  setExposure(exposureControl?: omx.OMX_EXPOSURECONTROLTYPE) {
    if (exposureControl === undefined) exposureControl = omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlAuto;
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonExposure, { eExposureControl: exposureControl });
  }

  getExposureValue(): omx.ExposureValue {
    var p = this.getParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonExposureValue);
    return new omx.ExposureValue(p);
  }
  setExposureValue(value?: ExposureValue) {
    Object.assign(new omx.ExposureValue(), value);
    var v = {
      eMetering: value.metering,
      xEVCompensation: value.eVCompensation,
      nApertureFNumber: value.apertureFNumber,
      bAutoAperture: !!value.autoAperture,
      nShutterSpeedMsec: value.shutterSpeedMsec,
      bAutoShutterSpeed: !!value.autoShutterSpeed,
      nSensitivity: value.sensitivity,
      bAutoSensitivity: !!value.autoSensitivity
    };
    this.setParameter(omx.OMX_ALL, omx.OMX_INDEXTYPE.OMX_IndexConfigCommonExposureValue, v);
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
  setVideoFramerate(fps?: number) {
    if (fps === undefined) fps = 30;
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigVideoFramerate, { xEncodeFramerate: fps << 16 });
  }
  // ---- Text can be edited above this line --------
}