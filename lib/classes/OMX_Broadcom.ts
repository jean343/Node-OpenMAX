import omx = require('../../index')
export class BUFFERFRAGMENTTYPE {
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
export class PARAM_IJGSCALINGTYPE {
  bEnabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class DISPLAYRECTTYPE {
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
export class CONFIG_DISPLAYREGIONTYPE {
  set: omx.DISPLAYSETTYPE;
  num: number;
  fullscreen: boolean;
  transform: omx.DISPLAYTRANSFORMTYPE;
  dest_rect: omx.DISPLAYRECTTYPE;
  src_rect: omx.DISPLAYRECTTYPE;
  noaspect: boolean;
  mode: omx.DISPLAYMODETYPE;
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
export class PARAM_SOURCETYPE {
  eType: omx.SOURCETYPE;
  nParam: number;
  nFrameCount: number;
  xFrameRate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_RESIZETYPE {
  eMode: omx.RESIZEMODETYPE;
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
export class PARAM_TESTINTERFACETYPE {
  bTest: boolean;
  bSetExtra: boolean;
  nExtra: number;
  bSetError: boolean;
  stateError: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_VISUALISATIONTYPE {
  name: number;
  property: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMAUDIODESTINATIONTYPE {
  sName: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMAUDIOSOURCETYPE {
  sName: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMAUDIODOWNMIXCOEFFICIENTS {
  coeff: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMAUDIODOWNMIXCOEFFICIENTS8x8 {
  coeff: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMAUDIOMAXSAMPLE {
  nMaxSample: number;
  nTimeStamp: omx.TICKS;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_PLAYMODETYPE {
  eMode: omx.PLAYMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_DELIVERYFORMATTYPE {
  eFormat: omx.DELIVERYFORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CODECCONFIGTYPE {
  bCodecConfigIsComplete: number;
  nData: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_STILLSFUNCTIONTYPE {
  bBuffer: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BUFFERADDRESSTYPE {
  nAllocLen: number;
  handle;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_TUNNELSETUPTYPE {
  sSetup: omx.TUNNELSETUPTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMPORTEGLTYPE {
  bPortIsEGL: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_IMAGEFILTERPARAMSTYPE {
  eImageFilter: omx.IMAGEFILTERTYPE;
  nNumParams: number;
  nParams: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_TRANSITIONCONTROLTYPE {
  nPosStart: number;
  nPosEnd: number;
  nPosIncrement: number;
  nFrameIncrement: omx.TICKS;
  bSwapInputs: boolean;
  name: number;
  property: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_AUDIOMONOTRACKCONTROLTYPE {
  eMode: omx.AUDIOMONOTRACKOPERATIONSTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERAIMAGEPOOLTYPE {
  nNumHiResVideoFrames: number;
  nHiResVideoWidth: number;
  nHiResVideoHeight: number;
  eHiResVideoType: omx.COLOR_FORMATTYPE;
  nNumHiResStillsFrames: number;
  nHiResStillsWidth: number;
  nHiResStillsHeight: number;
  eHiResStillsType: omx.COLOR_FORMATTYPE;
  nNumLoResFrames: number;
  nLoResWidth: number;
  nLoResHeight: number;
  eLoResType: omx.COLOR_FORMATTYPE;
  nNumSnapshotFrames: number;
  eSnapshotType: omx.COLOR_FORMATTYPE;
  eInputPoolMode: omx.CAMERAIMAGEPOOLINPUTMODETYPE;
  nNumInputVideoFrames: number;
  nInputVideoWidth: number;
  nInputVideoHeight: number;
  eInputVideoType: omx.COLOR_FORMATTYPE;
  nNumInputStillsFrames: number;
  nInputStillsWidth: number;
  nInputStillsHeight: number;
  eInputStillsType: omx.COLOR_FORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_IMAGEPOOLSIZETYPE {
  width: number;
  height: number;
  num_pages: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_IMAGEPOOLEXTERNALTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_RUTILFIFOINFOTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_ILFIFOCONFIG {
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
export class CONFIG_CAMERASENSORMODETYPE {
  nModeIndex: number;
  nNumModes: number;
  nWidth: number;
  nHeight: number;
  nPaddingRight: number;
  nPaddingDown: number;
  eColorFormat: omx.COLOR_FORMATTYPE;
  nFrameRateMax: number;
  nFrameRateMin: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMPORTBUFFERSTATSTYPE {
  nCount: number;
  sData;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMPORTSTATSTYPE {
  nImageCount: number;
  nBufferCount: number;
  nFrameCount: number;
  nFrameSkips: number;
  nDiscards: number;
  nEOS: number;
  nMaxFrameSize: number;
  nByteCount: omx.TICKS;
  nMaxTimeDelta: omx.TICKS;
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
export class CONFIG_BRCMCAMERASTATSTYPE {
  nOutFrameCount: number;
  nDroppedFrameCount: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMIOPERFSTATSTYPE {
  /**
   * Enable/disable I/O performance statistics
   */
  bEnabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_SHARPNESSTYPE {
  nSharpness: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_FLICKERCANCELTYPE {
  eFlickerCancel: omx.COMMONFLICKERCANCELTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_REDEYEREMOVALTYPE {
  eMode: omx.REDEYEREMOVALTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_FACEDETECTIONCONTROLTYPE {
  eMode: omx.FACEDETECTIONCONTROLTYPE;
  /**
   * number of frames to apply this setting for, 0 for unlimited
   */
  nFrames: number;
  /**
   * maximum number of regions to detect, 0 for unlimited
   */
  nMaxRegions: number;
  /**
   * hint for algorithmic complexity, range is 0-100. 0 for simplest algorithm, 100 for best quality
   */
  nQuality: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_FACEDETECTIONREGIONTYPE {
  /**
   * first requested region number, allowing retrieval of many regions over several requests
   */
  nIndex: number;
  /**
   * total number of detected regions
   */
  nDetectedRegions: number;
  /**
   * number of valid regions in sRegion array When getting, the client sets this to the number of regions available. The component writes region data and updates this field with how many regions have been written to.
   */
  nValidRegions: number;
  /**
   * Width of the image, hence reference for the face coordinates
   */
  nImageWidth: number;
  /**
   * Height of the image, hence reference for the face coordinates
   */
  nImageHeight: number;
  /**
   * variable length array of face regions
   */
  sRegion;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_INTERLACETYPE {
  /**
   * The interlace type of the content
   */
  eMode: omx.INTERLACETYPE;
  /**
   * Whether to repeat the first field
   */
  bRepeatFirstField: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERAISPTUNERTYPE {
  tuner_name: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_IMAGEPTRTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_AFASSISTTYPE {
  eMode: omx.AFASSISTTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_INPUTCROPTYPE {
  /**
   * Fraction of the width for the top left corner of the rectangle
   */
  xLeft: number;
  /**
   * Fraction of the height for the top left corner of the rectangle
   */
  xTop: number;
  /**
   * Fraction of the image width desired
   */
  xWidth: number;
  /**
   * Fraction of the image height desired
   */
  xHeight: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CODECREQUIREMENTSTYPE {
  nCallbackID: number;
  bTryHWCodec: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMEGLIMAGEMEMHANDLETYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_PRIVACYINDICATORTYPE {
  ePrivacyIndicatorMode: omx.PRIVACYINDICATORTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERAFLASHTYPE {
  eFlashType: omx.CAMERAFLASHTYPE;
  bRedEyeUsesTorchMode: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CAMERAFLASHCONFIGTYPE {
  bUsePreFlash: boolean;
  bUseFocusDistanceInfo: boolean;
  eFlashSync: omx.CAMERAFLASHCONFIGSYNCTYPE;
  bIgnoreChargeState: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMAUDIOTRACKGAPLESSPLAYBACKTYPE {
  /**
   * number of samples delay added by the codec
   */
  nDelay: number;
  /**
   * number of silent samples added to the end
   */
  nPadding: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMAUDIOTRACKCHANGECONTROLTYPE {
  nSrcPortIndex: number;
  nDstPortIndex: number;
  nXFade: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMPIXELVALUERANGETYPE {
  ePixelValueRange: omx.BRCMPIXELVALUERANGETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERADISABLEALGORITHMTYPE {
  eAlgorithm: omx.CAMERADISABLEALGORITHMTYPE;
  bDisabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMAUDIOEFFECTCONTROLTYPE {
  bEnable: boolean;
  name: number;
  property: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMMINIMUMPROCESSINGLATENCY {
  nOffset: omx.TICKS;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMVIDEOAVCSEIENABLETYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMALLOWMEMCHANGETYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CAMERAUSECASETYPE {
  eUseCase: omx.CONFIG_CAMERAUSECASE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMDISABLEPROPRIETARYTUNNELSTYPE {
  bUseBuffers: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMRETAINMEMORYTYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMOUTPUTBUFFERSIZETYPE {
  nBufferSize: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CAMERAINFOTYPE {
  cameraname: number;
  lensname: number;
  nModelId: number;
  nManufacturerId: number;
  nRevNum: number;
  sSerialNumber: number;
  sEpromVersion: number;
  xFNumber: number;
  xFocalLength: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CAMERAFEATURESTYPE {
  eHasMechanicalShutter: omx.CONFIG_CAMERAFEATURESSHUTTER;
  bHasLens: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_REQUESTCALLBACKTYPE {
  nIndex: omx.INDEXTYPE;
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class FOCUSREGIONXY {
  xLeft: number;
  xTop: number;
  xWidth: number;
  xHeight: number;
  nWeight: number;
  nMask: number;
  eType: omx.FOCUSREGIONTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_FOCUSREGIONXYTYPE {
  nIndex: number;
  nTotalRegions: number;
  nValidRegions: number;
  bLockToFaces: boolean;
  xFaceTolerance: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_U8TYPE {
  /**
   * U8 value
   */
  nU8: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CAMERASETTINGSTYPE {
  nExposure: number;
  nAnalogGain: number;
  nDigitalGain: number;
  nLux: number;
  nRedGain: number;
  nBlueGain: number;
  nFocusPosition: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class YUVCOLOUR {
  nY: number;
  nU: number;
  nV: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_DRAWBOXLINEPARAMS {
  /**
   * Size of the corners as a fraction of the complete side
   */
  xCornerSize: number;
  /**
   * Width of the box line for the primary face in pixels
   */
  nPrimaryFaceLineWidth: number;
  /**
   * Width of the box line for other faces in pixels
   */
  nOtherFaceLineWidth: number;
  /**
   * Width of the box line for focus regions in pixels
   */
  nFocusRegionLineWidth: number;
  /**
   * YUV colour for the primary face
   */
  sPrimaryFaceColour: omx.YUVCOLOUR;
  /**
   * YUV colour for the primary face if smiling
   */
  sPrimaryFaceSmileColour: omx.YUVCOLOUR;
  /**
   * YUV colour for the primary face if blinking
   */
  sPrimaryFaceBlinkColour: omx.YUVCOLOUR;
  /**
   * YUV colour for the all other faces
   */
  sOtherFaceColour: omx.YUVCOLOUR;
  /**
   * YUV colour for the all other faces if smiling
   */
  sOtherFaceSmileColour: omx.YUVCOLOUR;
  /**
   * YUV colour for the all other faces if blinking
   */
  sOtherFaceBlinkColour: omx.YUVCOLOUR;
  /**
   * Are focus regions displayed when just in viewfinder/AF idle
   */
  bShowFocusRegionsWhenIdle: boolean;
  /**
   * YUV colour for focus regions
   */
  sFocusRegionColour: omx.YUVCOLOUR;
  /**
   * Change to the colours specified below if AF cycle has run
   */
  bShowAfState: boolean;
  /**
   * Only show the primary face when displaying the AF status
   */
  bShowOnlyPrimaryAfState: boolean;
  /**
   * Combine all regions not defined as faces into one single box covering them all
   */
  bCombineNonFaceRegions: boolean;
  /**
   * YUV colour for the primary face
   */
  sAfLockPrimaryFaceColour: omx.YUVCOLOUR;
  /**
   * YUV colour for the all other faces
   */
  sAfLockOtherFaceColour: omx.YUVCOLOUR;
  /**
   * YUV colour for focus regions
   */
  sAfLockFocusRegionColour: omx.YUVCOLOUR;
  /**
   * YUV colour for the primary face
   */
  sAfFailPrimaryFaceColour: omx.YUVCOLOUR;
  /**
   * YUV colour for the all other faces
   */
  sAfFailOtherFaceColour: omx.YUVCOLOUR;
  /**
   * YUV colour for focus regions
   */
  sAfFailFocusRegionColour: omx.YUVCOLOUR;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERARMITYPE {
  bEnabled: boolean;
  sRmiName: number;
  nInputBufferHeight: number;
  nRmiBufferSize: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMSYNCOUTPUTTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_DRMVIEWTYPE {
  /**
   * Current view count
   */
  nCurrentView: number;
  /**
   * Max. no. of view allowed
   */
  nMaxView: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMU64TYPE {
  /**
   * low bits of the unsigned 64 bit value
   */
  nLowPart: number;
  /**
   * high bits of the unsigned 64 bit value
   */
  nHighPart: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMTHUMBNAILTYPE {
  /**
   * Enable generation of thumbnails during still capture
   */
  bEnable: boolean;
  /**
   * Use the preview image (as is) as thumbnail
   */
  bUsePreview: boolean;
  /**
   * Desired width of the thumbnail
   */
  nWidth: number;
  /**
   * Desired height of the thumbnail
   */
  nHeight: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMASPECTRATIOTYPE {
  nWidth: number;
  nHeight: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMVIDEODECODEERRORCONCEALMENTTYPE {
  /**
   * Decoder will only start emitting frames from a non-corrupted frame
   */
  bStartWithValidFrame: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_FLASHINFOTYPE {
  sFlashName: number;
  eFlashType: omx.CAMERAFLASHTYPE;
  nDeviceId: number;
  nDeviceVersion: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_DYNAMICRANGEEXPANSIONTYPE {
  eMode: omx.DYNAMICRANGEEXPANSIONMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMTHREADAFFINITYTYPE {
  /**
   * Thread CPU affinity
   */
  eAffinity: omx.BRCMTHREADAFFINITYTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_SCENEDETECTTYPE {
  /**
   * Scene type detected
   */
  eScene: omx.SCENEDETECTTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class NALSTREAMFORMATTYPE {
  eNaluFormat: omx.NALUFORMATSTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class STATICBOX {
  xLeft: number;
  xTop: number;
  xWidth: number;
  xHeight: number;
  eType: omx.STATICBOXTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_STATICBOXTYPE {
  nIndex: number;
  nTotalBoxes: number;
  nValidBoxes: number;
  bDrawOtherBoxes: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_PORTBOOLEANTYPE {
  bEnabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERACAPTUREMODETYPE {
  eMode: omx.CAMERACAPTUREMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMDRMENCRYPTIONTYPE {
  eEncryption: omx.BRCMDRMENCRYPTIONTYPE;
  nConfigDataLen: number;
  configData: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BUFFERSTALLTYPE {
  /**
   * Whether we are stalled
   */
  bStalled: boolean;
  /**
   * Delay in real time (us) from last buffer to current time
   */
  nDelay: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_LATENCYTARGETTYPE {
  /**
   * whether this mode is enabled
   */
  bEnabled: boolean;
  /**
   * number of latency samples to filter on, good value: 1
   */
  nFilter: number;
  /**
   * target latency, us
   */
  nTarget: number;
  /**
   * shift for storing latency values, good value: 7
   */
  nShift: number;
  /**
   * multiplier for speed changes, in 24.8 format, good value: 256-512
   */
  nSpeedFactor: number;
  /**
   * divider for comparing latency versus gradiant, good value: 300
   */
  nInterFactor: number;
  /**
   * limit for speed change before nSpeedFactor is applied, good value: 100
   */
  nAdjCap: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMUSEPROPRIETARYCALLBACKTYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_TIMESTAMPMODETYPE {
  eTimestampMode: omx.TIMESTAMPMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class BRCMVEGLIMAGETYPE {
  nWidth: number;
  nHeight: number;
  nStride: number;
  nUmemHandle: number;
  nUmemOffset: number;
  /**
   * Non-zero -> vertically flipped image
   */
  nFlipped: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMFOVTYPE {
  /**
   * Horizontal field of view in degrees. 16p16 value
   */
  xFieldOfViewHorizontal: number;
  /**
   * Vertical field of view in degrees. 16p16 value
   */
  xFieldOfViewVertical: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_CONFIG_LEVEL_EXTEND {
  /**
   * Specifies maximum macro-blocks per second
   */
  nCustomMaxMBPS: number;
  /**
   * Specifies maximum frame size (macro-blocks per frame)
   */
  nCustomMaxFS: number;
  /**
   * Specifies maximum bitrate in units of 1000 bits/s and Codec Picture Buffer (CPB derived from bitrate)
   */
  nCustomMaxBRandCPB: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_EEDE_ENABLE {
  enable: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class VIDEO_EEDE_LOSSRATE {
  /**
   * loss rate, 5 means 5%
   */
  loss_rate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_COLORSPACETYPE {
  eColorSpace: omx.COLORSPACETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAPTURESTATETYPE {
  eCaptureState: omx.CAPTURESTATETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMCONFIGFILETYPE {
  /**
   * Size of complete file data
   */
  fileSize: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMCONFIGFILECHUNKTYPE {
  /**
   * Number of bytes being transferred in this chunk
   */
  size: number;
  /**
   * Offset of this chunk in the file
   */
  offset: number;
  /**
   * Chunk data
   */
  data: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMFRAMERATERANGETYPE {
  /**
   * Low end of framerate range. Q16 format
   */
  xFramerateLow: number;
  /**
   * High end of framerate range. Q16 format
   */
  xFramerateHigh: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_S32TYPE {
  /**
   * S32 value
   */
  nS32: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMVIDEODRMPROTECTBUFFERTYPE {
  /**
   * Input. Zero size means internal video decoder buffer, mem_handle and phys_addr not returned in this case
   */
  size_wanted: number;
  /**
   * Input. 1 = protect, 0 = unprotect
   */
  protect: number;
  /**
   * Output. Handle for protected buffer
   */
  mem_handle: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_ZEROSHUTTERLAGTYPE {
  /**
   * Select ZSL mode from the camera.
   */
  bZeroShutterMode: number;
  /**
   * Perform concurrent captures for full ZSL.
   */
  bConcurrentCapture: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BRCMVIDEODECODECONFIGVD3TYPE {
  /**
   * Configuration data (a VD3_CONFIGURE_T)
   */
  config: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CUSTOMAWBGAINSTYPE {
  /**
   * Red gain - 16p16
   */
  xGainR: number;
  /**
   * Blue gain - 16p16
   */
  xGainB: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMRENDERSTATSTYPE {
  nValid: boolean;
  nMatch: number;
  nPeriod: number;
  nPhase: number;
  nPixelClockNominal: number;
  nPixelClock: number;
  nHvsStatus: number;
  dummy0: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMANNOTATETYPE {
  bEnable: boolean;
  bShowShutter: boolean;
  bShowAnalogGain: boolean;
  bShowLens: boolean;
  bShowCaf: boolean;
  bShowMotion: boolean;
  bShowFrameNum: boolean;
  bEnableBackground: boolean;
  bCustomBackgroundColour: boolean;
  nBackgroundY: number;
  nBackgroundU: number;
  nBackgroundV: number;
  dummy1: number;
  bCustomTextColour: boolean;
  nTextY: number;
  nTextU: number;
  nTextV: number;
  /**
   * Text size: 6-150 pixels
   */
  nTextSize: number;
  sText: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BRCMSTEREOSCOPICMODETYPE {
  /**
   * Packing mode
   */
  eMode: omx.BRCMSTEREOSCOPICMODETYPE;
  /**
   * Half/half mode (pixel aspect ratio = 1:2 or 2:1 if set. 1:1 if not set)
   */
  bDecimate: boolean;
  /**
   * False = left eye first. True = right eye first.
   */
  bSwapEyes: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERAINTERFACETYPE {
  /**
   * Interface mode
   */
  eMode: omx.CAMERAINTERFACETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERACLOCKINGMODETYPE {
  /**
   * Clocking mode
   */
  eMode: omx.CAMERACLOCKINGMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERARXCONFIG_TYPE {
  eDecode: omx.CAMERARXDECODETYPE;
  eEncode: omx.CAMERARXENCODETYPE;
  eUnpack;
  ePack: omx.CAMERARXPACKTYPE;
  nDataLanes: number;
  nEncodeBlockLength: number;
  nEmbeddedDataLines: number;
  nImageId: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CAMERARXTIMING_TYPE {
  nTiming1: number;
  nTiming2: number;
  nTiming3: number;
  nTiming4: number;
  nTiming5: number;
  nTerm1: number;
  nTerm2: number;
  nCpiTiming1: number;
  nCpiTiming2: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BAYERORDERTYPE {
  eBayerOrder: omx.BAYERORDERTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
