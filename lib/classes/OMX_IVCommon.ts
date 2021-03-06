import omx = require('../../index')
export class CONFIG_COLORCONVERSIONTYPE {
  /**
   * Stored in signed Q16 format
   */
  xColorMatrix: number;
  /**
   * Stored in signed Q16 format
   */
  xColorOffset: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_SCALEFACTORTYPE {
  /**
   * Fixed point value stored as Q16
   */
  xWidth: number;
  /**
   * Fixed point value stored as Q16
   */
  xHeight: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_IMAGEFILTERTYPE {
  eImageFilter: omx.IMAGEFILTERTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_COLORENHANCEMENTTYPE {
  bColorEnhancement: boolean;
  nCustomizedU: number;
  nCustomizedV: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_COLORKEYTYPE {
  nARGBColor: number;
  nARGBMask: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_COLORBLENDTYPE {
  nRGBAlphaConstant: number;
  eColorBlend: omx.COLORBLENDTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class FRAMESIZETYPE {
  nWidth: number;
  nHeight: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_ROTATIONTYPE {
  nRotation: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_MIRRORTYPE {
  eMirror: omx.MIRRORTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_POINTTYPE {
  nX: number;
  nY: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_RECTTYPE {
  nLeft: number;
  nTop: number;
  nWidth: number;
  nHeight: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_DEBLOCKINGTYPE {
  bDeblocking: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_FRAMESTABTYPE {
  bStab: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_WHITEBALCONTROLTYPE {
  eWhiteBalControl: omx.WHITEBALCONTROLTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_EXPOSURECONTROLTYPE {
  eExposureControl: omx.EXPOSURECONTROLTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_SENSORMODETYPE {
  nFrameRate: number;
  bOneShot: boolean;
  sFrameSize: omx.FRAMESIZETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CONTRASTTYPE {
  nContrast: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRIGHTNESSTYPE {
  nBrightness: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BACKLIGHTTYPE {
  nBacklight: number;
  nTimeout: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_GAMMATYPE {
  nGamma: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_SATURATIONTYPE {
  nSaturation: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_LIGHTNESSTYPE {
  nLightness: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_PLANEBLENDTYPE {
  nDepth: number;
  nAlpha: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_INTERLEAVETYPE {
  bEnable: boolean;
  nInterleavePortIndex: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_TRANSITIONEFFECTTYPE {
  eEffect: omx.TRANSITIONEFFECTTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_DATAUNITTYPE {
  eUnitType: omx.DATAUNITTYPE;
  eEncapsulationType: omx.DATAUNITENCAPSULATIONTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_DITHERTYPE {
  /**
   * Type of dithering to use
   */
  eDither: omx.DITHERTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CAPTUREMODETYPE {
  /**
   * If true then ignore frame rate and emit capture data as fast as possible (otherwise obey port's frame rate).
   */
  bContinuous: boolean;
  /**
   * If true then terminate capture after the port emits the specified number of frames (otherwise the port does not terminate the capture until instructed to do so by the client). Even if set, the client may manually terminate the capture prior to reaching the limit.
   */
  bFrameLimited: boolean;
  /**
   * Limit on number of frames emitted during a capture (only valid if bFrameLimited is set).
   */
  nFrameLimit: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_EXPOSUREVALUETYPE {
  eMetering: omx.METERINGTYPE;
  /**
   * Fixed point value stored as Q16
   */
  xEVCompensation: number;
  /**
   * e.g. nApertureFNumber = 2 implies "f/2" - Q16 format
   */
  nApertureFNumber: number;
  /**
   * Whether aperture number is defined automatically
   */
  bAutoAperture: boolean;
  /**
   * Shutterspeed in milliseconds
   */
  nShutterSpeedMsec: number;
  /**
   * Whether shutter speed is defined automatically
   */
  bAutoShutterSpeed: boolean;
  /**
   * e.g. nSensitivity = 100 implies "ISO 100"
   */
  nSensitivity: number;
  /**
   * Whether sensitivity is defined automatically
   */
  bAutoSensitivity: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_FOCUSREGIONTYPE {
  bCenter: boolean;
  bLeft: boolean;
  bRight: boolean;
  bTop: boolean;
  bBottom: boolean;
  bTopLeft: boolean;
  bTopRight: boolean;
  bBottomLeft: boolean;
  bBottomRight: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_FOCUSSTATUSTYPE {
  eFocusStatus: omx.FOCUSSTATUSTYPE;
  bCenterStatus: boolean;
  bLeftStatus: boolean;
  bRightStatus: boolean;
  bTopStatus: boolean;
  bBottomStatus: boolean;
  bTopLeftStatus: boolean;
  bTopRightStatus: boolean;
  bBottomLeftStatus: boolean;
  bBottomRightStatus: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
