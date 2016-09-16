import omx = require('../../index')
export class OMX_BUFFERFRAGMENTTYPE {
  /**
   * number of bytes in the buffer
   */
  nLen: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_IJGSCALINGTYPE {
  bEnabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_DISPLAYRECTTYPE {
  x_offset: number;
  y_offset: number;
  width: number;
  height: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_DISPLAYREGIONTYPE {
  set: omx.OMX_DISPLAYSETTYPE;
  num: number;
  fullscreen: boolean;
  transform: omx.OMX_DISPLAYTRANSFORMTYPE;
  dest_rect: omx.OMX_DISPLAYRECTTYPE;
  src_rect: omx.OMX_DISPLAYRECTTYPE;
  noaspect: boolean;
  mode: omx.OMX_DISPLAYMODETYPE;
  pixel_x: number;
  pixel_y: number;
  layer: number;
  copyprotect_required: boolean;
  alpha: number;
  wfc_context_width: number;
  wfc_context_height: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_SOURCETYPE {
  eType: omx.OMX_SOURCETYPE;
  nParam: number;
  nFrameCount: number;
  xFrameRate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_RESIZETYPE {
  eMode: omx.OMX_RESIZEMODETYPE;
  nMaxWidth: number;
  nMaxHeight: number;
  nMaxBytes: number;
  bPreserveAspectRatio: boolean;
  bAllowUpscaling: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_TESTINTERFACETYPE {
  bTest: boolean;
  bSetExtra: boolean;
  nExtra: number;
  bSetError: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_VISUALISATIONTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMAUDIODESTINATIONTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMAUDIOSOURCETYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMAUDIODOWNMIXCOEFFICIENTS {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMAUDIODOWNMIXCOEFFICIENTS8x8 {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMAUDIOMAXSAMPLE {
  nMaxSample: number;
  nTimeStamp: omx.OMX_TICKS;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_PLAYMODETYPE {
  eMode: omx.OMX_PLAYMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_DELIVERYFORMATTYPE {
  eFormat: omx.OMX_DELIVERYFORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CODECCONFIGTYPE {
  bCodecConfigIsComplete: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_STILLSFUNCTIONTYPE {
  bBuffer: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BUFFERADDRESSTYPE {
  nAllocLen: number;
  handle;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_TUNNELSETUPTYPE {
  sSetup: omx.OMX_TUNNELSETUPTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMPORTEGLTYPE {
  bPortIsEGL: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_IMAGEFILTERPARAMSTYPE {
  eImageFilter: omx.OMX_IMAGEFILTERTYPE;
  nNumParams: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_TRANSITIONCONTROLTYPE {
  nPosStart: number;
  nPosEnd: number;
  nPosIncrement: number;
  nFrameIncrement: omx.OMX_TICKS;
  bSwapInputs: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_AUDIOMONOTRACKCONTROLTYPE {
  eMode: omx.OMX_AUDIOMONOTRACKOPERATIONSTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CAMERAIMAGEPOOLTYPE {
  nNumHiResVideoFrames: number;
  nHiResVideoWidth: number;
  nHiResVideoHeight: number;
  eHiResVideoType: omx.OMX_COLOR_FORMATTYPE;
  nNumHiResStillsFrames: number;
  nHiResStillsWidth: number;
  nHiResStillsHeight: number;
  eHiResStillsType: omx.OMX_COLOR_FORMATTYPE;
  nNumLoResFrames: number;
  nLoResWidth: number;
  nLoResHeight: number;
  eLoResType: omx.OMX_COLOR_FORMATTYPE;
  nNumSnapshotFrames: number;
  eSnapshotType: omx.OMX_COLOR_FORMATTYPE;
  eInputPoolMode: omx.OMX_CAMERAIMAGEPOOLINPUTMODETYPE;
  nNumInputVideoFrames: number;
  nInputVideoWidth: number;
  nInputVideoHeight: number;
  eInputVideoType: omx.OMX_COLOR_FORMATTYPE;
  nNumInputStillsFrames: number;
  nInputStillsWidth: number;
  nInputStillsHeight: number;
  eInputStillsType: omx.OMX_COLOR_FORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_IMAGEPOOLSIZETYPE {
  width: number;
  height: number;
  num_pages: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_IMAGEPOOLEXTERNALTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_RUTILFIFOINFOTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_ILFIFOCONFIG {
  /**
   * The size of the FIFO's data area
   */
  nDataSize: number;
  /**
   * The number of headers allocated
   */
  nHeaderCount: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_CAMERASENSORMODETYPE {
  nModeIndex: number;
  nNumModes: number;
  nWidth: number;
  nHeight: number;
  nPaddingRight: number;
  nPaddingDown: number;
  eColorFormat: omx.OMX_COLOR_FORMATTYPE;
  nFrameRateMax: number;
  nFrameRateMin: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMPORTBUFFERSTATSTYPE {
  nCount: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMPORTSTATSTYPE {
  nImageCount: number;
  nBufferCount: number;
  nFrameCount: number;
  nFrameSkips: number;
  nDiscards: number;
  nEOS: number;
  nMaxFrameSize: number;
  nByteCount: omx.OMX_TICKS;
  nMaxTimeDelta: omx.OMX_TICKS;
  /**
   * Number of corrupt macroblocks in the stream
   */
  nCorruptMBs: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMCAMERASTATSTYPE {
  nOutFrameCount: number;
  nDroppedFrameCount: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
