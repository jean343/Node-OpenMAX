export enum OMX_AUDIO_CODINGTYPE {
  OMX_AUDIO_CodingUnused = 0x0,
  OMX_AUDIO_CodingAutoDetect = 0x1,
  OMX_AUDIO_CodingPCM = 0x2,
  OMX_AUDIO_CodingADPCM = 0x3,
  OMX_AUDIO_CodingAMR = 0x4,
  OMX_AUDIO_CodingGSMFR = 0x5,
  OMX_AUDIO_CodingGSMEFR = 0x6,
  OMX_AUDIO_CodingGSMHR = 0x7,
  OMX_AUDIO_CodingPDCFR = 0x8,
  OMX_AUDIO_CodingPDCEFR = 0x9,
  OMX_AUDIO_CodingPDCHR = 0xA,
  OMX_AUDIO_CodingTDMAFR = 0xB,
  OMX_AUDIO_CodingTDMAEFR = 0xC,
  OMX_AUDIO_CodingQCELP8 = 0xD,
  OMX_AUDIO_CodingQCELP13 = 0xE,
  OMX_AUDIO_CodingEVRC = 0xF,
  OMX_AUDIO_CodingSMV = 0x10,
  OMX_AUDIO_CodingG711 = 0x11,
  OMX_AUDIO_CodingG723 = 0x12,
  OMX_AUDIO_CodingG726 = 0x13,
  OMX_AUDIO_CodingG729 = 0x14,
  OMX_AUDIO_CodingAAC = 0x15,
  OMX_AUDIO_CodingMP3 = 0x16,
  OMX_AUDIO_CodingSBC = 0x17,
  OMX_AUDIO_CodingVORBIS = 0x18,
  OMX_AUDIO_CodingWMA = 0x19,
  OMX_AUDIO_CodingRA = 0x1A,
  OMX_AUDIO_CodingMIDI = 0x1B,
  OMX_AUDIO_CodingKhronosExtensions = 0x6F000000,
  OMX_AUDIO_CodingVendorStartUnused = 0x7F000000,
  OMX_AUDIO_CodingMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_PCMMODETYPE {
  OMX_AUDIO_PCMModeLinear = 0x0,
  OMX_AUDIO_PCMModeALaw = 0x1,
  OMX_AUDIO_PCMModeMULaw = 0x2,
  OMX_AUDIO_PCMModeKhronosExtensions = 0x6F000000,
  OMX_AUDIO_PCMModeVendorStartUnused = 0x7F000000,
  OMX_AUDIO_PCMModeMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_CHANNELTYPE {
  OMX_AUDIO_ChannelNone = 0x0,
  OMX_AUDIO_ChannelLF = 0x1,
  OMX_AUDIO_ChannelRF = 0x2,
  OMX_AUDIO_ChannelCF = 0x3,
  OMX_AUDIO_ChannelLS = 0x4,
  OMX_AUDIO_ChannelRS = 0x5,
  OMX_AUDIO_ChannelLFE = 0x6,
  OMX_AUDIO_ChannelCS = 0x7,
  OMX_AUDIO_ChannelLR = 0x8,
  OMX_AUDIO_ChannelRR = 0x9,
  OMX_AUDIO_ChannelKhronosExtensions = 0x6F000000,
  OMX_AUDIO_ChannelVendorStartUnused = 0x7F000000,
  OMX_AUDIO_ChannelMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_CHANNELMODETYPE {
  OMX_AUDIO_ChannelModeStereo = 0x0,
  OMX_AUDIO_ChannelModeJointStereo = 0x1,
  OMX_AUDIO_ChannelModeDual = 0x2,
  OMX_AUDIO_ChannelModeMono = 0x3,
  OMX_AUDIO_ChannelModeKhronosExtensions = 0x6F000000,
  OMX_AUDIO_ChannelModeVendorStartUnused = 0x7F000000,
  OMX_AUDIO_ChannelModeMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_MP3STREAMFORMATTYPE {
  OMX_AUDIO_MP3StreamFormatMP1Layer3 = 0x0,
  OMX_AUDIO_MP3StreamFormatMP2Layer3 = 0x1,
  OMX_AUDIO_MP3StreamFormatMP2_5Layer3 = 0x2,
  OMX_AUDIO_MP3StreamFormatKhronosExtensions = 0x6F000000,
  OMX_AUDIO_MP3StreamFormatVendorStartUnused = 0x7F000000,
  OMX_AUDIO_MP3StreamFormatMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_AACSTREAMFORMATTYPE {
  OMX_AUDIO_AACStreamFormatMP2ADTS = 0x0,
  OMX_AUDIO_AACStreamFormatMP4ADTS = 0x1,
  OMX_AUDIO_AACStreamFormatMP4LOAS = 0x2,
  OMX_AUDIO_AACStreamFormatMP4LATM = 0x3,
  OMX_AUDIO_AACStreamFormatADIF = 0x4,
  OMX_AUDIO_AACStreamFormatMP4FF = 0x5,
  OMX_AUDIO_AACStreamFormatRAW = 0x6,
  OMX_AUDIO_AACStreamFormatKhronosExtensions = 0x6F000000,
  OMX_AUDIO_AACStreamFormatVendorStartUnused = 0x7F000000,
  OMX_AUDIO_AACStreamFormatMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_AACPROFILETYPE {
  OMX_AUDIO_AACObjectNull = 0x0,
  OMX_AUDIO_AACObjectMain = 0x1,
  OMX_AUDIO_AACObjectLC = 0x2,
  OMX_AUDIO_AACObjectSSR = 0x3,
  OMX_AUDIO_AACObjectLTP = 0x4,
  OMX_AUDIO_AACObjectHE = 0x5,
  OMX_AUDIO_AACObjectScalable = 0x6,
  OMX_AUDIO_AACObjectERLC = 0x11,
  OMX_AUDIO_AACObjectLD = 0x17,
  OMX_AUDIO_AACObjectHE_PS = 0x1D,
  OMX_AUDIO_AACObjectKhronosExtensions = 0x6F000000,
  OMX_AUDIO_AACObjectVendorStartUnused = 0x7F000000,
  OMX_AUDIO_AACObjectMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_WMAFORMATTYPE {
  OMX_AUDIO_WMAFormatUnused = 0x0,
  OMX_AUDIO_WMAFormat7 = 0x1,
  OMX_AUDIO_WMAFormat8 = 0x2,
  OMX_AUDIO_WMAFormat9 = 0x3,
  OMX_AUDIO_WMAFormatKhronosExtensions = 0x6F000000,
  OMX_AUDIO_WMAFormatVendorStartUnused = 0x7F000000,
  OMX_AUDIO_WMAFormatMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_WMAPROFILETYPE {
  OMX_AUDIO_WMAProfileUnused = 0x0,
  OMX_AUDIO_WMAProfileL1 = 0x1,
  OMX_AUDIO_WMAProfileL2 = 0x2,
  OMX_AUDIO_WMAProfileL3 = 0x3,
  OMX_AUDIO_WMAProfileKhronosExtensions = 0x6F000000,
  OMX_AUDIO_WMAProfileVendorStartUnused = 0x7F000000,
  OMX_AUDIO_WMAProfileMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_RAFORMATTYPE {
  OMX_AUDIO_RAFormatUnused = 0x0,
  OMX_AUDIO_RA8 = 0x1,
  OMX_AUDIO_RA9 = 0x2,
  OMX_AUDIO_RA10_AAC = 0x3,
  OMX_AUDIO_RA10_CODEC = 0x4,
  OMX_AUDIO_RA10_LOSSLESS = 0x5,
  OMX_AUDIO_RA10_MULTICHANNEL = 0x6,
  OMX_AUDIO_RA10_VOICE = 0x7,
  OMX_AUDIO_RAFormatKhronosExtensions = 0x6F000000,
  OMX_AUDIO_RAFormatVendorStartUnused = 0x7F000000,
  OMX_VIDEO_RAFormatMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_SBCALLOCMETHODTYPE {
  OMX_AUDIO_SBCAllocMethodLoudness = 0x0,
  OMX_AUDIO_SBCAllocMethodSNR = 0x1,
  OMX_AUDIO_SBCAllocMethodKhronosExtensions = 0x6F000000,
  OMX_AUDIO_SBCAllocMethodVendorStartUnused = 0x7F000000,
  OMX_AUDIO_SBCAllocMethodMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_G723RATE {
  OMX_AUDIO_G723ModeUnused = 0x0,
  OMX_AUDIO_G723ModeLow = 0x1,
  OMX_AUDIO_G723ModeHigh = 0x2,
  OMX_AUDIO_G723ModeKhronosExtensions = 0x6F000000,
  OMX_AUDIO_G723ModeVendorStartUnused = 0x7F000000,
  OMX_AUDIO_G723ModeMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_G726MODE {
  OMX_AUDIO_G726ModeUnused = 0x0,
  OMX_AUDIO_G726Mode16 = 0x1,
  OMX_AUDIO_G726Mode24 = 0x2,
  OMX_AUDIO_G726Mode32 = 0x3,
  OMX_AUDIO_G726Mode40 = 0x4,
  OMX_AUDIO_G726ModeKhronosExtensions = 0x6F000000,
  OMX_AUDIO_G726ModeVendorStartUnused = 0x7F000000,
  OMX_AUDIO_G726ModeMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_G729TYPE {
  OMX_AUDIO_G729 = 0x0,
  OMX_AUDIO_G729A = 0x1,
  OMX_AUDIO_G729B = 0x2,
  OMX_AUDIO_G729AB = 0x3,
  OMX_AUDIO_G729KhronosExtensions = 0x6F000000,
  OMX_AUDIO_G729VendorStartUnused = 0x7F000000,
  OMX_AUDIO_G729Max = 0x7FFFFFFF
}
export enum OMX_AUDIO_AMRFRAMEFORMATTYPE {
  OMX_AUDIO_AMRFrameFormatConformance = 0x0,
  OMX_AUDIO_AMRFrameFormatIF1 = 0x1,
  OMX_AUDIO_AMRFrameFormatIF2 = 0x2,
  OMX_AUDIO_AMRFrameFormatFSF = 0x3,
  OMX_AUDIO_AMRFrameFormatRTPPayload = 0x4,
  OMX_AUDIO_AMRFrameFormatITU = 0x5,
  OMX_AUDIO_AMRFrameFormatKhronosExtensions = 0x6F000000,
  OMX_AUDIO_AMRFrameFormatVendorStartUnused = 0x7F000000,
  OMX_AUDIO_AMRFrameFormatMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_AMRBANDMODETYPE {
  OMX_AUDIO_AMRBandModeUnused = 0x0,
  OMX_AUDIO_AMRBandModeNB0 = 0x1,
  OMX_AUDIO_AMRBandModeNB1 = 0x2,
  OMX_AUDIO_AMRBandModeNB2 = 0x3,
  OMX_AUDIO_AMRBandModeNB3 = 0x4,
  OMX_AUDIO_AMRBandModeNB4 = 0x5,
  OMX_AUDIO_AMRBandModeNB5 = 0x6,
  OMX_AUDIO_AMRBandModeNB6 = 0x7,
  OMX_AUDIO_AMRBandModeNB7 = 0x8,
  OMX_AUDIO_AMRBandModeWB0 = 0x9,
  OMX_AUDIO_AMRBandModeWB1 = 0xA,
  OMX_AUDIO_AMRBandModeWB2 = 0xB,
  OMX_AUDIO_AMRBandModeWB3 = 0xC,
  OMX_AUDIO_AMRBandModeWB4 = 0xD,
  OMX_AUDIO_AMRBandModeWB5 = 0xE,
  OMX_AUDIO_AMRBandModeWB6 = 0xF,
  OMX_AUDIO_AMRBandModeWB7 = 0x10,
  OMX_AUDIO_AMRBandModeWB8 = 0x11,
  OMX_AUDIO_AMRBandModeKhronosExtensions = 0x6F000000,
  OMX_AUDIO_AMRBandModeVendorStartUnused = 0x7F000000,
  OMX_AUDIO_AMRBandModeMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_AMRDTXMODETYPE {
  OMX_AUDIO_AMRDTXModeOff = 0x0,
  OMX_AUDIO_AMRDTXModeOnVAD1 = 0x1,
  OMX_AUDIO_AMRDTXModeOnVAD2 = 0x2,
  OMX_AUDIO_AMRDTXModeOnAuto = 0x3,
  OMX_AUDIO_AMRDTXasEFR = 0x4,
  OMX_AUDIO_AMRDTXModeKhronosExtensions = 0x6F000000,
  OMX_AUDIO_AMRDTXModeVendorStartUnused = 0x7F000000,
  OMX_AUDIO_AMRDTXModeMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_CDMARATETYPE {
  OMX_AUDIO_CDMARateBlank = 0x0,
  OMX_AUDIO_CDMARateFull = 0x1,
  OMX_AUDIO_CDMARateHalf = 0x2,
  OMX_AUDIO_CDMARateQuarter = 0x3,
  OMX_AUDIO_CDMARateEighth = 0x4,
  OMX_AUDIO_CDMARateErasure = 0x5,
  OMX_AUDIO_CDMARateKhronosExtensions = 0x6F000000,
  OMX_AUDIO_CDMARateVendorStartUnused = 0x7F000000,
  OMX_AUDIO_CDMARateMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_MIDIFORMATTYPE {
  OMX_AUDIO_MIDIFormatUnknown = 0x0,
  OMX_AUDIO_MIDIFormatSMF0 = 0x1,
  OMX_AUDIO_MIDIFormatSMF1 = 0x2,
  OMX_AUDIO_MIDIFormatSMF2 = 0x3,
  OMX_AUDIO_MIDIFormatSPMIDI = 0x4,
  OMX_AUDIO_MIDIFormatXMF0 = 0x5,
  OMX_AUDIO_MIDIFormatXMF1 = 0x6,
  OMX_AUDIO_MIDIFormatMobileXMF = 0x7,
  OMX_AUDIO_MIDIFormatKhronosExtensions = 0x6F000000,
  OMX_AUDIO_MIDIFormatVendorStartUnused = 0x7F000000,
  OMX_AUDIO_MIDIFormatMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_MIDISOUNDBANKTYPE {
  OMX_AUDIO_MIDISoundBankUnused = 0x0,
  OMX_AUDIO_MIDISoundBankDLS1 = 0x1,
  OMX_AUDIO_MIDISoundBankDLS2 = 0x2,
  OMX_AUDIO_MIDISoundBankMobileDLSBase = 0x3,
  OMX_AUDIO_MIDISoundBankMobileDLSPlusOptions = 0x4,
  OMX_AUDIO_MIDISoundBankKhronosExtensions = 0x6F000000,
  OMX_AUDIO_MIDISoundBankVendorStartUnused = 0x7F000000,
  OMX_AUDIO_MIDISoundBankMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_MIDISOUNDBANKLAYOUTTYPE {
  OMX_AUDIO_MIDISoundBankLayoutUnused = 0x0,
  OMX_AUDIO_MIDISoundBankLayoutGM = 0x1,
  OMX_AUDIO_MIDISoundBankLayoutGM2 = 0x2,
  OMX_AUDIO_MIDISoundBankLayoutUser = 0x3,
  OMX_AUDIO_MIDISoundBankLayoutKhronosExtensions = 0x6F000000,
  OMX_AUDIO_MIDISoundBankLayoutVendorStartUnused = 0x7F000000,
  OMX_AUDIO_MIDISoundBankLayoutMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_MIDIPLAYBACKSTATETYPE {
  OMX_AUDIO_MIDIPlayBackStateUnknown = 0x0,
  OMX_AUDIO_MIDIPlayBackStateClosedEngaged = 0x1,
  OMX_AUDIO_MIDIPlayBackStateParsing = 0x2,
  OMX_AUDIO_MIDIPlayBackStateOpenEngaged = 0x3,
  OMX_AUDIO_MIDIPlayBackStatePlaying = 0x4,
  OMX_AUDIO_MIDIPlayBackStatePlayingPartially = 0x5,
  OMX_AUDIO_MIDIPlayBackStatePlayingSilently = 0x6,
  OMX_AUDIO_MIDIPlayBackStateKhronosExtensions = 0x6F000000,
  OMX_AUDIO_MIDIPlayBackStateVendorStartUnused = 0x7F000000,
  OMX_AUDIO_MIDIPlayBackStateMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_STEREOWIDENINGTYPE {
  OMX_AUDIO_StereoWideningHeadphones = 0x0,
  OMX_AUDIO_StereoWideningLoudspeakers = 0x1,
  OMX_AUDIO_StereoWideningKhronosExtensions = 0x6F000000,
  OMX_AUDIO_StereoWideningVendorStartUnused = 0x7F000000,
  OMX_AUDIO_StereoWideningMax = 0x7FFFFFFF
}
export enum OMX_AUDIO_ECHOCANTYPE {
  OMX_AUDIO_EchoCanOff = 0x0,
  OMX_AUDIO_EchoCanNormal = 0x1,
  OMX_AUDIO_EchoCanHFree = 0x2,
  OMX_AUDIO_EchoCanCarKit = 0x3,
  OMX_AUDIO_EchoCanKhronosExtensions = 0x6F000000,
  OMX_AUDIO_EchoCanVendorStartUnused = 0x7F000000,
  OMX_AUDIO_EchoCanMax = 0x7FFFFFFF
}
