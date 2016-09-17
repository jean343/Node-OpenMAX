export enum IMAGE_CODINGTYPE {
  IMAGE_CodingUnused = 0x0,
  IMAGE_CodingAutoDetect = 0x1,
  IMAGE_CodingJPEG = 0x2,
  IMAGE_CodingJPEG2K = 0x3,
  IMAGE_CodingEXIF = 0x4,
  IMAGE_CodingTIFF = 0x5,
  IMAGE_CodingGIF = 0x6,
  IMAGE_CodingPNG = 0x7,
  IMAGE_CodingLZW = 0x8,
  IMAGE_CodingBMP = 0x9,
  IMAGE_CodingKhronosExtensions = 0x6F000000,
  IMAGE_CodingVendorStartUnused = 0x7F000000,
  IMAGE_CodingTGA = 0x7F000001,
  IMAGE_CodingPPM = 0x7F000002,
  IMAGE_CodingMax = 0x7FFFFFFF
}
export enum IMAGE_FLASHCONTROLTYPE {
  IMAGE_FlashControlOn = 0x0,
  IMAGE_FlashControlOff = 0x1,
  IMAGE_FlashControlAuto = 0x2,
  IMAGE_FlashControlRedEyeReduction = 0x3,
  IMAGE_FlashControlFillin = 0x4,
  IMAGE_FlashControlTorch = 0x5,
  IMAGE_FlashControlKhronosExtensions = 0x6F000000,
  IMAGE_FlashControlVendorStartUnused = 0x7F000000,
  IMAGE_FlashControlMax = 0x7FFFFFFF
}
export enum IMAGE_FOCUSCONTROLTYPE {
  IMAGE_FocusControlOn = 0x0,
  IMAGE_FocusControlOff = 0x1,
  IMAGE_FocusControlAuto = 0x2,
  IMAGE_FocusControlAutoLock = 0x3,
  IMAGE_FocusControlKhronosExtensions = 0x6F000000,
  IMAGE_FocusControlVendorStartUnused = 0x7F000000,
  IMAGE_FocusControlHyperfocal = 0x7F000001,
  IMAGE_FocusControlAutoMacro = 0x7F000002,
  IMAGE_FocusControlAutoInfinity = 0x7F000003,
  IMAGE_FocusControlAutoLockMacro = 0x7F000004,
  IMAGE_FocusControlAutoLockInfinity = 0x7F000005,
  IMAGE_FocusControlNearFixed = 0x7F000006,
  IMAGE_FocusControlAutoNear = 0x7F000007,
  IMAGE_FocusControlAutoLockNear = 0x7F000008,
  IMAGE_FocusControlInfinityFixed = 0x7F000009,
  IMAGE_FocusControlMacroFixed = 0x7F00000A,
  IMAGE_FocusControlAutoFast = 0x7F00000B,
  IMAGE_FocusControlAutoMacroFast = 0x7F00000C,
  IMAGE_FocusControlAutoNearFast = 0x7F00000D,
  IMAGE_FocusControlAutoInfinityFast = 0x7F00000E,
  IMAGE_FocusControlCurrentFixed = 0x7F00000F,
  IMAGE_FocusControlMax = 0x7FFFFFFF
}
export enum IMAGE_QUANTIZATIONTABLETYPE {
  IMAGE_QuantizationTableLuma = 0x0,
  IMAGE_QuantizationTableChroma = 0x1,
  IMAGE_QuantizationTableChromaCb = 0x2,
  IMAGE_QuantizationTableChromaCr = 0x3,
  IMAGE_QuantizationTableKhronosExtensions = 0x6F000000,
  IMAGE_QuantizationTableVendorStartUnused = 0x7F000000,
  IMAGE_QuantizationTableMax = 0x7FFFFFFF
}
export enum IMAGE_HUFFMANTABLETYPE {
  IMAGE_HuffmanTableAC = 0x0,
  IMAGE_HuffmanTableDC = 0x1,
  IMAGE_HuffmanTableACLuma = 0x2,
  IMAGE_HuffmanTableACChroma = 0x3,
  IMAGE_HuffmanTableDCLuma = 0x4,
  IMAGE_HuffmanTableDCChroma = 0x5,
  IMAGE_HuffmanTableKhronosExtensions = 0x6F000000,
  IMAGE_HuffmanTableVendorStartUnused = 0x7F000000,
  IMAGE_HuffmanTableMax = 0x7FFFFFFF
}
