export enum PORTDOMAINTYPE {
  PortDomainAudio = 0x0,
  PortDomainVideo = 0x1,
  PortDomainImage = 0x2,
  PortDomainOther = 0x3,
  PortDomainKhronosExtensions = 0x7FFFFFF,
  PortDomainVendorStartUnused = 0x6F000000,
  PortDomainMax = 0x7F000000
}
export enum SUSPENSIONPOLICYTYPE {
  SuspensionDisabled = 0x0,
  SuspensionEnabled = 0x1,
  SuspensionPolicyKhronosExtensions = 0x6F000000,
  SuspensionPolicyStartUnused = 0x7F000000,
  SuspensionPolicyMax = 0x7FFFFFFF
}
export enum SUSPENSIONTYPE {
  NotSuspended = 0x0,
  Suspended = 0x1,
  SuspensionKhronosExtensions = 0x6F000000,
  SuspensionVendorStartUnused = 0x7F000000,
  SuspendMax = 0x7FFFFFFF
}
export enum METADATACHARSETTYPE {
  MetadataCharsetUnknown = 0x0,
  MetadataCharsetASCII = 0x1,
  MetadataCharsetBinary = 0x2,
  MetadataCharsetCodePage1252 = 0x3,
  MetadataCharsetUTF8 = 0x4,
  MetadataCharsetJavaConformantUTF8 = 0x5,
  MetadataCharsetUTF7 = 0x6,
  MetadataCharsetImapUTF7 = 0x7,
  MetadataCharsetUTF16LE = 0x8,
  MetadataCharsetUTF16BE = 0x9,
  MetadataCharsetGB12345 = 0xA,
  MetadataCharsetHZGB2312 = 0xB,
  MetadataCharsetGB2312 = 0xC,
  MetadataCharsetGB18030 = 0xD,
  MetadataCharsetGBK = 0xE,
  MetadataCharsetBig5 = 0xF,
  MetadataCharsetISO88591 = 0x10,
  MetadataCharsetISO88592 = 0x11,
  MetadataCharsetISO88593 = 0x12,
  MetadataCharsetISO88594 = 0x13,
  MetadataCharsetISO88595 = 0x14,
  MetadataCharsetISO88596 = 0x15,
  MetadataCharsetISO88597 = 0x16,
  MetadataCharsetISO88598 = 0x17,
  MetadataCharsetISO88599 = 0x18,
  MetadataCharsetISO885910 = 0x19,
  MetadataCharsetISO885913 = 0x1A,
  MetadataCharsetISO885914 = 0x1B,
  MetadataCharsetISO885915 = 0x1C,
  MetadataCharsetShiftJIS = 0x1D,
  MetadataCharsetISO2022JP = 0x1E,
  MetadataCharsetISO2022JP1 = 0x1F,
  MetadataCharsetISOEUCJP = 0x20,
  MetadataCharsetSMS7Bit = 0x21,
  MetadataCharsetKhronosExtensions = 0x6F000000,
  MetadataCharsetVendorStartUnused = 0x7F000000,
  MetadataCharsetTypeMax = 0x7FFFFFFF
}
export enum METADATASCOPETYPE {
  MetadataScopeAllLevels = 0x0,
  MetadataScopeTopLevel = 0x1,
  MetadataScopePortLevel = 0x2,
  MetadataScopeNodeLevel = 0x3,
  MetadataScopeKhronosExtensions = 0x6F000000,
  MetadataScopeVendorStartUnused = 0x7F000000,
  MetadataScopeTypeMax = 0x7FFFFFFF
}
export enum METADATASEARCHMODETYPE {
  MetadataSearchValueSizeByIndex = 0x0,
  MetadataSearchItemByIndex = 0x1,
  MetadataSearchNextItemByKey = 0x2,
  MetadataSearchKhronosExtensions = 0x6F000000,
  MetadataSearchVendorStartUnused = 0x7F000000,
  MetadataSearchTypeMax = 0x7FFFFFFF
}
