export enum VIDEO_CODINGTYPE {
  VIDEO_CodingUnused = 0x0,
  VIDEO_CodingAutoDetect = 0x1,
  VIDEO_CodingMPEG2 = 0x2,
  VIDEO_CodingH263 = 0x3,
  VIDEO_CodingMPEG4 = 0x4,
  VIDEO_CodingWMV = 0x5,
  VIDEO_CodingRV = 0x6,
  VIDEO_CodingAVC = 0x7,
  VIDEO_CodingMJPEG = 0x8,
  VIDEO_CodingKhronosExtensions = 0x6F000000,
  VIDEO_CodingVendorStartUnused = 0x7F000000,
  VIDEO_CodingVP6 = 0x7F000001,
  VIDEO_CodingVP7 = 0x7F000002,
  VIDEO_CodingVP8 = 0x7F000003,
  VIDEO_CodingYUV = 0x7F000004,
  VIDEO_CodingSorenson = 0x7F000005,
  VIDEO_CodingTheora = 0x7F000006,
  VIDEO_CodingMVC = 0x7F000007,
  VIDEO_CodingMax = 0x7FFFFFFF
}
export enum VIDEO_CONTROLRATETYPE {
  Video_ControlRateDisable = 0x0,
  Video_ControlRateVariable = 0x1,
  Video_ControlRateConstant = 0x2,
  Video_ControlRateVariableSkipFrames = 0x3,
  Video_ControlRateConstantSkipFrames = 0x4,
  Video_ControlRateKhronosExtensions = 0x6F000000,
  Video_ControlRateVendorStartUnused = 0x7F000000,
  Video_ControlRateMax = 0x7FFFFFFF
}
export enum VIDEO_MOTIONVECTORTYPE {
  Video_MotionVectorPixel = 0x0,
  Video_MotionVectorHalfPel = 0x1,
  Video_MotionVectorQuarterPel = 0x2,
  Video_MotionVectorEighthPel = 0x3,
  Video_MotionVectorKhronosExtensions = 0x6F000000,
  Video_MotionVectorVendorStartUnused = 0x7F000000,
  Video_MotionVectorMax = 0x7FFFFFFF
}
export enum VIDEO_INTRAREFRESHTYPE {
  VIDEO_IntraRefreshCyclic = 0x0,
  VIDEO_IntraRefreshAdaptive = 0x1,
  VIDEO_IntraRefreshBoth = 0x2,
  VIDEO_IntraRefreshKhronosExtensions = 0x6F000000,
  VIDEO_IntraRefreshVendorStartUnused = 0x7F000000,
  VIDEO_IntraRefreshCyclicMrows = 0x7F000001,
  VIDEO_IntraRefreshPseudoRand = 0x7F000002,
  VIDEO_IntraRefreshMax = 0x7FFFFFFF
}
export enum VIDEO_H263PROFILETYPE {
  VIDEO_H263ProfileBaseline = 0x1,
  VIDEO_H263ProfileH320Coding = 0x2,
  VIDEO_H263ProfileBackwardCompatible = 0x4,
  VIDEO_H263ProfileISWV2 = 0x8,
  VIDEO_H263ProfileISWV3 = 0x10,
  VIDEO_H263ProfileHighCompression = 0x20,
  VIDEO_H263ProfileInternet = 0x40,
  VIDEO_H263ProfileInterlace = 0x80,
  VIDEO_H263ProfileHighLatency = 0x100,
  VIDEO_H263ProfileKhronosExtensions = 0x6F000000,
  VIDEO_H263ProfileVendorStartUnused = 0x7F000000,
  VIDEO_H263ProfileMax = 0x7FFFFFFF
}
export enum VIDEO_H263LEVELTYPE {
  VIDEO_H263Level10 = 0x1,
  VIDEO_H263Level20 = 0x2,
  VIDEO_H263Level30 = 0x4,
  VIDEO_H263Level40 = 0x8,
  VIDEO_H263Level45 = 0x10,
  VIDEO_H263Level50 = 0x20,
  VIDEO_H263Level60 = 0x40,
  VIDEO_H263Level70 = 0x80,
  VIDEO_H263LevelKhronosExtensions = 0x6F000000,
  VIDEO_H263LevelVendorStartUnused = 0x7F000000,
  VIDEO_H263LevelMax = 0x7FFFFFFF
}
export enum VIDEO_PICTURETYPE {
  VIDEO_PictureTypeI = 0x1,
  VIDEO_PictureTypeP = 0x2,
  VIDEO_PictureTypeB = 0x4,
  VIDEO_PictureTypeSI = 0x8,
  VIDEO_PictureTypeSP = 0x10,
  VIDEO_PictureTypeEI = 0x11,
  VIDEO_PictureTypeEP = 0x12,
  VIDEO_PictureTypeS = 0x14,
  VIDEO_PictureTypeKhronosExtensions = 0x6F000000,
  VIDEO_PictureTypeVendorStartUnused = 0x7F000000,
  VIDEO_PictureTypeMax = 0x7FFFFFFF
}
export enum VIDEO_MPEG2PROFILETYPE {
  VIDEO_MPEG2ProfileSimple = 0x0,
  VIDEO_MPEG2ProfileMain = 0x1,
  VIDEO_MPEG2Profile422 = 0x2,
  VIDEO_MPEG2ProfileSNR = 0x3,
  VIDEO_MPEG2ProfileSpatial = 0x4,
  VIDEO_MPEG2ProfileHigh = 0x5,
  VIDEO_MPEG2ProfileKhronosExtensions = 0x6F000000,
  VIDEO_MPEG2ProfileVendorStartUnused = 0x7F000000,
  VIDEO_MPEG2ProfileMax = 0x7FFFFFFF
}
export enum VIDEO_MPEG2LEVELTYPE {
  VIDEO_MPEG2LevelLL = 0x0,
  VIDEO_MPEG2LevelML = 0x1,
  VIDEO_MPEG2LevelH14 = 0x2,
  VIDEO_MPEG2LevelHL = 0x3,
  VIDEO_MPEG2LevelKhronosExtensions = 0x6F000000,
  VIDEO_MPEG2LevelVendorStartUnused = 0x7F000000,
  VIDEO_MPEG2LevelMax = 0x7FFFFFFF
}
export enum VIDEO_MPEG4PROFILETYPE {
  VIDEO_MPEG4ProfileSimple = 0x1,
  VIDEO_MPEG4ProfileSimpleScalable = 0x2,
  VIDEO_MPEG4ProfileCore = 0x4,
  VIDEO_MPEG4ProfileMain = 0x8,
  VIDEO_MPEG4ProfileNbit = 0x10,
  VIDEO_MPEG4ProfileScalableTexture = 0x20,
  VIDEO_MPEG4ProfileSimpleFace = 0x40,
  VIDEO_MPEG4ProfileSimpleFBA = 0x80,
  VIDEO_MPEG4ProfileBasicAnimated = 0x100,
  VIDEO_MPEG4ProfileHybrid = 0x200,
  VIDEO_MPEG4ProfileAdvancedRealTime = 0x400,
  VIDEO_MPEG4ProfileCoreScalable = 0x800,
  VIDEO_MPEG4ProfileAdvancedCoding = 0x1000,
  VIDEO_MPEG4ProfileAdvancedCore = 0x2000,
  VIDEO_MPEG4ProfileAdvancedScalable = 0x4000,
  VIDEO_MPEG4ProfileAdvancedSimple = 0x8000,
  VIDEO_MPEG4ProfileKhronosExtensions = 0x6F000000,
  VIDEO_MPEG4ProfileVendorStartUnused = 0x7F000000,
  VIDEO_MPEG4ProfileMax = 0x7FFFFFFF
}
export enum VIDEO_MPEG4LEVELTYPE {
  VIDEO_MPEG4Level0 = 0x1,
  VIDEO_MPEG4Level0b = 0x2,
  VIDEO_MPEG4Level1 = 0x4,
  VIDEO_MPEG4Level2 = 0x8,
  VIDEO_MPEG4Level3 = 0x10,
  VIDEO_MPEG4Level4 = 0x20,
  VIDEO_MPEG4Level4a = 0x40,
  VIDEO_MPEG4Level5 = 0x80,
  VIDEO_MPEG4Level6 = 0x100,
  VIDEO_MPEG4LevelKhronosExtensions = 0x6F000000,
  VIDEO_MPEG4LevelVendorStartUnused = 0x7F000000,
  VIDEO_MPEG4LevelMax = 0x7FFFFFFF
}
export enum VIDEO_WMVFORMATTYPE {
  VIDEO_WMVFormatUnused = 0x1,
  VIDEO_WMVFormat7 = 0x2,
  VIDEO_WMVFormat8 = 0x4,
  VIDEO_WMVFormat9 = 0x8,
  VIDEO_WMFFormatKhronosExtensions = 0x6F000000,
  VIDEO_WMFFormatVendorStartUnused = 0x7F000000,
  VIDEO_WMVFormatMax = 0x7FFFFFFF
}
export enum VIDEO_RVFORMATTYPE {
  VIDEO_RVFormatUnused = 0x0,
  VIDEO_RVFormat8 = 0x1,
  VIDEO_RVFormat9 = 0x2,
  VIDEO_RVFormatG2 = 0x3,
  VIDEO_RVFormatKhronosExtensions = 0x6F000000,
  VIDEO_RVFormatVendorStartUnused = 0x7F000000,
  VIDEO_RVFormatMax = 0x7FFFFFFF
}
export enum VIDEO_AVCPROFILETYPE {
  VIDEO_AVCProfileBaseline = 0x1,
  VIDEO_AVCProfileMain = 0x2,
  VIDEO_AVCProfileExtended = 0x4,
  VIDEO_AVCProfileHigh = 0x8,
  VIDEO_AVCProfileHigh10 = 0x10,
  VIDEO_AVCProfileHigh422 = 0x20,
  VIDEO_AVCProfileHigh444 = 0x40,
  VIDEO_AVCProfileConstrainedBaseline = 0x80,
  VIDEO_AVCProfileKhronosExtensions = 0x6F000000,
  VIDEO_AVCProfileVendorStartUnused = 0x7F000000,
  VIDEO_AVCProfileMax = 0x7FFFFFFF
}
export enum VIDEO_AVCLEVELTYPE {
  VIDEO_AVCLevel1 = 0x1,
  VIDEO_AVCLevel1b = 0x2,
  VIDEO_AVCLevel11 = 0x4,
  VIDEO_AVCLevel12 = 0x8,
  VIDEO_AVCLevel13 = 0x10,
  VIDEO_AVCLevel2 = 0x20,
  VIDEO_AVCLevel21 = 0x40,
  VIDEO_AVCLevel22 = 0x80,
  VIDEO_AVCLevel3 = 0x100,
  VIDEO_AVCLevel31 = 0x200,
  VIDEO_AVCLevel32 = 0x400,
  VIDEO_AVCLevel4 = 0x800,
  VIDEO_AVCLevel41 = 0x1000,
  VIDEO_AVCLevel42 = 0x2000,
  VIDEO_AVCLevel5 = 0x4000,
  VIDEO_AVCLevel51 = 0x8000,
  VIDEO_AVCLevelKhronosExtensions = 0x6F000000,
  VIDEO_AVCLevelVendorStartUnused = 0x7F000000,
  VIDEO_AVCLevelMax = 0x7FFFFFFF
}
export enum VIDEO_AVCLOOPFILTERTYPE {
  VIDEO_AVCLoopFilterEnable = 0x0,
  VIDEO_AVCLoopFilterDisable = 0x1,
  VIDEO_AVCLoopFilterDisableSliceBoundary = 0x2,
  VIDEO_AVCLoopFilterKhronosExtensions = 0x6F000000,
  VIDEO_AVCLoopFilterVendorStartUnused = 0x7F000000,
  VIDEO_AVCLoopFilterMax = 0x7FFFFFFF
}
export enum VIDEO_AVCSLICEMODETYPE {
  VIDEO_SLICEMODE_AVCDefault = 0x0,
  VIDEO_SLICEMODE_AVCMBSlice = 0x1,
  VIDEO_SLICEMODE_AVCByteSlice = 0x2,
  VIDEO_SLICEMODE_AVCKhronosExtensions = 0x6F000000,
  VIDEO_SLICEMODE_AVCVendorStartUnused = 0x7F000000,
  VIDEO_SLICEMODE_AVCLevelMax = 0x7FFFFFFF
}
