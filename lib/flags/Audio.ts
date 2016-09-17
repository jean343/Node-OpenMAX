export enum AUDIO_CODINGTYPE {
  AUDIO_CodingUnused = 0x0,
  AUDIO_CodingAutoDetect = 0x1,
  AUDIO_CodingPCM = 0x2,
  AUDIO_CodingADPCM = 0x3,
  AUDIO_CodingAMR = 0x4,
  AUDIO_CodingGSMFR = 0x5,
  AUDIO_CodingGSMEFR = 0x6,
  AUDIO_CodingGSMHR = 0x7,
  AUDIO_CodingPDCFR = 0x8,
  AUDIO_CodingPDCEFR = 0x9,
  AUDIO_CodingPDCHR = 0xA,
  AUDIO_CodingTDMAFR = 0xB,
  AUDIO_CodingTDMAEFR = 0xC,
  AUDIO_CodingQCELP8 = 0xD,
  AUDIO_CodingQCELP13 = 0xE,
  AUDIO_CodingEVRC = 0xF,
  AUDIO_CodingSMV = 0x10,
  AUDIO_CodingG711 = 0x11,
  AUDIO_CodingG723 = 0x12,
  AUDIO_CodingG726 = 0x13,
  AUDIO_CodingG729 = 0x14,
  AUDIO_CodingAAC = 0x15,
  AUDIO_CodingMP3 = 0x16,
  AUDIO_CodingSBC = 0x17,
  AUDIO_CodingVORBIS = 0x18,
  AUDIO_CodingWMA = 0x19,
  AUDIO_CodingRA = 0x1A,
  AUDIO_CodingMIDI = 0x1B,
  AUDIO_CodingKhronosExtensions = 0x6F000000,
  AUDIO_CodingVendorStartUnused = 0x7F000000,
  AUDIO_CodingFLAC = 0x7F000001,
  AUDIO_CodingDDP = 0x7F000002,
  AUDIO_CodingDTS = 0x7F000003,
  AUDIO_CodingWMAPRO = 0x7F000004,
  AUDIO_CodingATRAC3 = 0x7F000005,
  AUDIO_CodingATRACX = 0x7F000006,
  AUDIO_CodingATRACAAL = 0x7F000007,
  AUDIO_CodingMax = 0x7FFFFFFF
}
export enum AUDIO_PCMMODETYPE {
  AUDIO_PCMModeLinear = 0x0,
  AUDIO_PCMModeALaw = 0x1,
  AUDIO_PCMModeMULaw = 0x2,
  AUDIO_PCMModeKhronosExtensions = 0x6F000000,
  AUDIO_PCMModeVendorStartUnused = 0x7F000000,
  AUDIO_PCMModeMax = 0x7FFFFFFF
}
export enum AUDIO_CHANNELTYPE {
  AUDIO_ChannelNone = 0x0,
  AUDIO_ChannelLF = 0x1,
  AUDIO_ChannelRF = 0x2,
  AUDIO_ChannelCF = 0x3,
  AUDIO_ChannelLS = 0x4,
  AUDIO_ChannelRS = 0x5,
  AUDIO_ChannelLFE = 0x6,
  AUDIO_ChannelCS = 0x7,
  AUDIO_ChannelLR = 0x8,
  AUDIO_ChannelRR = 0x9,
  AUDIO_ChannelKhronosExtensions = 0x6F000000,
  AUDIO_ChannelVendorStartUnused = 0x7F000000,
  AUDIO_ChannelMax = 0x7FFFFFFF
}
export enum AUDIO_CHANNELMODETYPE {
  AUDIO_ChannelModeStereo = 0x0,
  AUDIO_ChannelModeJointStereo = 0x1,
  AUDIO_ChannelModeDual = 0x2,
  AUDIO_ChannelModeMono = 0x3,
  AUDIO_ChannelModeKhronosExtensions = 0x6F000000,
  AUDIO_ChannelModeVendorStartUnused = 0x7F000000,
  AUDIO_ChannelModeMax = 0x7FFFFFFF
}
export enum AUDIO_MP3STREAMFORMATTYPE {
  AUDIO_MP3StreamFormatMP1Layer3 = 0x0,
  AUDIO_MP3StreamFormatMP2Layer3 = 0x1,
  AUDIO_MP3StreamFormatMP2_5Layer3 = 0x2,
  AUDIO_MP3StreamFormatKhronosExtensions = 0x6F000000,
  AUDIO_MP3StreamFormatVendorStartUnused = 0x7F000000,
  AUDIO_MP3StreamFormatMax = 0x7FFFFFFF
}
export enum AUDIO_DDPBITSTREAMID {
  AUDIO_DDPBitStreamIdAC3 = 0x8,
  AUDIO_DDPBitStreamIdEAC3 = 0x10,
  AUDIO_DDPBitStreamIdKhronosExtensions = 0x6F000000,
  AUDIO_DDPBitStreamIdVendorStartUnused = 0x7F000000,
  AUDIO_DDPBitStreamIdMax = 0x7FFFFFFF
}
export enum AUDIO_DDPBITSTREAMMODE {
  AUDIO_DDPBitStreamModeCM = 0x0,
  AUDIO_DDPBitStreamModeME = 0x1,
  AUDIO_DDPBitStreamModeVI = 0x2,
  AUDIO_DDPBitStreamModeHI = 0x3,
  AUDIO_DDPBitStreamModeD = 0x4,
  AUDIO_DDPBitStreamModeC = 0x5,
  AUDIO_DDPBitStreamModeE = 0x6,
  AUDIO_DDPBitStreamModeVO = 0x7,
  AUDIO_DDPBitStreamModeK = 0x8,
  AUDIO_DDPBitStreamModeKhronosExtensions = 0x6F000000,
  AUDIO_DDPBitStreamModeVendorStartUnused = 0x7F000000,
  AUDIO_DDPBitStreamModeMax = 0x7FFFFFFF
}
export enum AUDIO_DDPDOLBYSURROUNDMODE {
  AUDIO_DDPDolbySurroundModeNotIndicated = 0x0,
  AUDIO_DDPDolbySurroundModeNotDolbySurround = 0x1,
  AUDIO_DDPDolbySurroundModeDolbySurroundEncoded = 0x2,
  AUDIO_DDPDolbySurroundModeReserverd = 0x3,
  AUDIO_DDPDolbySurroundModeKhronosExtensions = 0x6F000000,
  AUDIO_DDPDolbySurroundModeVendorStartUnused = 0x7F000000,
  AUDIO_DDPDolbySurroundModeMax = 0x7FFFFFFF
}
export enum AUDIO_AACSTREAMFORMATTYPE {
  AUDIO_AACStreamFormatMP2ADTS = 0x0,
  AUDIO_AACStreamFormatMP4ADTS = 0x1,
  AUDIO_AACStreamFormatMP4LOAS = 0x2,
  AUDIO_AACStreamFormatMP4LATM = 0x3,
  AUDIO_AACStreamFormatADIF = 0x4,
  AUDIO_AACStreamFormatMP4FF = 0x5,
  AUDIO_AACStreamFormatRAW = 0x6,
  AUDIO_AACStreamFormatKhronosExtensions = 0x6F000000,
  AUDIO_AACStreamFormatVendorStartUnused = 0x7F000000,
  AUDIO_AACStreamFormatMax = 0x7FFFFFFF
}
export enum AUDIO_AACPROFILETYPE {
  AUDIO_AACObjectNull = 0x0,
  AUDIO_AACObjectMain = 0x1,
  AUDIO_AACObjectLC = 0x2,
  AUDIO_AACObjectSSR = 0x3,
  AUDIO_AACObjectLTP = 0x4,
  AUDIO_AACObjectHE = 0x5,
  AUDIO_AACObjectScalable = 0x6,
  AUDIO_AACObjectERLC = 0x11,
  AUDIO_AACObjectLD = 0x17,
  AUDIO_AACObjectHE_PS = 0x1D,
  AUDIO_AACObjectKhronosExtensions = 0x6F000000,
  AUDIO_AACObjectVendorStartUnused = 0x7F000000,
  AUDIO_AACObjectMax = 0x7FFFFFFF
}
export enum AUDIO_WMAFORMATTYPE {
  AUDIO_WMAFormatUnused = 0x0,
  AUDIO_WMAFormat7 = 0x1,
  AUDIO_WMAFormat8 = 0x2,
  AUDIO_WMAFormat9 = 0x3,
  AUDIO_WMAFormatKhronosExtensions = 0x6F000000,
  AUDIO_WMAFormatVendorStartUnused = 0x7F000000,
  AUDIO_WMAFormatMax = 0x7FFFFFFF
}
export enum AUDIO_WMAPROFILETYPE {
  AUDIO_WMAProfileUnused = 0x0,
  AUDIO_WMAProfileL1 = 0x1,
  AUDIO_WMAProfileL2 = 0x2,
  AUDIO_WMAProfileL3 = 0x3,
  AUDIO_WMAProfileKhronosExtensions = 0x6F000000,
  AUDIO_WMAProfileVendorStartUnused = 0x7F000000,
  AUDIO_WMAProfileMax = 0x7FFFFFFF
}
export enum AUDIO_RAFORMATTYPE {
  AUDIO_RAFormatUnused = 0x0,
  AUDIO_RA8 = 0x1,
  AUDIO_RA9 = 0x2,
  AUDIO_RA10_AAC = 0x3,
  AUDIO_RA10_CODEC = 0x4,
  AUDIO_RA10_LOSSLESS = 0x5,
  AUDIO_RA10_MULTICHANNEL = 0x6,
  AUDIO_RA10_VOICE = 0x7,
  AUDIO_RAFormatKhronosExtensions = 0x6F000000,
  AUDIO_RAFormatVendorStartUnused = 0x7F000000,
  VIDEO_RAFormatMax = 0x7FFFFFFF
}
export enum AUDIO_SBCALLOCMETHODTYPE {
  AUDIO_SBCAllocMethodLoudness = 0x0,
  AUDIO_SBCAllocMethodSNR = 0x1,
  AUDIO_SBCAllocMethodKhronosExtensions = 0x6F000000,
  AUDIO_SBCAllocMethodVendorStartUnused = 0x7F000000,
  AUDIO_SBCAllocMethodMax = 0x7FFFFFFF
}
export enum AUDIO_G723RATE {
  AUDIO_G723ModeUnused = 0x0,
  AUDIO_G723ModeLow = 0x1,
  AUDIO_G723ModeHigh = 0x2,
  AUDIO_G723ModeKhronosExtensions = 0x6F000000,
  AUDIO_G723ModeVendorStartUnused = 0x7F000000,
  AUDIO_G723ModeMax = 0x7FFFFFFF
}
export enum AUDIO_G726MODE {
  AUDIO_G726ModeUnused = 0x0,
  AUDIO_G726Mode16 = 0x1,
  AUDIO_G726Mode24 = 0x2,
  AUDIO_G726Mode32 = 0x3,
  AUDIO_G726Mode40 = 0x4,
  AUDIO_G726ModeKhronosExtensions = 0x6F000000,
  AUDIO_G726ModeVendorStartUnused = 0x7F000000,
  AUDIO_G726ModeMax = 0x7FFFFFFF
}
export enum AUDIO_G729TYPE {
  AUDIO_G729 = 0x0,
  AUDIO_G729A = 0x1,
  AUDIO_G729B = 0x2,
  AUDIO_G729AB = 0x3,
  AUDIO_G729KhronosExtensions = 0x6F000000,
  AUDIO_G729VendorStartUnused = 0x7F000000,
  AUDIO_G729Max = 0x7FFFFFFF
}
export enum AUDIO_AMRFRAMEFORMATTYPE {
  AUDIO_AMRFrameFormatConformance = 0x0,
  AUDIO_AMRFrameFormatIF1 = 0x1,
  AUDIO_AMRFrameFormatIF2 = 0x2,
  AUDIO_AMRFrameFormatFSF = 0x3,
  AUDIO_AMRFrameFormatRTPPayload = 0x4,
  AUDIO_AMRFrameFormatITU = 0x5,
  AUDIO_AMRFrameFormatKhronosExtensions = 0x6F000000,
  AUDIO_AMRFrameFormatVendorStartUnused = 0x7F000000,
  AUDIO_AMRFrameFormatMax = 0x7FFFFFFF
}
export enum AUDIO_AMRBANDMODETYPE {
  AUDIO_AMRBandModeUnused = 0x0,
  AUDIO_AMRBandModeNB0 = 0x1,
  AUDIO_AMRBandModeNB1 = 0x2,
  AUDIO_AMRBandModeNB2 = 0x3,
  AUDIO_AMRBandModeNB3 = 0x4,
  AUDIO_AMRBandModeNB4 = 0x5,
  AUDIO_AMRBandModeNB5 = 0x6,
  AUDIO_AMRBandModeNB6 = 0x7,
  AUDIO_AMRBandModeNB7 = 0x8,
  AUDIO_AMRBandModeWB0 = 0x9,
  AUDIO_AMRBandModeWB1 = 0xA,
  AUDIO_AMRBandModeWB2 = 0xB,
  AUDIO_AMRBandModeWB3 = 0xC,
  AUDIO_AMRBandModeWB4 = 0xD,
  AUDIO_AMRBandModeWB5 = 0xE,
  AUDIO_AMRBandModeWB6 = 0xF,
  AUDIO_AMRBandModeWB7 = 0x10,
  AUDIO_AMRBandModeWB8 = 0x11,
  AUDIO_AMRBandModeKhronosExtensions = 0x6F000000,
  AUDIO_AMRBandModeVendorStartUnused = 0x7F000000,
  AUDIO_AMRBandModeMax = 0x7FFFFFFF
}
export enum AUDIO_AMRDTXMODETYPE {
  AUDIO_AMRDTXModeOff = 0x0,
  AUDIO_AMRDTXModeOnVAD1 = 0x1,
  AUDIO_AMRDTXModeOnVAD2 = 0x2,
  AUDIO_AMRDTXModeOnAuto = 0x3,
  AUDIO_AMRDTXasEFR = 0x4,
  AUDIO_AMRDTXModeKhronosExtensions = 0x6F000000,
  AUDIO_AMRDTXModeVendorStartUnused = 0x7F000000,
  AUDIO_AMRDTXModeMax = 0x7FFFFFFF
}
export enum AUDIO_CDMARATETYPE {
  AUDIO_CDMARateBlank = 0x0,
  AUDIO_CDMARateFull = 0x1,
  AUDIO_CDMARateHalf = 0x2,
  AUDIO_CDMARateQuarter = 0x3,
  AUDIO_CDMARateEighth = 0x4,
  AUDIO_CDMARateErasure = 0x5,
  AUDIO_CDMARateKhronosExtensions = 0x6F000000,
  AUDIO_CDMARateVendorStartUnused = 0x7F000000,
  AUDIO_CDMARateMax = 0x7FFFFFFF
}
export enum AUDIO_MIDIFORMATTYPE {
  AUDIO_MIDIFormatUnknown = 0x0,
  AUDIO_MIDIFormatSMF0 = 0x1,
  AUDIO_MIDIFormatSMF1 = 0x2,
  AUDIO_MIDIFormatSMF2 = 0x3,
  AUDIO_MIDIFormatSPMIDI = 0x4,
  AUDIO_MIDIFormatXMF0 = 0x5,
  AUDIO_MIDIFormatXMF1 = 0x6,
  AUDIO_MIDIFormatMobileXMF = 0x7,
  AUDIO_MIDIFormatKhronosExtensions = 0x6F000000,
  AUDIO_MIDIFormatVendorStartUnused = 0x7F000000,
  AUDIO_MIDIFormatMax = 0x7FFFFFFF
}
export enum AUDIO_MIDISOUNDBANKTYPE {
  AUDIO_MIDISoundBankUnused = 0x0,
  AUDIO_MIDISoundBankDLS1 = 0x1,
  AUDIO_MIDISoundBankDLS2 = 0x2,
  AUDIO_MIDISoundBankMobileDLSBase = 0x3,
  AUDIO_MIDISoundBankMobileDLSPlusOptions = 0x4,
  AUDIO_MIDISoundBankKhronosExtensions = 0x6F000000,
  AUDIO_MIDISoundBankVendorStartUnused = 0x7F000000,
  AUDIO_MIDISoundBankMax = 0x7FFFFFFF
}
export enum AUDIO_MIDISOUNDBANKLAYOUTTYPE {
  AUDIO_MIDISoundBankLayoutUnused = 0x0,
  AUDIO_MIDISoundBankLayoutGM = 0x1,
  AUDIO_MIDISoundBankLayoutGM2 = 0x2,
  AUDIO_MIDISoundBankLayoutUser = 0x3,
  AUDIO_MIDISoundBankLayoutKhronosExtensions = 0x6F000000,
  AUDIO_MIDISoundBankLayoutVendorStartUnused = 0x7F000000,
  AUDIO_MIDISoundBankLayoutMax = 0x7FFFFFFF
}
export enum AUDIO_MIDIPLAYBACKSTATETYPE {
  AUDIO_MIDIPlayBackStateUnknown = 0x0,
  AUDIO_MIDIPlayBackStateClosedEngaged = 0x1,
  AUDIO_MIDIPlayBackStateParsing = 0x2,
  AUDIO_MIDIPlayBackStateOpenEngaged = 0x3,
  AUDIO_MIDIPlayBackStatePlaying = 0x4,
  AUDIO_MIDIPlayBackStatePlayingPartially = 0x5,
  AUDIO_MIDIPlayBackStatePlayingSilently = 0x6,
  AUDIO_MIDIPlayBackStateKhronosExtensions = 0x6F000000,
  AUDIO_MIDIPlayBackStateVendorStartUnused = 0x7F000000,
  AUDIO_MIDIPlayBackStateMax = 0x7FFFFFFF
}
export enum AUDIO_STEREOWIDENINGTYPE {
  AUDIO_StereoWideningHeadphones = 0x0,
  AUDIO_StereoWideningLoudspeakers = 0x1,
  AUDIO_StereoWideningKhronosExtensions = 0x6F000000,
  AUDIO_StereoWideningVendorStartUnused = 0x7F000000,
  AUDIO_StereoWideningMax = 0x7FFFFFFF
}
export enum AUDIO_ECHOCANTYPE {
  AUDIO_EchoCanOff = 0x0,
  AUDIO_EchoCanNormal = 0x1,
  AUDIO_EchoCanHFree = 0x2,
  AUDIO_EchoCanCarKit = 0x3,
  AUDIO_EchoCanKhronosExtensions = 0x6F000000,
  AUDIO_EchoCanVendorStartUnused = 0x7F000000,
  AUDIO_EchoCanMax = 0x7FFFFFFF
}
