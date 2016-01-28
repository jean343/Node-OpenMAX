export enum OMX_DISPLAYTRANSFORMTYPE {
  OMX_DISPLAY_ROT0 = 0x0,
  OMX_DISPLAY_MIRROR_ROT0 = 0x1,
  OMX_DISPLAY_MIRROR_ROT180 = 0x2,
  OMX_DISPLAY_ROT180 = 0x3,
  OMX_DISPLAY_MIRROR_ROT90 = 0x4,
  OMX_DISPLAY_ROT270 = 0x5,
  OMX_DISPLAY_ROT90 = 0x6,
  OMX_DISPLAY_MIRROR_ROT270 = 0x7,
  OMX_DISPLAY_DUMMY = 0x7FFFFFFF
}
export enum OMX_DISPLAYMODETYPE {
  OMX_DISPLAY_MODE_FILL = 0x0,
  OMX_DISPLAY_MODE_LETTERBOX = 0x1,
  OMX_DISPLAY_MODE_STEREO_LEFT_TO_LEFT = 0x2,
  OMX_DISPLAY_MODE_STEREO_TOP_TO_TOP = 0x3,
  OMX_DISPLAY_MODE_STEREO_LEFT_TO_TOP = 0x4,
  OMX_DISPLAY_MODE_STEREO_TOP_TO_LEFT = 0x5,
  OMX_DISPLAY_MODE_DUMMY = 0x7FFFFFFF
}
export enum OMX_DISPLAYSETTYPE {
  OMX_DISPLAY_SET_NONE = 0x0,
  OMX_DISPLAY_SET_NUM = 0x1,
  OMX_DISPLAY_SET_FULLSCREEN = 0x2,
  OMX_DISPLAY_SET_TRANSFORM = 0x4,
  OMX_DISPLAY_SET_DEST_RECT = 0x8,
  OMX_DISPLAY_SET_SRC_RECT = 0x10,
  OMX_DISPLAY_SET_MODE = 0x20,
  OMX_DISPLAY_SET_PIXEL = 0x40,
  OMX_DISPLAY_SET_NOASPECT = 0x80,
  OMX_DISPLAY_SET_LAYER = 0x100,
  OMX_DISPLAY_SET_COPYPROTECT = 0x200,
  OMX_DISPLAY_SET_ALPHA = 0x400,
  OMX_DISPLAY_SET_DUMMY = 0x7FFFFFFF
}
export enum OMX_SOURCETYPE {
  OMX_SOURCE_WHITE = 0x0,
  OMX_SOURCE_BLACK = 0x1,
  OMX_SOURCE_DIAGONAL = 0x2,
  OMX_SOURCE_NOISE = 0x3,
  OMX_SOURCE_RANDOM = 0x4,
  OMX_SOURCE_COLOUR = 0x5,
  OMX_SOURCE_BLOCKS = 0x6,
  OMX_SOURCE_SWIRLY = 0x7,
  OMX_SOURCE_DUMMY = 0x7FFFFFFF
}
export enum OMX_RESIZEMODETYPE {
  OMX_RESIZE_NONE = 0x0,
  OMX_RESIZE_CROP = 0x1,
  OMX_RESIZE_BOX = 0x2,
  OMX_RESIZE_BYTES = 0x3,
  OMX_RESIZE_DUMMY = 0x7FFFFFFF
}
export enum OMX_PLAYMODETYPE {
  OMX_PLAYMODE_NORMAL = 0x0,
  OMX_PLAYMODE_FF = 0x1,
  OMX_PLAYMODE_REW = 0x2,
  OMX_PLAYMODE_DUMMY = 0x7FFFFFFF
}
export enum OMX_DELIVERYFORMATTYPE {
  OMX_DELIVERYFORMAT_STREAM = 0x0,
  OMX_DELIVERYFORMAT_SINGLE_PACKET = 0x1,
  OMX_DELIVERYFORMAT_DUMMY = 0x7FFFFFFF
}
export enum OMX_AUDIOMONOTRACKOPERATIONSTYPE {
  OMX_AUDIOMONOTRACKOPERATIONS_NOP = 0x0,
  OMX_AUDIOMONOTRACKOPERATIONS_L_TO_R = 0x1,
  OMX_AUDIOMONOTRACKOPERATIONS_R_TO_L = 0x2,
  OMX_AUDIOMONOTRACKOPERATIONS_DUMMY = 0x7FFFFFFF
}
export enum OMX_CAMERAIMAGEPOOLINPUTMODETYPE {
  OMX_CAMERAIMAGEPOOLINPUTMODE_ONEPOOL = 0x0,
  OMX_CAMERAIMAGEPOOLINPUTMODE_TWOPOOLS = 0x1
}
export enum OMX_COMMONFLICKERCANCELTYPE {
  OMX_COMMONFLICKERCANCEL_OFF = 0x0,
  OMX_COMMONFLICKERCANCEL_AUTO = 0x1,
  OMX_COMMONFLICKERCANCEL_50 = 0x2,
  OMX_COMMONFLICKERCANCEL_60 = 0x3,
  OMX_COMMONFLICKERCANCEL_DUMMY = 0x7FFFFFFF
}
export enum OMX_REDEYEREMOVALTYPE {
  OMX_RedEyeRemovalNone = 0x0,
  OMX_RedEyeRemovalOn = 0x1,
  OMX_RedEyeRemovalAuto = 0x2,
  OMX_RedEyeRemovalKhronosExtensions = 0x6F000000,
  OMX_RedEyeRemovalVendorStartUnused = 0x7F000000,
  OMX_RedEyeRemovalSimple = 0x7F000001,
  OMX_RedEyeRemovalMax = 0x7FFFFFFF
}
export enum OMX_FACEDETECTIONCONTROLTYPE {
  OMX_FaceDetectionControlNone = 0x0,
  OMX_FaceDetectionControlOn = 0x1,
  OMX_FaceDetectionControlKhronosExtensions = 0x6F000000,
  OMX_FaceDetectionControlVendorStartUnused = 0x7F000000,
  OMX_FaceDetectionControlMax = 0x7FFFFFFF
}
export enum OMX_FACEREGIONFLAGSTYPE {
  OMX_FaceRegionFlagsNone = 0x0,
  OMX_FaceRegionFlagsBlink = 0x1,
  OMX_FaceRegionFlagsSmile = 0x2,
  OMX_FaceRegionFlagsKhronosExtensions = 0x6F000000,
  OMX_FaceRegionFlagsVendorStartUnused = 0x7F000000,
  OMX_FaceRegionFlagsMax = 0x7FFFFFFF
}
export enum OMX_INTERLACETYPE {
  OMX_InterlaceProgressive = 0x0,
  OMX_InterlaceFieldSingleUpperFirst = 0x1,
  OMX_InterlaceFieldSingleLowerFirst = 0x2,
  OMX_InterlaceFieldsInterleavedUpperFirst = 0x3,
  OMX_InterlaceFieldsInterleavedLowerFirst = 0x4,
  OMX_InterlaceMixed = 0x5,
  OMX_InterlaceKhronosExtensions = 0x6F000000,
  OMX_InterlaceVendorStartUnused = 0x7F000000,
  OMX_InterlaceMax = 0x7FFFFFFF
}
export enum OMX_AFASSISTTYPE {
  OMX_AFAssistAuto = 0x0,
  OMX_AFAssistOn = 0x1,
  OMX_AFAssistOff = 0x2,
  OMX_AFAssistTorch = 0x3,
  OMX_AFAssistKhronosExtensions = 0x6F000000,
  OMX_AFAssistVendorStartUnused = 0x7F000000,
  OMX_AFAssistMax = 0x7FFFFFFF
}
export enum OMX_PRIVACYINDICATORTYPE {
  OMX_PrivacyIndicatorOff = 0x0,
  OMX_PrivacyIndicatorOn = 0x1,
  OMX_PrivacyIndicatorForceOn = 0x2,
  OMX_PrivacyIndicatorKhronosExtensions = 0x6F000000,
  OMX_PrivacyIndicatorVendorStartUnused = 0x7F000000,
  OMX_PrivacyIndicatorMax = 0x7FFFFFFF
}
export enum OMX_CAMERAFLASHTYPE {
  OMX_CameraFlashDefault = 0x0,
  OMX_CameraFlashXenon = 0x1,
  OMX_CameraFlashLED = 0x2,
  OMX_CameraFlashNone = 0x3,
  OMX_CameraFlashKhronosExtensions = 0x6F000000,
  OMX_CameraFlashVendorStartUnused = 0x7F000000,
  OMX_CameraFlashMax = 0x7FFFFFFF
}
export enum OMX_CAMERAFLASHCONFIGSYNCTYPE {
  OMX_CameraFlashConfigSyncFrontSlow = 0x0,
  OMX_CameraFlashConfigSyncRearSlow = 0x1,
  OMX_CameraFlashConfigSyncFrontFast = 0x2,
  OMX_CameraFlashConfigSyncKhronosExtensions = 0x6F000000,
  OMX_CameraFlashConfigSyncVendorStartUnused = 0x7F000000,
  OMX_CameraFlashConfigSyncMax = 0x7FFFFFFF
}
export enum OMX_BRCMPIXELVALUERANGETYPE {
  OMX_PixelValueRangeUnspecified = 0x0,
  OMX_PixelValueRangeITU_R_BT601 = 0x1,
  OMX_PixelValueRangeFull8Bit = 0x2,
  OMX_PixelValueRangeKhronosExtensions = 0x6F000000,
  OMX_PixelValueRangeVendorStartUnused = 0x7F000000,
  OMX_PixelValueRangeMax = 0x7FFFFFFF
}
export enum OMX_CAMERADISABLEALGORITHMTYPE {
  OMX_CameraDisableAlgorithmFacetracking = 0x0,
  OMX_CameraDisableAlgorithmRedEyeReduction = 0x1,
  OMX_CameraDisableAlgorithmVideoStabilisation = 0x2,
  OMX_CameraDisableAlgorithmWriteRaw = 0x3,
  OMX_CameraDisableAlgorithmVideoDenoise = 0x4,
  OMX_CameraDisableAlgorithmStillsDenoise = 0x5,
  OMX_CameraDisableAlgorithmAntiShake = 0x6,
  OMX_CameraDisableAlgorithmImageEffects = 0x7,
  OMX_CameraDisableAlgorithmDarkSubtract = 0x8,
  OMX_CameraDisableAlgorithmDynamicRangeExpansion = 0x9,
  OMX_CameraDisableAlgorithmFaceRecognition = 0xA,
  OMX_CameraDisableAlgorithmFaceBeautification = 0xB,
  OMX_CameraDisableAlgorithmSceneDetection = 0xC,
  OMX_CameraDisableAlgorithmHighDynamicRange = 0xD,
  OMX_CameraDisableAlgorithmKhronosExtensions = 0x6F000000,
  OMX_CameraDisableAlgorithmVendorStartUnused = 0x7F000000,
  OMX_CameraDisableAlgorithmMax = 0x7FFFFFFF
}
export enum OMX_CONFIG_CAMERAUSECASE {
  OMX_CameraUseCaseAuto = 0x0,
  OMX_CameraUseCaseVideo = 0x1,
  OMX_CameraUseCaseStills = 0x2,
  OMX_CameraUseCaseKhronosExtensions = 0x6F000000,
  OMX_CameraUseCaseVendorStartUnused = 0x7F000000,
  OMX_CameraUseCaseMax = 0x7FFFFFFF
}
export enum OMX_CONFIG_CAMERAFEATURESSHUTTER {
  OMX_CameraFeaturesShutterUnknown = 0x0,
  OMX_CameraFeaturesShutterNotPresent = 0x1,
  OMX_CameraFeaturesShutterPresent = 0x2,
  OMX_CameraFeaturesShutterKhronosExtensions = 0x6F000000,
  OMX_CameraFeaturesShutterVendorStartUnused = 0x7F000000,
  OMX_CameraFeaturesShutterMax = 0x7FFFFFFF
}
export enum OMX_FOCUSREGIONTYPE {
  OMX_FocusRegionNormal = 0x0,
  OMX_FocusRegionFace = 0x1,
  OMX_FocusRegionMax = 0x2
}
export enum OMX_DYNAMICRANGEEXPANSIONMODETYPE {
  OMX_DynRangeExpOff = 0x0,
  OMX_DynRangeExpLow = 0x1,
  OMX_DynRangeExpMedium = 0x2,
  OMX_DynRangeExpHigh = 0x3,
  OMX_DynRangeExpKhronosExtensions = 0x6F000000,
  OMX_DynRangeExpVendorStartUnused = 0x7F000000,
  OMX_DynRangeExpMax = 0x7FFFFFFF
}
export enum OMX_BRCMTHREADAFFINITYTYPE {
  OMX_BrcmThreadAffinityCPU0 = 0x0,
  OMX_BrcmThreadAffinityCPU1 = 0x1,
  OMX_BrcmThreadAffinityMax = 0x7FFFFFFF
}
export enum OMX_SCENEDETECTTYPE {
  OMX_SceneDetectUnknown = 0x0,
  OMX_SceneDetectLandscape = 0x1,
  OMX_SceneDetectPortrait = 0x2,
  OMX_SceneDetectMacro = 0x3,
  OMX_SceneDetectNight = 0x4,
  OMX_SceneDetectPortraitNight = 0x5,
  OMX_SceneDetectBacklit = 0x6,
  OMX_SceneDetectPortraitBacklit = 0x7,
  OMX_SceneDetectSunset = 0x8,
  OMX_SceneDetectBeach = 0x9,
  OMX_SceneDetectSnow = 0xA,
  OMX_SceneDetectFireworks = 0xB,
  OMX_SceneDetectMax = 0x7FFFFFFF
}
export enum OMX_INDEXEXTTYPE {
  OMX_IndexExtVideoStartUnused = 0x6F600000,
  OMX_IndexParamNalStreamFormatSupported = 0x6F600001,
  OMX_IndexParamNalStreamFormat = 0x6F600002,
  OMX_IndexParamNalStreamFormatSelect = 0x6F600003,
  OMX_IndexExtMax = 0x7FFFFFFF
}
export enum OMX_NALUFORMATSTYPE {
  OMX_NaluFormatStartCodes = 0x1,
  OMX_NaluFormatOneNaluPerBuffer = 0x2,
  OMX_NaluFormatOneByteInterleaveLength = 0x4,
  OMX_NaluFormatTwoByteInterleaveLength = 0x8,
  OMX_NaluFormatFourByteInterleaveLength = 0x10,
  OMX_NaluFormatCodingMax = 0x7FFFFFFF
}
export enum OMX_STATICBOXTYPE {
  OMX_StaticBoxNormal = 0x0,
  OMX_StaticBoxPrimaryFaceAfIdle = 0x1,
  OMX_StaticBoxNonPrimaryFaceAfIdle = 0x2,
  OMX_StaticBoxFocusRegionAfIdle = 0x3,
  OMX_StaticBoxPrimaryFaceAfSuccess = 0x4,
  OMX_StaticBoxNonPrimaryFaceAfSuccess = 0x5,
  OMX_StaticBoxFocusRegionAfSuccess = 0x6,
  OMX_StaticBoxPrimaryFaceAfFail = 0x7,
  OMX_StaticBoxNonPrimaryFaceAfFail = 0x8,
  OMX_StaticBoxFocusRegionAfFail = 0x9,
  OMX_StaticBoxMax = 0xA
}
export enum OMX_CAMERACAPTUREMODETYPE {
  OMX_CameraCaptureModeWaitForCaptureEnd = 0x0,
  OMX_CameraCaptureModeWaitForCaptureEndAndUsePreviousInputImage = 0x1,
  OMX_CameraCaptureModeResumeViewfinderImmediately = 0x2,
  OMX_CameraCaptureModeMax = 0x3
}
export enum OMX_BRCMDRMENCRYPTIONTYPE {
  OMX_DrmEncryptionNone = 0x0,
  OMX_DrmEncryptionHdcp2 = 0x1,
  OMX_DrmEncryptionKhronosExtensions = 0x6F000000,
  OMX_DrmEncryptionVendorStartUnused = 0x7F000000,
  OMX_DrmEncryptionRangeMax = 0x7FFFFFFF
}
export enum OMX_TIMESTAMPMODETYPE {
  OMX_TimestampModeZero = 0x0,
  OMX_TimestampModeRawStc = 0x1,
  OMX_TimestampModeResetStc = 0x2,
  OMX_TimestampModeKhronosExtensions = 0x6F000000,
  OMX_TimestampModeVendorStartUnused = 0x7F000000,
  OMX_TimestampModeMax = 0x7FFFFFFF
}
export enum OMX_COLORSPACETYPE {
  OMX_COLORSPACE_UNKNOWN = 0x0,
  OMX_COLORSPACE_JPEG_JFIF = 0x1,
  OMX_COLORSPACE_ITU_R_BT601 = 0x2,
  OMX_COLORSPACE_ITU_R_BT709 = 0x3,
  OMX_COLORSPACE_FCC = 0x4,
  OMX_COLORSPACE_SMPTE240M = 0x5,
  OMX_COLORSPACE_BT470_2_M = 0x6,
  OMX_COLORSPACE_BT470_2_BG = 0x7,
  OMX_COLORSPACE_JFIF_Y16_255 = 0x8,
  OMX_COLORSPACE_MAX = 0x7FFFFFFF
}
export enum OMX_CAPTURESTATETYPE {
  OMX_NotCapturing = 0x0,
  OMX_CaptureStarted = 0x1,
  OMX_CaptureComplete = 0x2,
  OMX_CaptureMax = 0x7FFFFFFF
}
export enum OMX_BRCMSTEREOSCOPICMODETYPE {
  OMX_STEREOSCOPIC_NONE = 0x0,
  OMX_STEREOSCOPIC_SIDEBYSIDE = 0x1,
  OMX_STEREOSCOPIC_TOPBOTTOM = 0x2,
  OMX_STEREOSCOPIC_MAX = 0x7FFFFFFF
}
export enum OMX_CAMERAINTERFACETYPE {
  OMX_CAMERAINTERFACE_CSI = 0x0,
  OMX_CAMERAINTERFACE_CCP2 = 0x1,
  OMX_CAMERAINTERFACE_CPI = 0x2,
  OMX_CAMERAINTERFACE_MAX = 0x7FFFFFFF
}
export enum OMX_CAMERACLOCKINGMODETYPE {
  OMX_CAMERACLOCKINGMODE_STROBE = 0x0,
  OMX_CAMERACLOCKINGMODE_CLOCK = 0x1,
  OMX_CAMERACLOCKINGMODE_MAX = 0x7FFFFFFF
}
export enum OMX_CAMERARXDECODETYPE {
  OMX_CAMERARXDECODE_NONE = 0x0,
  OMX_CAMERARXDECODE_DPCM8TO10 = 0x1,
  OMX_CAMERARXDECODE_DPCM7TO10 = 0x2,
  OMX_CAMERARXDECODE_DPCM6TO10 = 0x3,
  OMX_CAMERARXDECODE_DPCM8TO12 = 0x4,
  OMX_CAMERARXDECODE_DPCM7TO12 = 0x5,
  OMX_CAMERARXDECODE_DPCM6TO12 = 0x6,
  OMX_CAMERARXDECODE_DPCM10TO14 = 0x7,
  OMX_CAMERARXDECODE_DPCM8TO14 = 0x8,
  OMX_CAMERARXDECODE_DPCM12TO16 = 0x9,
  OMX_CAMERARXDECODE_DPCM10TO16 = 0xA,
  OMX_CAMERARXDECODE_DPCM8TO16 = 0xB,
  OMX_CAMERARXDECODE_MAX = 0x7FFFFFFF
}
export enum OMX_CAMERARXENCODETYPE {
  OMX_CAMERARXENCODE_NONE = 0x0,
  OMX_CAMERARXENCODE_DPCM10TO8 = 0x1,
  OMX_CAMERARXENCODE_DPCM12TO8 = 0x2,
  OMX_CAMERARXENCODE_DPCM14TO8 = 0x3,
  OMX_CAMERARXENCODE_MAX = 0x7FFFFFFF
}
export enum OMX_CAMERARXUNPACKTYPE {
  OMX_CAMERARXUNPACK_NONE = 0x0,
  OMX_CAMERARXUNPACK_6 = 0x1,
  OMX_CAMERARXUNPACK_7 = 0x2,
  OMX_CAMERARXUNPACK_8 = 0x3,
  OMX_CAMERARXUNPACK_10 = 0x4,
  OMX_CAMERARXUNPACK_12 = 0x5,
  OMX_CAMERARXUNPACK_14 = 0x6,
  OMX_CAMERARXUNPACK_16 = 0x7,
  OMX_CAMERARXUNPACK_MAX = 0x7FFFFFFF
}
export enum OMX_CAMERARXPACKTYPE {
  OMX_CAMERARXPACK_NONE = 0x0,
  OMX_CAMERARXPACK_8 = 0x1,
  OMX_CAMERARXPACK_10 = 0x2,
  OMX_CAMERARXPACK_12 = 0x3,
  OMX_CAMERARXPACK_14 = 0x4,
  OMX_CAMERARXPACK_16 = 0x5,
  OMX_CAMERARXPACK_RAW10 = 0x6,
  OMX_CAMERARXPACK_RAW12 = 0x7,
  OMX_CAMERARXPACK_MAX = 0x7FFFFFFF
}
export enum OMX_BAYERORDERTYPE {
  OMX_BayerOrderRGGB = 0x0,
  OMX_BayerOrderGBRG = 0x1,
  OMX_BayerOrderBGGR = 0x3,
  OMX_BayerOrderGRBG = 0x3,
  OMX_BayerOrderMax = 0x7FFFFFFF
}
