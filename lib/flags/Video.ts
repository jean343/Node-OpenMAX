export enum OMX_VIDEO_CODINGTYPE {
  OMX_VIDEO_CodingUnused = 0x0,
  OMX_VIDEO_CodingAutoDetect = 0x1,
  OMX_VIDEO_CodingMPEG2 = 0x2,
  OMX_VIDEO_CodingH263 = 0x3,
  OMX_VIDEO_CodingMPEG4 = 0x4,
  OMX_VIDEO_CodingWMV = 0x5,
  OMX_VIDEO_CodingRV = 0x6,
  OMX_VIDEO_CodingAVC = 0x7,
  OMX_VIDEO_CodingMJPEG = 0x8,
  OMX_VIDEO_CodingKhronosExtensions = 0x6F000000,
  OMX_VIDEO_CodingVendorStartUnused = 0x7F000000,
  OMX_VIDEO_CodingMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_CONTROLRATETYPE {
  OMX_Video_ControlRateDisable = 0x0,
  OMX_Video_ControlRateVariable = 0x1,
  OMX_Video_ControlRateConstant = 0x2,
  OMX_Video_ControlRateVariableSkipFrames = 0x3,
  OMX_Video_ControlRateConstantSkipFrames = 0x4,
  OMX_Video_ControlRateKhronosExtensions = 0x6F000000,
  OMX_Video_ControlRateVendorStartUnused = 0x7F000000,
  OMX_Video_ControlRateMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_MOTIONVECTORTYPE {
  OMX_Video_MotionVectorPixel = 0x0,
  OMX_Video_MotionVectorHalfPel = 0x1,
  OMX_Video_MotionVectorQuarterPel = 0x2,
  OMX_Video_MotionVectorEighthPel = 0x3,
  OMX_Video_MotionVectorKhronosExtensions = 0x6F000000,
  OMX_Video_MotionVectorVendorStartUnused = 0x7F000000,
  OMX_Video_MotionVectorMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_INTRAREFRESHTYPE {
  OMX_VIDEO_IntraRefreshCyclic = 0x0,
  OMX_VIDEO_IntraRefreshAdaptive = 0x1,
  OMX_VIDEO_IntraRefreshBoth = 0x2,
  OMX_VIDEO_IntraRefreshKhronosExtensions = 0x6F000000,
  OMX_VIDEO_IntraRefreshVendorStartUnused = 0x7F000000,
  OMX_VIDEO_IntraRefreshMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_H263PROFILETYPE {
  OMX_VIDEO_H263ProfileBaseline = 0x1,
  OMX_VIDEO_H263ProfileH320Coding = 0x2,
  OMX_VIDEO_H263ProfileBackwardCompatible = 0x4,
  OMX_VIDEO_H263ProfileISWV2 = 0x8,
  OMX_VIDEO_H263ProfileISWV3 = 0x10,
  OMX_VIDEO_H263ProfileHighCompression = 0x20,
  OMX_VIDEO_H263ProfileInternet = 0x40,
  OMX_VIDEO_H263ProfileInterlace = 0x80,
  OMX_VIDEO_H263ProfileHighLatency = 0x100,
  OMX_VIDEO_H263ProfileKhronosExtensions = 0x6F000000,
  OMX_VIDEO_H263ProfileVendorStartUnused = 0x7F000000,
  OMX_VIDEO_H263ProfileMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_H263LEVELTYPE {
  OMX_VIDEO_H263Level10 = 0x1,
  OMX_VIDEO_H263Level20 = 0x2,
  OMX_VIDEO_H263Level30 = 0x4,
  OMX_VIDEO_H263Level40 = 0x8,
  OMX_VIDEO_H263Level45 = 0x10,
  OMX_VIDEO_H263Level50 = 0x20,
  OMX_VIDEO_H263Level60 = 0x40,
  OMX_VIDEO_H263Level70 = 0x80,
  OMX_VIDEO_H263LevelKhronosExtensions = 0x6F000000,
  OMX_VIDEO_H263LevelVendorStartUnused = 0x7F000000,
  OMX_VIDEO_H263LevelMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_PICTURETYPE {
  OMX_VIDEO_PictureTypeI = 0x1,
  OMX_VIDEO_PictureTypeP = 0x2,
  OMX_VIDEO_PictureTypeB = 0x4,
  OMX_VIDEO_PictureTypeSI = 0x8,
  OMX_VIDEO_PictureTypeSP = 0x10,
  OMX_VIDEO_PictureTypeEI = 0x11,
  OMX_VIDEO_PictureTypeEP = 0x12,
  OMX_VIDEO_PictureTypeS = 0x14,
  OMX_VIDEO_PictureTypeKhronosExtensions = 0x6F000000,
  OMX_VIDEO_PictureTypeVendorStartUnused = 0x7F000000,
  OMX_VIDEO_PictureTypeMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_MPEG2PROFILETYPE {
  OMX_VIDEO_MPEG2ProfileSimple = 0x0,
  OMX_VIDEO_MPEG2ProfileMain = 0x1,
  OMX_VIDEO_MPEG2Profile422 = 0x2,
  OMX_VIDEO_MPEG2ProfileSNR = 0x3,
  OMX_VIDEO_MPEG2ProfileSpatial = 0x4,
  OMX_VIDEO_MPEG2ProfileHigh = 0x5,
  OMX_VIDEO_MPEG2ProfileKhronosExtensions = 0x6F000000,
  OMX_VIDEO_MPEG2ProfileVendorStartUnused = 0x7F000000,
  OMX_VIDEO_MPEG2ProfileMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_MPEG2LEVELTYPE {
  OMX_VIDEO_MPEG2LevelLL = 0x0,
  OMX_VIDEO_MPEG2LevelML = 0x1,
  OMX_VIDEO_MPEG2LevelH14 = 0x2,
  OMX_VIDEO_MPEG2LevelHL = 0x3,
  OMX_VIDEO_MPEG2LevelKhronosExtensions = 0x6F000000,
  OMX_VIDEO_MPEG2LevelVendorStartUnused = 0x7F000000,
  OMX_VIDEO_MPEG2LevelMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_MPEG4PROFILETYPE {
  OMX_VIDEO_MPEG4ProfileSimple = 0x1,
  OMX_VIDEO_MPEG4ProfileSimpleScalable = 0x2,
  OMX_VIDEO_MPEG4ProfileCore = 0x4,
  OMX_VIDEO_MPEG4ProfileMain = 0x8,
  OMX_VIDEO_MPEG4ProfileNbit = 0x10,
  OMX_VIDEO_MPEG4ProfileScalableTexture = 0x20,
  OMX_VIDEO_MPEG4ProfileSimpleFace = 0x40,
  OMX_VIDEO_MPEG4ProfileSimpleFBA = 0x80,
  OMX_VIDEO_MPEG4ProfileBasicAnimated = 0x100,
  OMX_VIDEO_MPEG4ProfileHybrid = 0x200,
  OMX_VIDEO_MPEG4ProfileAdvancedRealTime = 0x400,
  OMX_VIDEO_MPEG4ProfileCoreScalable = 0x800,
  OMX_VIDEO_MPEG4ProfileAdvancedCoding = 0x1000,
  OMX_VIDEO_MPEG4ProfileAdvancedCore = 0x2000,
  OMX_VIDEO_MPEG4ProfileAdvancedScalable = 0x4000,
  OMX_VIDEO_MPEG4ProfileAdvancedSimple = 0x8000,
  OMX_VIDEO_MPEG4ProfileKhronosExtensions = 0x6F000000,
  OMX_VIDEO_MPEG4ProfileVendorStartUnused = 0x7F000000,
  OMX_VIDEO_MPEG4ProfileMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_MPEG4LEVELTYPE {
  OMX_VIDEO_MPEG4Level0 = 0x1,
  OMX_VIDEO_MPEG4Level0b = 0x2,
  OMX_VIDEO_MPEG4Level1 = 0x4,
  OMX_VIDEO_MPEG4Level2 = 0x8,
  OMX_VIDEO_MPEG4Level3 = 0x10,
  OMX_VIDEO_MPEG4Level4 = 0x20,
  OMX_VIDEO_MPEG4Level4a = 0x40,
  OMX_VIDEO_MPEG4Level5 = 0x80,
  OMX_VIDEO_MPEG4LevelKhronosExtensions = 0x6F000000,
  OMX_VIDEO_MPEG4LevelVendorStartUnused = 0x7F000000,
  OMX_VIDEO_MPEG4LevelMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_WMVFORMATTYPE {
  OMX_VIDEO_WMVFormatUnused = 0x1,
  OMX_VIDEO_WMVFormat7 = 0x2,
  OMX_VIDEO_WMVFormat8 = 0x4,
  OMX_VIDEO_WMVFormat9 = 0x8,
  OMX_VIDEO_WMFFormatKhronosExtensions = 0x6F000000,
  OMX_VIDEO_WMFFormatVendorStartUnused = 0x7F000000,
  OMX_VIDEO_WMVFormatMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_RVFORMATTYPE {
  OMX_VIDEO_RVFormatUnused = 0x0,
  OMX_VIDEO_RVFormat8 = 0x1,
  OMX_VIDEO_RVFormat9 = 0x2,
  OMX_VIDEO_RVFormatG2 = 0x3,
  OMX_VIDEO_RVFormatKhronosExtensions = 0x6F000000,
  OMX_VIDEO_RVFormatVendorStartUnused = 0x7F000000,
  OMX_VIDEO_RVFormatMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_AVCPROFILETYPE {
  OMX_VIDEO_AVCProfileBaseline = 0x1,
  OMX_VIDEO_AVCProfileMain = 0x2,
  OMX_VIDEO_AVCProfileExtended = 0x4,
  OMX_VIDEO_AVCProfileHigh = 0x8,
  OMX_VIDEO_AVCProfileHigh10 = 0x10,
  OMX_VIDEO_AVCProfileHigh422 = 0x20,
  OMX_VIDEO_AVCProfileHigh444 = 0x40,
  OMX_VIDEO_AVCProfileKhronosExtensions = 0x6F000000,
  OMX_VIDEO_AVCProfileVendorStartUnused = 0x7F000000,
  OMX_VIDEO_AVCProfileMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_AVCLEVELTYPE {
  OMX_VIDEO_AVCLevel1 = 0x1,
  OMX_VIDEO_AVCLevel1b = 0x2,
  OMX_VIDEO_AVCLevel11 = 0x4,
  OMX_VIDEO_AVCLevel12 = 0x8,
  OMX_VIDEO_AVCLevel13 = 0x10,
  OMX_VIDEO_AVCLevel2 = 0x20,
  OMX_VIDEO_AVCLevel21 = 0x40,
  OMX_VIDEO_AVCLevel22 = 0x80,
  OMX_VIDEO_AVCLevel3 = 0x100,
  OMX_VIDEO_AVCLevel31 = 0x200,
  OMX_VIDEO_AVCLevel32 = 0x400,
  OMX_VIDEO_AVCLevel4 = 0x800,
  OMX_VIDEO_AVCLevel41 = 0x1000,
  OMX_VIDEO_AVCLevel42 = 0x2000,
  OMX_VIDEO_AVCLevel5 = 0x4000,
  OMX_VIDEO_AVCLevel51 = 0x8000,
  OMX_VIDEO_AVCLevelKhronosExtensions = 0x6F000000,
  OMX_VIDEO_AVCLevelVendorStartUnused = 0x7F000000,
  OMX_VIDEO_AVCLevelMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_AVCLOOPFILTERTYPE {
  OMX_VIDEO_AVCLoopFilterEnable = 0x0,
  OMX_VIDEO_AVCLoopFilterDisable = 0x1,
  OMX_VIDEO_AVCLoopFilterDisableSliceBoundary = 0x2,
  OMX_VIDEO_AVCLoopFilterKhronosExtensions = 0x6F000000,
  OMX_VIDEO_AVCLoopFilterVendorStartUnused = 0x7F000000,
  OMX_VIDEO_AVCLoopFilterMax = 0x7FFFFFFF
}
export enum OMX_VIDEO_AVCSLICEMODETYPE {
  OMX_VIDEO_SLICEMODE_AVCDefault = 0x0,
  OMX_VIDEO_SLICEMODE_AVCMBSlice = 0x1,
  OMX_VIDEO_SLICEMODE_AVCByteSlice = 0x2,
  OMX_VIDEO_SLICEMODE_AVCKhronosExtensions = 0x6F000000,
  OMX_VIDEO_SLICEMODE_AVCVendorStartUnused = 0x7F000000,
  OMX_VIDEO_SLICEMODE_AVCLevelMax = 0x7FFFFFFF
}
