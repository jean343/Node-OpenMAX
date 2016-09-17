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
export class OMX_CONFIG_BRCMIOPERFSTATSTYPE {
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
export class OMX_CONFIG_SHARPNESSTYPE {
  nSharpness: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_FLICKERCANCELTYPE {
  eFlickerCancel: omx.OMX_COMMONFLICKERCANCELTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_REDEYEREMOVALTYPE {
  eMode: omx.OMX_REDEYEREMOVALTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_FACEDETECTIONCONTROLTYPE {
  eMode: omx.OMX_FACEDETECTIONCONTROLTYPE;
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
export class OMX_CONFIG_FACEDETECTIONREGIONTYPE {
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
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_INTERLACETYPE {
  /**
   * The interlace type of the content
   */
  eMode: omx.OMX_INTERLACETYPE;
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
export class OMX_PARAM_CAMERAISPTUNERTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_IMAGEPTRTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_AFASSISTTYPE {
  eMode: omx.OMX_AFASSISTTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_INPUTCROPTYPE {
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
export class OMX_PARAM_CODECREQUIREMENTSTYPE {
  nCallbackID: number;
  bTryHWCodec: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMEGLIMAGEMEMHANDLETYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_PRIVACYINDICATORTYPE {
  ePrivacyIndicatorMode: omx.OMX_PRIVACYINDICATORTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CAMERAFLASHTYPE {
  eFlashType: omx.OMX_CAMERAFLASHTYPE;
  bRedEyeUsesTorchMode: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_CAMERAFLASHCONFIGTYPE {
  bUsePreFlash: boolean;
  bUseFocusDistanceInfo: boolean;
  eFlashSync: omx.OMX_CAMERAFLASHCONFIGSYNCTYPE;
  bIgnoreChargeState: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMAUDIOTRACKGAPLESSPLAYBACKTYPE {
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
export class OMX_CONFIG_BRCMAUDIOTRACKCHANGECONTROLTYPE {
  nSrcPortIndex: number;
  nDstPortIndex: number;
  nXFade: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMPIXELVALUERANGETYPE {
  ePixelValueRange: omx.OMX_BRCMPIXELVALUERANGETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CAMERADISABLEALGORITHMTYPE {
  eAlgorithm: omx.OMX_CAMERADISABLEALGORITHMTYPE;
  bDisabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMAUDIOEFFECTCONTROLTYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMMINIMUMPROCESSINGLATENCY {
  nOffset: omx.OMX_TICKS;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMVIDEOAVCSEIENABLETYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMALLOWMEMCHANGETYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_CAMERAUSECASETYPE {
  eUseCase: omx.OMX_CONFIG_CAMERAUSECASE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMDISABLEPROPRIETARYTUNNELSTYPE {
  bUseBuffers: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMRETAINMEMORYTYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMOUTPUTBUFFERSIZETYPE {
  nBufferSize: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_CAMERAINFOTYPE {
  nModelId: number;
  nManufacturerId: number;
  nRevNum: number;
  xFNumber: number;
  xFocalLength: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_CAMERAFEATURESTYPE {
  eHasMechanicalShutter: omx.OMX_CONFIG_CAMERAFEATURESSHUTTER;
  bHasLens: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_REQUESTCALLBACKTYPE {
  nIndex: omx.OMX_INDEXTYPE;
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_FOCUSREGIONXY {
  xLeft: number;
  xTop: number;
  xWidth: number;
  xHeight: number;
  nWeight: number;
  nMask: number;
  eType: omx.OMX_FOCUSREGIONTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_FOCUSREGIONXYTYPE {
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
export class OMX_CONFIG_U8TYPE {
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
export class OMX_CONFIG_CAMERASETTINGSTYPE {
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
export class OMX_YUVCOLOUR {
  nY: number;
  nU: number;
  nV: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_DRAWBOXLINEPARAMS {
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
  sPrimaryFaceColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for the primary face if smiling
   */
  sPrimaryFaceSmileColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for the primary face if blinking
   */
  sPrimaryFaceBlinkColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for the all other faces
   */
  sOtherFaceColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for the all other faces if smiling
   */
  sOtherFaceSmileColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for the all other faces if blinking
   */
  sOtherFaceBlinkColour: omx.OMX_YUVCOLOUR;
  /**
   * Are focus regions displayed when just in viewfinder/AF idle
   */
  bShowFocusRegionsWhenIdle: boolean;
  /**
   * YUV colour for focus regions
   */
  sFocusRegionColour: omx.OMX_YUVCOLOUR;
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
  sAfLockPrimaryFaceColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for the all other faces
   */
  sAfLockOtherFaceColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for focus regions
   */
  sAfLockFocusRegionColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for the primary face
   */
  sAfFailPrimaryFaceColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for the all other faces
   */
  sAfFailOtherFaceColour: omx.OMX_YUVCOLOUR;
  /**
   * YUV colour for focus regions
   */
  sAfFailFocusRegionColour: omx.OMX_YUVCOLOUR;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CAMERARMITYPE {
  bEnabled: boolean;
  nInputBufferHeight: number;
  nRmiBufferSize: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMSYNCOUTPUTTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_DRMVIEWTYPE {
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
export class OMX_PARAM_BRCMU64TYPE {
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
export class OMX_PARAM_BRCMTHUMBNAILTYPE {
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
export class OMX_PARAM_BRCMASPECTRATIOTYPE {
  nWidth: number;
  nHeight: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMVIDEODECODEERRORCONCEALMENTTYPE {
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
export class OMX_CONFIG_FLASHINFOTYPE {
  eFlashType: omx.OMX_CAMERAFLASHTYPE;
  nDeviceId: number;
  nDeviceVersion: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_DYNAMICRANGEEXPANSIONTYPE {
  eMode: omx.OMX_DYNAMICRANGEEXPANSIONMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMTHREADAFFINITYTYPE {
  /**
   * Thread CPU affinity
   */
  eAffinity: omx.OMX_BRCMTHREADAFFINITYTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_SCENEDETECTTYPE {
  /**
   * Scene type detected
   */
  eScene: omx.OMX_SCENEDETECTTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_NALSTREAMFORMATTYPE {
  eNaluFormat: omx.OMX_NALUFORMATSTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_STATICBOX {
  xLeft: number;
  xTop: number;
  xWidth: number;
  xHeight: number;
  eType: omx.OMX_STATICBOXTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_STATICBOXTYPE {
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
export class OMX_CONFIG_PORTBOOLEANTYPE {
  bEnabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CAMERACAPTUREMODETYPE {
  eMode: omx.OMX_CAMERACAPTUREMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMDRMENCRYPTIONTYPE {
  eEncryption: omx.OMX_BRCMDRMENCRYPTIONTYPE;
  nConfigDataLen: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BUFFERSTALLTYPE {
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
export class OMX_CONFIG_LATENCYTARGETTYPE {
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
export class OMX_CONFIG_BRCMUSEPROPRIETARYCALLBACKTYPE {
  bEnable: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_TIMESTAMPMODETYPE {
  eTimestampMode: omx.OMX_TIMESTAMPMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_BRCMVEGLIMAGETYPE {
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
export class OMX_CONFIG_BRCMFOVTYPE {
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
export class OMX_VIDEO_CONFIG_LEVEL_EXTEND {
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
export class OMX_VIDEO_EEDE_ENABLE {
  enable: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_VIDEO_EEDE_LOSSRATE {
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
export class OMX_PARAM_COLORSPACETYPE {
  eColorSpace: omx.OMX_COLORSPACETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CAPTURESTATETYPE {
  eCaptureState: omx.OMX_CAPTURESTATETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMCONFIGFILETYPE {
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
export class OMX_PARAM_BRCMCONFIGFILECHUNKTYPE {
  /**
   * Number of bytes being transferred in this chunk
   */
  size: number;
  /**
   * Offset of this chunk in the file
   */
  offset: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_BRCMFRAMERATERANGETYPE {
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
export class OMX_PARAM_S32TYPE {
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
export class OMX_PARAM_BRCMVIDEODRMPROTECTBUFFERTYPE {
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
export class OMX_CONFIG_ZEROSHUTTERLAGTYPE {
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
export class OMX_PARAM_BRCMVIDEODECODECONFIGVD3TYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_CUSTOMAWBGAINSTYPE {
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
export class OMX_CONFIG_BRCMRENDERSTATSTYPE {
  nValid: boolean;
  nMatch: number;
  nPeriod: number;
  nPhase: number;
  nPixelClockNominal: number;
  nPixelClock: number;
  nHvsStatus: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMANNOTATETYPE {
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
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_CONFIG_BRCMSTEREOSCOPICMODETYPE {
  /**
   * Packing mode
   */
  eMode: omx.OMX_BRCMSTEREOSCOPICMODETYPE;
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
export class OMX_PARAM_CAMERAINTERFACETYPE {
  /**
   * Interface mode
   */
  eMode: omx.OMX_CAMERAINTERFACETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CAMERACLOCKINGMODETYPE {
  /**
   * Clocking mode
   */
  eMode: omx.OMX_CAMERACLOCKINGMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_CAMERARXCONFIG_TYPE {
  eDecode: omx.OMX_CAMERARXDECODETYPE;
  eEncode: omx.OMX_CAMERARXENCODETYPE;
  eUnpack: omx.OMX_CAMERARXUNPACKYPE;
  ePack: omx.OMX_CAMERARXPACKTYPE;
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
export class OMX_PARAM_CAMERARXTIMING_TYPE {
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
export class OMX_PARAM_BAYERORDERTYPE {
  eBayerOrder: omx.OMX_BAYERORDERTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
