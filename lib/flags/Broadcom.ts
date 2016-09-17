export enum DISPLAYTRANSFORMTYPE {
  DISPLAY_ROT0 = 0x0,
  DISPLAY_MIRROR_ROT0 = 0x1,
  DISPLAY_MIRROR_ROT180 = 0x2,
  DISPLAY_ROT180 = 0x3,
  DISPLAY_MIRROR_ROT90 = 0x4,
  DISPLAY_ROT270 = 0x5,
  DISPLAY_ROT90 = 0x6,
  DISPLAY_MIRROR_ROT270 = 0x7,
  DISPLAY_DUMMY = 0x7FFFFFFF
}
export enum DISPLAYMODETYPE {
  DISPLAY_MODE_FILL = 0x0,
  DISPLAY_MODE_LETTERBOX = 0x1,
  DISPLAY_MODE_STEREO_LEFT_TO_LEFT = 0x2,
  DISPLAY_MODE_STEREO_TOP_TO_TOP = 0x3,
  DISPLAY_MODE_STEREO_LEFT_TO_TOP = 0x4,
  DISPLAY_MODE_STEREO_TOP_TO_LEFT = 0x5,
  DISPLAY_MODE_DUMMY = 0x7FFFFFFF
}
export enum DISPLAYSETTYPE {
  DISPLAY_SET_NONE = 0x0,
  DISPLAY_SET_NUM = 0x1,
  DISPLAY_SET_FULLSCREEN = 0x2,
  DISPLAY_SET_TRANSFORM = 0x4,
  DISPLAY_SET_DEST_RECT = 0x8,
  DISPLAY_SET_SRC_RECT = 0x10,
  DISPLAY_SET_MODE = 0x20,
  DISPLAY_SET_PIXEL = 0x40,
  DISPLAY_SET_NOASPECT = 0x80,
  DISPLAY_SET_LAYER = 0x100,
  DISPLAY_SET_COPYPROTECT = 0x200,
  DISPLAY_SET_ALPHA = 0x400,
  DISPLAY_SET_DUMMY = 0x7FFFFFFF
}
export enum SOURCETYPE {
  SOURCE_WHITE = 0x0,
  SOURCE_BLACK = 0x1,
  SOURCE_DIAGONAL = 0x2,
  SOURCE_NOISE = 0x3,
  SOURCE_RANDOM = 0x4,
  SOURCE_COLOUR = 0x5,
  SOURCE_BLOCKS = 0x6,
  SOURCE_SWIRLY = 0x7,
  SOURCE_DUMMY = 0x7FFFFFFF
}
export enum RESIZEMODETYPE {
  RESIZE_NONE = 0x0,
  RESIZE_CROP = 0x1,
  RESIZE_BOX = 0x2,
  RESIZE_BYTES = 0x3,
  RESIZE_DUMMY = 0x7FFFFFFF
}
export enum PLAYMODETYPE {
  PLAYMODE_NORMAL = 0x0,
  PLAYMODE_FF = 0x1,
  PLAYMODE_REW = 0x2,
  PLAYMODE_DUMMY = 0x7FFFFFFF
}
export enum DELIVERYFORMATTYPE {
  DELIVERYFORMAT_STREAM = 0x0,
  DELIVERYFORMAT_SINGLE_PACKET = 0x1,
  DELIVERYFORMAT_DUMMY = 0x7FFFFFFF
}
export enum AUDIOMONOTRACKOPERATIONSTYPE {
  AUDIOMONOTRACKOPERATIONS_NOP = 0x0,
  AUDIOMONOTRACKOPERATIONS_L_TO_R = 0x1,
  AUDIOMONOTRACKOPERATIONS_R_TO_L = 0x2,
  AUDIOMONOTRACKOPERATIONS_DUMMY = 0x7FFFFFFF
}
export enum CAMERAIMAGEPOOLINPUTMODETYPE {
  CAMERAIMAGEPOOLINPUTMODE_ONEPOOL = 0x0,
  CAMERAIMAGEPOOLINPUTMODE_TWOPOOLS = 0x1
}
export enum COMMONFLICKERCANCELTYPE {
  COMMONFLICKERCANCEL_OFF = 0x0,
  COMMONFLICKERCANCEL_AUTO = 0x1,
  COMMONFLICKERCANCEL_50 = 0x2,
  COMMONFLICKERCANCEL_60 = 0x3,
  COMMONFLICKERCANCEL_DUMMY = 0x7FFFFFFF
}
export enum REDEYEREMOVALTYPE {
  RedEyeRemovalNone = 0x0,
  RedEyeRemovalOn = 0x1,
  RedEyeRemovalAuto = 0x2,
  RedEyeRemovalKhronosExtensions = 0x6F000000,
  RedEyeRemovalVendorStartUnused = 0x7F000000,
  RedEyeRemovalSimple = 0x7F000001,
  RedEyeRemovalMax = 0x7FFFFFFF
}
export enum FACEDETECTIONCONTROLTYPE {
  FaceDetectionControlNone = 0x0,
  FaceDetectionControlOn = 0x1,
  FaceDetectionControlKhronosExtensions = 0x6F000000,
  FaceDetectionControlVendorStartUnused = 0x7F000000,
  FaceDetectionControlMax = 0x7FFFFFFF
}
export enum FACEREGIONFLAGSTYPE {
  FaceRegionFlagsNone = 0x0,
  FaceRegionFlagsBlink = 0x1,
  FaceRegionFlagsSmile = 0x2,
  FaceRegionFlagsKhronosExtensions = 0x6F000000,
  FaceRegionFlagsVendorStartUnused = 0x7F000000,
  FaceRegionFlagsMax = 0x7FFFFFFF
}
export enum INTERLACETYPE {
  InterlaceProgressive = 0x0,
  InterlaceFieldSingleUpperFirst = 0x1,
  InterlaceFieldSingleLowerFirst = 0x2,
  InterlaceFieldsInterleavedUpperFirst = 0x3,
  InterlaceFieldsInterleavedLowerFirst = 0x4,
  InterlaceMixed = 0x5,
  InterlaceKhronosExtensions = 0x6F000000,
  InterlaceVendorStartUnused = 0x7F000000,
  InterlaceMax = 0x7FFFFFFF
}
export enum AFASSISTTYPE {
  AFAssistAuto = 0x0,
  AFAssistOn = 0x1,
  AFAssistOff = 0x2,
  AFAssistTorch = 0x3,
  AFAssistKhronosExtensions = 0x6F000000,
  AFAssistVendorStartUnused = 0x7F000000,
  AFAssistMax = 0x7FFFFFFF
}
export enum PRIVACYINDICATORTYPE {
  PrivacyIndicatorOff = 0x0,
  PrivacyIndicatorOn = 0x1,
  PrivacyIndicatorForceOn = 0x2,
  PrivacyIndicatorKhronosExtensions = 0x6F000000,
  PrivacyIndicatorVendorStartUnused = 0x7F000000,
  PrivacyIndicatorMax = 0x7FFFFFFF
}
export enum CAMERAFLASHTYPE {
  CameraFlashDefault = 0x0,
  CameraFlashXenon = 0x1,
  CameraFlashLED = 0x2,
  CameraFlashNone = 0x3,
  CameraFlashKhronosExtensions = 0x6F000000,
  CameraFlashVendorStartUnused = 0x7F000000,
  CameraFlashMax = 0x7FFFFFFF
}
export enum CAMERAFLASHCONFIGSYNCTYPE {
  CameraFlashConfigSyncFrontSlow = 0x0,
  CameraFlashConfigSyncRearSlow = 0x1,
  CameraFlashConfigSyncFrontFast = 0x2,
  CameraFlashConfigSyncKhronosExtensions = 0x6F000000,
  CameraFlashConfigSyncVendorStartUnused = 0x7F000000,
  CameraFlashConfigSyncMax = 0x7FFFFFFF
}
export enum BRCMPIXELVALUERANGETYPE {
  PixelValueRangeUnspecified = 0x0,
  PixelValueRangeITU_R_BT601 = 0x1,
  PixelValueRangeFull8Bit = 0x2,
  PixelValueRangeKhronosExtensions = 0x6F000000,
  PixelValueRangeVendorStartUnused = 0x7F000000,
  PixelValueRangeMax = 0x7FFFFFFF
}
export enum CAMERADISABLEALGORITHMTYPE {
  CameraDisableAlgorithmFacetracking = 0x0,
  CameraDisableAlgorithmRedEyeReduction = 0x1,
  CameraDisableAlgorithmVideoStabilisation = 0x2,
  CameraDisableAlgorithmWriteRaw = 0x3,
  CameraDisableAlgorithmVideoDenoise = 0x4,
  CameraDisableAlgorithmStillsDenoise = 0x5,
  CameraDisableAlgorithmAntiShake = 0x6,
  CameraDisableAlgorithmImageEffects = 0x7,
  CameraDisableAlgorithmDarkSubtract = 0x8,
  CameraDisableAlgorithmDynamicRangeExpansion = 0x9,
  CameraDisableAlgorithmFaceRecognition = 0xA,
  CameraDisableAlgorithmFaceBeautification = 0xB,
  CameraDisableAlgorithmSceneDetection = 0xC,
  CameraDisableAlgorithmHighDynamicRange = 0xD,
  CameraDisableAlgorithmKhronosExtensions = 0x6F000000,
  CameraDisableAlgorithmVendorStartUnused = 0x7F000000,
  CameraDisableAlgorithmMax = 0x7FFFFFFF
}
export enum CONFIG_CAMERAUSECASE {
  CameraUseCaseAuto = 0x0,
  CameraUseCaseVideo = 0x1,
  CameraUseCaseStills = 0x2,
  CameraUseCaseKhronosExtensions = 0x6F000000,
  CameraUseCaseVendorStartUnused = 0x7F000000,
  CameraUseCaseMax = 0x7FFFFFFF
}
export enum CONFIG_CAMERAFEATURESSHUTTER {
  CameraFeaturesShutterUnknown = 0x0,
  CameraFeaturesShutterNotPresent = 0x1,
  CameraFeaturesShutterPresent = 0x2,
  CameraFeaturesShutterKhronosExtensions = 0x6F000000,
  CameraFeaturesShutterVendorStartUnused = 0x7F000000,
  CameraFeaturesShutterMax = 0x7FFFFFFF
}
export enum FOCUSREGIONTYPE {
  FocusRegionNormal = 0x0,
  FocusRegionFace = 0x1,
  FocusRegionMax = 0x2
}
export enum DYNAMICRANGEEXPANSIONMODETYPE {
  DynRangeExpOff = 0x0,
  DynRangeExpLow = 0x1,
  DynRangeExpMedium = 0x2,
  DynRangeExpHigh = 0x3,
  DynRangeExpKhronosExtensions = 0x6F000000,
  DynRangeExpVendorStartUnused = 0x7F000000,
  DynRangeExpMax = 0x7FFFFFFF
}
export enum BRCMTHREADAFFINITYTYPE {
  BrcmThreadAffinityCPU0 = 0x0,
  BrcmThreadAffinityCPU1 = 0x1,
  BrcmThreadAffinityMax = 0x7FFFFFFF
}
export enum SCENEDETECTTYPE {
  SceneDetectUnknown = 0x0,
  SceneDetectLandscape = 0x1,
  SceneDetectPortrait = 0x2,
  SceneDetectMacro = 0x3,
  SceneDetectNight = 0x4,
  SceneDetectPortraitNight = 0x5,
  SceneDetectBacklit = 0x6,
  SceneDetectPortraitBacklit = 0x7,
  SceneDetectSunset = 0x8,
  SceneDetectBeach = 0x9,
  SceneDetectSnow = 0xA,
  SceneDetectFireworks = 0xB,
  SceneDetectMax = 0x7FFFFFFF
}
export enum INDEXEXTTYPE {
  IndexExtVideoStartUnused = 0x6F600000,
  IndexParamNalStreamFormatSupported = 0x6F600001,
  IndexParamNalStreamFormat = 0x6F600002,
  IndexParamNalStreamFormatSelect = 0x6F600003,
  IndexExtMax = 0x7FFFFFFF
}
export enum NALUFORMATSTYPE {
  NaluFormatStartCodes = 0x1,
  NaluFormatOneNaluPerBuffer = 0x2,
  NaluFormatOneByteInterleaveLength = 0x4,
  NaluFormatTwoByteInterleaveLength = 0x8,
  NaluFormatFourByteInterleaveLength = 0x10,
  NaluFormatCodingMax = 0x7FFFFFFF
}
export enum STATICBOXTYPE {
  StaticBoxNormal = 0x0,
  StaticBoxPrimaryFaceAfIdle = 0x1,
  StaticBoxNonPrimaryFaceAfIdle = 0x2,
  StaticBoxFocusRegionAfIdle = 0x3,
  StaticBoxPrimaryFaceAfSuccess = 0x4,
  StaticBoxNonPrimaryFaceAfSuccess = 0x5,
  StaticBoxFocusRegionAfSuccess = 0x6,
  StaticBoxPrimaryFaceAfFail = 0x7,
  StaticBoxNonPrimaryFaceAfFail = 0x8,
  StaticBoxFocusRegionAfFail = 0x9,
  StaticBoxMax = 0xA
}
export enum CAMERACAPTUREMODETYPE {
  CameraCaptureModeWaitForCaptureEnd = 0x0,
  CameraCaptureModeWaitForCaptureEndAndUsePreviousInputImage = 0x1,
  CameraCaptureModeResumeViewfinderImmediately = 0x2,
  CameraCaptureModeMax = 0x3
}
export enum BRCMDRMENCRYPTIONTYPE {
  DrmEncryptionNone = 0x0,
  DrmEncryptionHdcp2 = 0x1,
  DrmEncryptionKhronosExtensions = 0x6F000000,
  DrmEncryptionVendorStartUnused = 0x7F000000,
  DrmEncryptionRangeMax = 0x7FFFFFFF
}
export enum TIMESTAMPMODETYPE {
  TimestampModeZero = 0x0,
  TimestampModeRawStc = 0x1,
  TimestampModeResetStc = 0x2,
  TimestampModeKhronosExtensions = 0x6F000000,
  TimestampModeVendorStartUnused = 0x7F000000,
  TimestampModeMax = 0x7FFFFFFF
}
export enum COLORSPACETYPE {
  COLORSPACE_UNKNOWN = 0x0,
  COLORSPACE_JPEG_JFIF = 0x1,
  COLORSPACE_ITU_R_BT601 = 0x2,
  COLORSPACE_ITU_R_BT709 = 0x3,
  COLORSPACE_FCC = 0x4,
  COLORSPACE_SMPTE240M = 0x5,
  COLORSPACE_BT470_2_M = 0x6,
  COLORSPACE_BT470_2_BG = 0x7,
  COLORSPACE_JFIF_Y16_255 = 0x8,
  COLORSPACE_MAX = 0x7FFFFFFF
}
export enum CAPTURESTATETYPE {
  NotCapturing = 0x0,
  CaptureStarted = 0x1,
  CaptureComplete = 0x2,
  CaptureMax = 0x7FFFFFFF
}
export enum BRCMSTEREOSCOPICMODETYPE {
  STEREOSCOPIC_NONE = 0x0,
  STEREOSCOPIC_SIDEBYSIDE = 0x1,
  STEREOSCOPIC_TOPBOTTOM = 0x2,
  STEREOSCOPIC_MAX = 0x7FFFFFFF
}
export enum CAMERAINTERFACETYPE {
  CAMERAINTERFACE_CSI = 0x0,
  CAMERAINTERFACE_CCP2 = 0x1,
  CAMERAINTERFACE_CPI = 0x2,
  CAMERAINTERFACE_MAX = 0x7FFFFFFF
}
export enum CAMERACLOCKINGMODETYPE {
  CAMERACLOCKINGMODE_STROBE = 0x0,
  CAMERACLOCKINGMODE_CLOCK = 0x1,
  CAMERACLOCKINGMODE_MAX = 0x7FFFFFFF
}
export enum CAMERARXDECODETYPE {
  CAMERARXDECODE_NONE = 0x0,
  CAMERARXDECODE_DPCM8TO10 = 0x1,
  CAMERARXDECODE_DPCM7TO10 = 0x2,
  CAMERARXDECODE_DPCM6TO10 = 0x3,
  CAMERARXDECODE_DPCM8TO12 = 0x4,
  CAMERARXDECODE_DPCM7TO12 = 0x5,
  CAMERARXDECODE_DPCM6TO12 = 0x6,
  CAMERARXDECODE_DPCM10TO14 = 0x7,
  CAMERARXDECODE_DPCM8TO14 = 0x8,
  CAMERARXDECODE_DPCM12TO16 = 0x9,
  CAMERARXDECODE_DPCM10TO16 = 0xA,
  CAMERARXDECODE_DPCM8TO16 = 0xB,
  CAMERARXDECODE_MAX = 0x7FFFFFFF
}
export enum CAMERARXENCODETYPE {
  CAMERARXENCODE_NONE = 0x0,
  CAMERARXENCODE_DPCM10TO8 = 0x1,
  CAMERARXENCODE_DPCM12TO8 = 0x2,
  CAMERARXENCODE_DPCM14TO8 = 0x3,
  CAMERARXENCODE_MAX = 0x7FFFFFFF
}
export enum CAMERARXUNPACKTYPE {
  CAMERARXUNPACK_NONE = 0x0,
  CAMERARXUNPACK_6 = 0x1,
  CAMERARXUNPACK_7 = 0x2,
  CAMERARXUNPACK_8 = 0x3,
  CAMERARXUNPACK_10 = 0x4,
  CAMERARXUNPACK_12 = 0x5,
  CAMERARXUNPACK_14 = 0x6,
  CAMERARXUNPACK_16 = 0x7,
  CAMERARXUNPACK_MAX = 0x7FFFFFFF
}
export enum CAMERARXPACKTYPE {
  CAMERARXPACK_NONE = 0x0,
  CAMERARXPACK_8 = 0x1,
  CAMERARXPACK_10 = 0x2,
  CAMERARXPACK_12 = 0x3,
  CAMERARXPACK_14 = 0x4,
  CAMERARXPACK_16 = 0x5,
  CAMERARXPACK_RAW10 = 0x6,
  CAMERARXPACK_RAW12 = 0x7,
  CAMERARXPACK_MAX = 0x7FFFFFFF
}
export enum BAYERORDERTYPE {
  BayerOrderRGGB = 0x0,
  BayerOrderGBRG = 0x1,
  BayerOrderBGGR = 0x3,
  BayerOrderGRBG = 0x3,
  BayerOrderMax = 0x7FFFFFFF
}
