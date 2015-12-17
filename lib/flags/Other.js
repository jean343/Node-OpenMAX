module.exports.OMX_OTHER_FORMATTYPE = {
  OMX_OTHER_FormatTime: 0x0,
  OMX_OTHER_FormatPower: 0x1,
  OMX_OTHER_FormatStats: 0x2,
  OMX_OTHER_FormatBinary: 0x3,
  OMX_OTHER_FormatVendorReserved: 0x3E8,
  OMX_OTHER_FormatKhronosExtensions: 0x6F000000,
  OMX_OTHER_FormatVendorStartUnused: 0x7F000000,
  OMX_OTHER_FormatMax: 0x7FFFFFFF
};
module.exports.OMX_TIME_SEEKMODETYPE = {
  OMX_TIME_SeekModeFast: 0x0,
  OMX_TIME_SeekModeAccurate: 0x1,
  OMX_TIME_SeekModeKhronosExtensions: 0x6F000000,
  OMX_TIME_SeekModeVendorStartUnused: 0x7F000000,
  OMX_TIME_SeekModeMax: 0x7FFFFFFF
};
module.exports.OMX_TIME_UPDATETYPE = {
  OMX_TIME_UpdateRequestFulfillment: 0x0,
  OMX_TIME_UpdateScaleChanged: 0x1,
  OMX_TIME_UpdateClockStateChanged: 0x2,
  OMX_TIME_UpdateKhronosExtensions: 0x6F000000,
  OMX_TIME_UpdateVendorStartUnused: 0x7F000000,
  OMX_TIME_UpdateMax: 0x7FFFFFFF
};
module.exports.OMX_TIME_REFCLOCKTYPE = {
  OMX_TIME_RefClockNone: 0x0,
  OMX_TIME_RefClockAudio: 0x1,
  OMX_TIME_RefClockVideo: 0x2,
  OMX_TIME_RefClockKhronosExtensions: 0x6F000000,
  OMX_TIME_RefClockVendorStartUnused: 0x7F000000,
  OMX_TIME_RefClockMax: 0x7FFFFFFF
};
module.exports.OMX_TIME_CLOCKSTATE = {
  OMX_TIME_ClockStateRunning: 0x0,
  OMX_TIME_ClockStateWaitingForStartTime: 0x1,
  OMX_TIME_ClockStateStopped: 0x2,
  OMX_TIME_ClockStateKhronosExtensions: 0x6F000000,
  OMX_TIME_ClockStateVendorStartUnused: 0x7F000000,
  OMX_TIME_ClockStateMax: 0x7FFFFFFF
};
