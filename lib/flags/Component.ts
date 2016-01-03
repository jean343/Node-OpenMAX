export enum OMX_PORTDOMAINTYPE {
  OMX_PortDomainAudio = 0x0,
  OMX_PortDomainVideo = 0x1,
  OMX_PortDomainImage = 0x2,
  OMX_PortDomainOther = 0x3,
  OMX_PortDomainKhronosExtensions = 0x7FFFFFF,
  OMX_PortDomainVendorStartUnused = 0x6F000000,
  OMX_PortDomainMax = 0x7F000000
}
export enum OMX_SUSPENSIONPOLICYTYPE {
  OMX_SuspensionDisabled = 0x0,
  OMX_SuspensionEnabled = 0x1,
  OMX_SuspensionPolicyKhronosExtensions = 0x6F000000,
  OMX_SuspensionPolicyStartUnused = 0x7F000000,
  OMX_SuspensionPolicyMax = 0x7FFFFFFF
}
export enum OMX_SUSPENSIONTYPE {
  OMX_NotSuspended = 0x0,
  OMX_Suspended = 0x1,
  OMX_SuspensionKhronosExtensions = 0x6F000000,
  OMX_SuspensionVendorStartUnused = 0x7F000000,
  OMX_SuspendMax = 0x7FFFFFFF
}
export enum OMX_METADATACHARSETTYPE {
  OMX_MetadataCharsetUnknown = 0x0,
  OMX_MetadataCharsetASCII = 0x1,
  OMX_MetadataCharsetBinary = 0x2,
  OMX_MetadataCharsetCodePage1252 = 0x3,
  OMX_MetadataCharsetUTF8 = 0x4,
  OMX_MetadataCharsetJavaConformantUTF8 = 0x5,
  OMX_MetadataCharsetUTF7 = 0x6,
  OMX_MetadataCharsetImapUTF7 = 0x7,
  OMX_MetadataCharsetUTF16LE = 0x8,
  OMX_MetadataCharsetUTF16BE = 0x9,
  OMX_MetadataCharsetGB12345 = 0xA,
  OMX_MetadataCharsetHZGB2312 = 0xB,
  OMX_MetadataCharsetGB2312 = 0xC,
  OMX_MetadataCharsetGB18030 = 0xD,
  OMX_MetadataCharsetGBK = 0xE,
  OMX_MetadataCharsetBig5 = 0xF,
  OMX_MetadataCharsetISO88591 = 0x10,
  OMX_MetadataCharsetISO88592 = 0x11,
  OMX_MetadataCharsetISO88593 = 0x12,
  OMX_MetadataCharsetISO88594 = 0x13,
  OMX_MetadataCharsetISO88595 = 0x14,
  OMX_MetadataCharsetISO88596 = 0x15,
  OMX_MetadataCharsetISO88597 = 0x16,
  OMX_MetadataCharsetISO88598 = 0x17,
  OMX_MetadataCharsetISO88599 = 0x18,
  OMX_MetadataCharsetISO885910 = 0x19,
  OMX_MetadataCharsetISO885913 = 0x1A,
  OMX_MetadataCharsetISO885914 = 0x1B,
  OMX_MetadataCharsetISO885915 = 0x1C,
  OMX_MetadataCharsetShiftJIS = 0x1D,
  OMX_MetadataCharsetISO2022JP = 0x1E,
  OMX_MetadataCharsetISO2022JP1 = 0x1F,
  OMX_MetadataCharsetISOEUCJP = 0x20,
  OMX_MetadataCharsetSMS7Bit = 0x21,
  OMX_MetadataCharsetKhronosExtensions = 0x6F000000,
  OMX_MetadataCharsetVendorStartUnused = 0x7F000000,
  OMX_MetadataCharsetTypeMax = 0x7FFFFFFF
}
export enum OMX_METADATASCOPETYPE {
  OMX_MetadataScopeAllLevels = 0x0,
  OMX_MetadataScopeTopLevel = 0x1,
  OMX_MetadataScopePortLevel = 0x2,
  OMX_MetadataScopeNodeLevel = 0x3,
  OMX_MetadataScopeKhronosExtensions = 0x6F000000,
  OMX_MetadataScopeVendorStartUnused = 0x7F000000,
  OMX_MetadataScopeTypeMax = 0x7FFFFFFF
}
export enum OMX_METADATASEARCHMODETYPE {
  OMX_MetadataSearchValueSizeByIndex = 0x0,
  OMX_MetadataSearchItemByIndex = 0x1,
  OMX_MetadataSearchNextItemByKey = 0x2,
  OMX_MetadataSearchKhronosExtensions = 0x6F000000,
  OMX_MetadataSearchVendorStartUnused = 0x7F000000,
  OMX_MetadataSearchTypeMax = 0x7FFFFFFF
}
