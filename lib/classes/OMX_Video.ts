import omx = require('../../index')
export class VIDEO_PORTDEFINITIONTYPE {
  pNativeRender;
  nFrameWidth: number;
  nFrameHeight: number;
  nStride: number;
  nSliceHeight: number;
  nBitrate: number;
  xFramerate: number;
  bFlagErrorConcealment: boolean;
  eCompressionFormat: omx.VIDEO_CODINGTYPE;
  eColorFormat: omx.COLOR_FORMATTYPE;
  pNativeWindow;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_PORTFORMATTYPE {
  nIndex: number;
  eCompressionFormat: omx.VIDEO_CODINGTYPE;
  eColorFormat: omx.COLOR_FORMATTYPE;
  xFramerate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_QUANTIZATIONTYPE {
  nQpI: number;
  nQpP: number;
  nQpB: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_VIDEOFASTUPDATETYPE {
  bEnableVFU: boolean;
  nFirstGOB: number;
  nFirstMB: number;
  nNumMBs: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_BITRATETYPE {
  eControlRate: omx.VIDEO_CONTROLRATETYPE;
  nTargetBitrate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_MOTIONVECTORTYPE {
  eAccuracy: omx.VIDEO_MOTIONVECTORTYPE;
  bUnrestrictedMVs: boolean;
  bFourMV: boolean;
  sXSearchRange: number;
  sYSearchRange: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_INTRAREFRESHTYPE {
  eRefreshMode: omx.VIDEO_INTRAREFRESHTYPE;
  nAirMBs: number;
  nAirRef: number;
  nCirMBs: number;
  nPirMBs: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_ERRORCORRECTIONTYPE {
  bEnableHEC: boolean;
  bEnableResync: boolean;
  nResynchMarkerSpacing: number;
  bEnableDataPartitioning: boolean;
  bEnableRVLC: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_VBSMCTYPE {
  b16x16: boolean;
  b16x8: boolean;
  b8x16: boolean;
  b8x8: boolean;
  b8x4: boolean;
  b4x8: boolean;
  b4x4: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_H263TYPE {
  nPFrames: number;
  nBFrames: number;
  eProfile: omx.VIDEO_H263PROFILETYPE;
  eLevel: omx.VIDEO_H263LEVELTYPE;
  bPLUSPTYPEAllowed: boolean;
  nAllowedPictureTypes: number;
  bForceRoundingTypeToZero: boolean;
  nPictureHeaderRepetition: number;
  nGOBHeaderInterval: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_MPEG2TYPE {
  nPFrames: number;
  nBFrames: number;
  eProfile: omx.VIDEO_MPEG2PROFILETYPE;
  eLevel: omx.VIDEO_MPEG2LEVELTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_MPEG4TYPE {
  nSliceHeaderSpacing: number;
  bSVH: boolean;
  bGov: boolean;
  nPFrames: number;
  nBFrames: number;
  nIDCVLCThreshold: number;
  bACPred: boolean;
  nMaxPacketSize: number;
  nTimeIncRes: number;
  eProfile: omx.VIDEO_MPEG4PROFILETYPE;
  eLevel: omx.VIDEO_MPEG4LEVELTYPE;
  nAllowedPictureTypes: number;
  nHeaderExtension: number;
  bReversibleVLC: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_WMVTYPE {
  eFormat: omx.VIDEO_WMVFORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_RVTYPE {
  eFormat: omx.VIDEO_RVFORMATTYPE;
  nBitsPerPixel: number;
  nPaddedWidth: number;
  nPaddedHeight: number;
  nFrameRate: number;
  nBitstreamFlags: number;
  nBitstreamVersion: number;
  nMaxEncodeFrameSize: number;
  bEnablePostFilter: boolean;
  bEnableTemporalInterpolation: boolean;
  bEnableLatencyMode: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_AVCTYPE {
  nSliceHeaderSpacing: number;
  nPFrames: number;
  nBFrames: number;
  bUseHadamard: boolean;
  nRefFrames: number;
  nRefIdx10ActiveMinus1: number;
  nRefIdx11ActiveMinus1: number;
  bEnableUEP: boolean;
  bEnableFMO: boolean;
  bEnableASO: boolean;
  bEnableRS: boolean;
  eProfile: omx.VIDEO_AVCPROFILETYPE;
  eLevel: omx.VIDEO_AVCLEVELTYPE;
  nAllowedPictureTypes: number;
  bFrameMBsOnly: boolean;
  bMBAFF: boolean;
  bEntropyCodingCABAC: boolean;
  bWeightedPPrediction: boolean;
  nWeightedBipredicitonMode: number;
  bconstIpred: boolean;
  bDirect8x8Inference: boolean;
  bDirectSpatialTemporal: boolean;
  nCabacInitIdc: number;
  eLoopFilterMode: omx.VIDEO_AVCLOOPFILTERTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_PROFILELEVELTYPE {
  /**
   * type is OMX_VIDEO_AVCPROFILETYPE, OMX_VIDEO_H263PROFILETYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
   */
  eProfile: number;
  /**
   * type is OMX_VIDEO_AVCLEVELTYPE, OMX_VIDEO_H263LEVELTYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
   */
  eLevel: number;
  /**
   * Used to query for individual profile support information, This parameter is valid only for OMX_IndexParamVideoProfileLevelQuerySupported index, For all other indices this parameter is to be ignored.
   */
  nProfileIndex: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_CONFIG_BITRATETYPE {
  nEncodeBitrate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_FRAMERATETYPE {
  /**
   * Q16 format
   */
  xEncodeFramerate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_INTRAREFRESHVOPTYPE {
  IntraRefreshVOP: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_MACROBLOCKERRORMAPTYPE {
  /**
   * Size of the Error Map in bytes
   */
  nErrMapSize: number;
  /**
   * Error map hint
   */
  ErrMap: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_MBERRORREPORTINGTYPE {
  bEnabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_MACROBLOCKSTYPE {
  nMacroblocks: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_PARAM_AVCSLICEFMO {
  nNumSliceGroups: number;
  nSliceGroupMapType: number;
  eSliceMode: omx.VIDEO_AVCSLICEMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_CONFIG_AVCINTRAPERIOD {
  nIDRPeriod: number;
  nPFrames: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_CONFIG_NALSIZE {
  nNaluBytes: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
