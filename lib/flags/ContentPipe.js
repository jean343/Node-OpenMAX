module.exports.CP_ORIGINTYPE = {
  CP_OriginBegin: 0x0,
  CP_OriginCur: 0x1,
  CP_OriginEnd: 0x2,
  CP_OriginKhronosExtensions: 0x6F000000,
  CP_OriginVendorStartUnused: 0x7F000000,
  CP_OriginMax: 0x7FFFFFFF
};
module.exports.CP_ACCESSTYPE = {
  CP_AccessRead: 0x0,
  CP_AccessWrite: 0x1,
  CP_AccessReadWrite: 0x2,
  CP_AccessKhronosExtensions: 0x6F000000,
  CP_AccessVendorStartUnused: 0x7F000000,
  CP_AccessMax: 0x7FFFFFFF
};
module.exports.CP_CHECKBYTESRESULTTYPE = {
  CP_CheckBytesOk: 0x0,
  CP_CheckBytesNotReady: 0x1,
  CP_CheckBytesInsufficientBytes: 0x2,
  CP_CheckBytesAtEndOfStream: 0x3,
  CP_CheckBytesOutOfBuffers: 0x4,
  CP_CheckBytesKhronosExtensions: 0x6F000000,
  CP_CheckBytesVendorStartUnused: 0x7F000000,
  CP_CheckBytesMax: 0x7FFFFFFF
};
module.exports.CP_EVENTTYPE = {
  CP_BytesAvailable: 0x0,
  CP_Overflow: 0x1,
  CP_PipeDisconnected: 0x2,
  CP_EventKhronosExtensions: 0x6F000000,
  CP_EventVendorStartUnused: 0x7F000000,
  CP_EventMax: 0x7FFFFFFF
};
