module.exports.OMX_COLOR_FORMATTYPE = {
  OMX_COLOR_FormatUnused: 0x0,
  OMX_COLOR_FormatMonochrome: 0x1,
  OMX_COLOR_Format8bitRGB332: 0x2,
  OMX_COLOR_Format12bitRGB444: 0x3,
  OMX_COLOR_Format16bitARGB4444: 0x4,
  OMX_COLOR_Format16bitARGB1555: 0x5,
  OMX_COLOR_Format16bitRGB565: 0x6,
  OMX_COLOR_Format16bitBGR565: 0x7,
  OMX_COLOR_Format18bitRGB666: 0x8,
  OMX_COLOR_Format18bitARGB1665: 0x9,
  OMX_COLOR_Format19bitARGB1666: 0xA,
  OMX_COLOR_Format24bitRGB888: 0xB,
  OMX_COLOR_Format24bitBGR888: 0xC,
  OMX_COLOR_Format24bitARGB1887: 0xD,
  OMX_COLOR_Format25bitARGB1888: 0xE,
  OMX_COLOR_Format32bitBGRA8888: 0xF,
  OMX_COLOR_Format32bitARGB8888: 0x10,
  OMX_COLOR_FormatYUV411Planar: 0x11,
  OMX_COLOR_FormatYUV411PackedPlanar: 0x12,
  OMX_COLOR_FormatYUV420Planar: 0x13,
  OMX_COLOR_FormatYUV420PackedPlanar: 0x14,
  OMX_COLOR_FormatYUV420SemiPlanar: 0x15,
  OMX_COLOR_FormatYUV422Planar: 0x16,
  OMX_COLOR_FormatYUV422PackedPlanar: 0x17,
  OMX_COLOR_FormatYUV422SemiPlanar: 0x18,
  OMX_COLOR_FormatYCbYCr: 0x19,
  OMX_COLOR_FormatYCrYCb: 0x1A,
  OMX_COLOR_FormatCbYCrY: 0x1B,
  OMX_COLOR_FormatCrYCbY: 0x1C,
  OMX_COLOR_FormatYUV444Interleaved: 0x1D,
  OMX_COLOR_FormatRawBayer8bit: 0x1E,
  OMX_COLOR_FormatRawBayer10bit: 0x1F,
  OMX_COLOR_FormatRawBayer8bitcompressed: 0x20,
  OMX_COLOR_FormatL2: 0x21,
  OMX_COLOR_FormatL4: 0x22,
  OMX_COLOR_FormatL8: 0x23,
  OMX_COLOR_FormatL16: 0x24,
  OMX_COLOR_FormatL24: 0x25,
  OMX_COLOR_FormatL32: 0x26,
  OMX_COLOR_FormatYUV420PackedSemiPlanar: 0x27,
  OMX_COLOR_FormatYUV422PackedSemiPlanar: 0x28,
  OMX_COLOR_Format18BitBGR666: 0x29,
  OMX_COLOR_Format24BitARGB6666: 0x2A,
  OMX_COLOR_Format24BitABGR6666: 0x2B,
  OMX_COLOR_FormatKhronosExtensions: 0x6F000000,
  OMX_COLOR_FormatVendorStartUnused: 0x7F000000,
  OMX_COLOR_FormatMax: 0x7FFFFFFF
};
module.exports.OMX_IMAGEFILTERTYPE = {
  OMX_ImageFilterNone: 0x0,
  OMX_ImageFilterNoise: 0x1,
  OMX_ImageFilterEmboss: 0x2,
  OMX_ImageFilterNegative: 0x3,
  OMX_ImageFilterSketch: 0x4,
  OMX_ImageFilterOilPaint: 0x5,
  OMX_ImageFilterHatch: 0x6,
  OMX_ImageFilterGpen: 0x7,
  OMX_ImageFilterAntialias: 0x8,
  OMX_ImageFilterDeRing: 0x9,
  OMX_ImageFilterSolarize: 0xA,
  OMX_ImageFilterKhronosExtensions: 0x6F000000,
  OMX_ImageFilterVendorStartUnused: 0x7F000000,
  OMX_ImageFilterMax: 0x7FFFFFFF
};
module.exports.OMX_COLORBLENDTYPE = {
  OMX_ColorBlendNone: 0x0,
  OMX_ColorBlendAlphaConstant: 0x1,
  OMX_ColorBlendAlphaPerPixel: 0x2,
  OMX_ColorBlendAlternate: 0x3,
  OMX_ColorBlendAnd: 0x4,
  OMX_ColorBlendOr: 0x5,
  OMX_ColorBlendInvert: 0x6,
  OMX_ColorBlendKhronosExtensions: 0x6F000000,
  OMX_ColorBlendVendorStartUnused: 0x7F000000,
  OMX_ColorBlendMax: 0x7FFFFFFF
};
module.exports.OMX_MIRRORTYPE = {
  OMX_MirrorNone: 0x0,
  OMX_MirrorVertical: 0x1,
  OMX_MirrorHorizontal: 0x2,
  OMX_MirrorBoth: 0x3,
  OMX_MirrorKhronosExtensions: 0x6F000000,
  OMX_MirrorVendorStartUnused: 0x7F000000,
  OMX_MirrorMax: 0x7FFFFFFF
};
module.exports.OMX_WHITEBALCONTROLTYPE = {
  OMX_WhiteBalControlOff: 0x0,
  OMX_WhiteBalControlAuto: 0x1,
  OMX_WhiteBalControlSunLight: 0x2,
  OMX_WhiteBalControlCloudy: 0x3,
  OMX_WhiteBalControlShade: 0x4,
  OMX_WhiteBalControlTungsten: 0x5,
  OMX_WhiteBalControlFluorescent: 0x6,
  OMX_WhiteBalControlIncandescent: 0x7,
  OMX_WhiteBalControlFlash: 0x8,
  OMX_WhiteBalControlHorizon: 0x9,
  OMX_WhiteBalControlKhronosExtensions: 0x6F000000,
  OMX_WhiteBalControlVendorStartUnused: 0x7F000000,
  OMX_WhiteBalControlMax: 0x7FFFFFFF
};
module.exports.OMX_EXPOSURECONTROLTYPE = {
  OMX_ExposureControlOff: 0x0,
  OMX_ExposureControlAuto: 0x1,
  OMX_ExposureControlNight: 0x2,
  OMX_ExposureControlBackLight: 0x3,
  OMX_ExposureControlSpotLight: 0x4,
  OMX_ExposureControlSports: 0x5,
  OMX_ExposureControlSnow: 0x6,
  OMX_ExposureControlBeach: 0x7,
  OMX_ExposureControlLargeAperture: 0x8,
  OMX_ExposureControlSmallApperture: 0x9,
  OMX_ExposureControlKhronosExtensions: 0x6F000000,
  OMX_ExposureControlVendorStartUnused: 0x7F000000,
  OMX_ExposureControlMax: 0x7FFFFFFF
};
module.exports.OMX_TRANSITIONEFFECTTYPE = {
  OMX_EffectNone: 0x0,
  OMX_EffectFadeFromBlack: 0x1,
  OMX_EffectFadeToBlack: 0x2,
  OMX_EffectUnspecifiedThroughConstantColor: 0x3,
  OMX_EffectDissolve: 0x4,
  OMX_EffectWipe: 0x5,
  OMX_EffectUnspecifiedMixOfTwoScenes: 0x6,
  OMX_EffectKhronosExtensions: 0x6F000000,
  OMX_EffectVendorStartUnused: 0x7F000000,
  OMX_EffectMax: 0x7FFFFFFF
};
module.exports.OMX_DATAUNITTYPE = {
  OMX_DataUnitCodedPicture: 0x0,
  OMX_DataUnitVideoSegment: 0x1,
  OMX_DataUnitSeveralSegments: 0x2,
  OMX_DataUnitArbitraryStreamSection: 0x3,
  OMX_DataUnitKhronosExtensions: 0x6F000000,
  OMX_DataUnitVendorStartUnused: 0x7F000000,
  OMX_DataUnitMax: 0x7FFFFFFF
};
module.exports.OMX_DATAUNITENCAPSULATIONTYPE = {
  OMX_DataEncapsulationElementaryStream: 0x0,
  OMX_DataEncapsulationGenericPayload: 0x1,
  OMX_DataEncapsulationRtpPayload: 0x2,
  OMX_DataEncapsulationKhronosExtensions: 0x6F000000,
  OMX_DataEncapsulationVendorStartUnused: 0x7F000000,
  OMX_DataEncapsulationMax: 0x7FFFFFFF
};
module.exports.OMX_DITHERTYPE = {
  OMX_DitherNone: 0x0,
  OMX_DitherOrdered: 0x1,
  OMX_DitherErrorDiffusion: 0x2,
  OMX_DitherOther: 0x3,
  OMX_DitherKhronosExtensions: 0x6F000000,
  OMX_DitherVendorStartUnused: 0x7F000000,
  OMX_DitherMax: 0x7FFFFFFF
};
module.exports.OMX_METERINGTYPE = {
  OMX_MeteringModeAverage: 0x0,
  OMX_MeteringModeSpot: 0x1,
  OMX_MeteringModeMatrix: 0x2,
  OMX_MeteringKhronosExtensions: 0x6F000000,
  OMX_MeteringVendorStartUnused: 0x7F000000,
  OMX_EVModeMax: 0x7FFFFFFF
};
module.exports.OMX_FOCUSSTATUSTYPE = {
  OMX_FocusStatusOff: 0x0,
  OMX_FocusStatusRequest: 0x1,
  OMX_FocusStatusReached: 0x2,
  OMX_FocusStatusUnableToReach: 0x3,
  OMX_FocusStatusLost: 0x4,
  OMX_FocusStatusKhronosExtensions: 0x6F000000,
  OMX_FocusStatusVendorStartUnused: 0x7F000000,
  OMX_FocusStatusMax: 0x7FFFFFFF
};
