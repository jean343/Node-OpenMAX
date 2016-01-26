export enum OMX_IMAGE_CODINGTYPE {
  OMX_IMAGE_CodingUnused = 0x0,
  OMX_IMAGE_CodingAutoDetect = 0x1,
  OMX_IMAGE_CodingJPEG = 0x2,
  OMX_IMAGE_CodingJPEG2K = 0x3,
  OMX_IMAGE_CodingEXIF = 0x4,
  OMX_IMAGE_CodingTIFF = 0x5,
  OMX_IMAGE_CodingGIF = 0x6,
  OMX_IMAGE_CodingPNG = 0x7,
  OMX_IMAGE_CodingLZW = 0x8,
  OMX_IMAGE_CodingBMP = 0x9,
  OMX_IMAGE_CodingKhronosExtensions = 0x6F000000,
  OMX_IMAGE_CodingVendorStartUnused = 0x7F000000,
  OMX_IMAGE_CodingTGA = 0x7F000001,
  OMX_IMAGE_CodingPPM = 0x7F000002,
  OMX_IMAGE_CodingMax = 0x7FFFFFFF
}
export enum OMX_IMAGE_FLASHCONTROLTYPE {
  OMX_IMAGE_FlashControlOn = 0x0,
  OMX_IMAGE_FlashControlOff = 0x1,
  OMX_IMAGE_FlashControlAuto = 0x2,
  OMX_IMAGE_FlashControlRedEyeReduction = 0x3,
  OMX_IMAGE_FlashControlFillin = 0x4,
  OMX_IMAGE_FlashControlTorch = 0x5,
  OMX_IMAGE_FlashControlKhronosExtensions = 0x6F000000,
  OMX_IMAGE_FlashControlVendorStartUnused = 0x7F000000,
  OMX_IMAGE_FlashControlMax = 0x7FFFFFFF
}
export enum OMX_IMAGE_FOCUSCONTROLTYPE {
  OMX_IMAGE_FocusControlOn = 0x0,
  OMX_IMAGE_FocusControlOff = 0x1,
  OMX_IMAGE_FocusControlAuto = 0x2,
  OMX_IMAGE_FocusControlAutoLock = 0x3,
  OMX_IMAGE_FocusControlKhronosExtensions = 0x6F000000,
  OMX_IMAGE_FocusControlVendorStartUnused = 0x7F000000,
  OMX_IMAGE_FocusControlHyperfocal = 0x7F000001,
  OMX_IMAGE_FocusControlAutoMacro = 0x7F000002,
  OMX_IMAGE_FocusControlAutoInfinity = 0x7F000003,
  OMX_IMAGE_FocusControlAutoLockMacro = 0x7F000004,
  OMX_IMAGE_FocusControlAutoLockInfinity = 0x7F000005,
  OMX_IMAGE_FocusControlNearFixed = 0x7F000006,
  OMX_IMAGE_FocusControlAutoNear = 0x7F000007,
  OMX_IMAGE_FocusControlAutoLockNear = 0x7F000008,
  OMX_IMAGE_FocusControlInfinityFixed = 0x7F000009,
  OMX_IMAGE_FocusControlMacroFixed = 0x7F00000A,
  OMX_IMAGE_FocusControlAutoFast = 0x7F00000B,
  OMX_IMAGE_FocusControlAutoMacroFast = 0x7F00000C,
  OMX_IMAGE_FocusControlAutoNearFast = 0x7F00000D,
  OMX_IMAGE_FocusControlAutoInfinityFast = 0x7F00000E,
  OMX_IMAGE_FocusControlCurrentFixed = 0x7F00000F,
  OMX_IMAGE_FocusControlMax = 0x7FFFFFFF
}
export enum OMX_IMAGE_QUANTIZATIONTABLETYPE {
  OMX_IMAGE_QuantizationTableLuma = 0x0,
  OMX_IMAGE_QuantizationTableChroma = 0x1,
  OMX_IMAGE_QuantizationTableChromaCb = 0x2,
  OMX_IMAGE_QuantizationTableChromaCr = 0x3,
  OMX_IMAGE_QuantizationTableKhronosExtensions = 0x6F000000,
  OMX_IMAGE_QuantizationTableVendorStartUnused = 0x7F000000,
  OMX_IMAGE_QuantizationTableMax = 0x7FFFFFFF
}
export enum OMX_IMAGE_HUFFMANTABLETYPE {
  OMX_IMAGE_HuffmanTableAC = 0x0,
  OMX_IMAGE_HuffmanTableDC = 0x1,
  OMX_IMAGE_HuffmanTableACLuma = 0x2,
  OMX_IMAGE_HuffmanTableACChroma = 0x3,
  OMX_IMAGE_HuffmanTableDCLuma = 0x4,
  OMX_IMAGE_HuffmanTableDCChroma = 0x5,
  OMX_IMAGE_HuffmanTableKhronosExtensions = 0x6F000000,
  OMX_IMAGE_HuffmanTableVendorStartUnused = 0x7F000000,
  OMX_IMAGE_HuffmanTableMax = 0x7FFFFFFF
}
