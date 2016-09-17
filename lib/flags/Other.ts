export enum OTHER_FORMATTYPE {
  OTHER_FormatTime = 0x0,
  OTHER_FormatPower = 0x1,
  OTHER_FormatStats = 0x2,
  OTHER_FormatBinary = 0x3,
  OTHER_FormatVendorReserved = 0x3E8,
  OTHER_FormatKhronosExtensions = 0x6F000000,
  OTHER_FormatVendorStartUnused = 0x7F000000,
  OTHER_FormatText = 0x7F000001,
  OTHER_FormatTextSKM2 = 0x7F000002,
  OTHER_FormatText3GP5 = 0x7F000003,
  OTHER_FormatMax = 0x7FFFFFFF
}
export enum TIME_SEEKMODETYPE {
  TIME_SeekModeFast = 0x0,
  TIME_SeekModeAccurate = 0x1,
  TIME_SeekModeKhronosExtensions = 0x6F000000,
  TIME_SeekModeVendorStartUnused = 0x7F000000,
  TIME_SeekModeDirectional = 0x7F000001,
  TIME_SeekModeMax = 0x7FFFFFFF
}
export enum TIME_UPDATETYPE {
  TIME_UpdateRequestFulfillment = 0x0,
  TIME_UpdateScaleChanged = 0x1,
  TIME_UpdateClockStateChanged = 0x2,
  TIME_UpdateKhronosExtensions = 0x6F000000,
  TIME_UpdateVendorStartUnused = 0x7F000000,
  TIME_UpdateMax = 0x7FFFFFFF
}
export enum TIME_REFCLOCKTYPE {
  TIME_RefClockNone = 0x0,
  TIME_RefClockAudio = 0x1,
  TIME_RefClockVideo = 0x2,
  TIME_RefClockKhronosExtensions = 0x6F000000,
  TIME_RefClockVendorStartUnused = 0x7F000000,
  TIME_RefClockMax = 0x7FFFFFFF
}
export enum TIME_CLOCKSTATE {
  TIME_ClockStateRunning = 0x0,
  TIME_ClockStateWaitingForStartTime = 0x1,
  TIME_ClockStateStopped = 0x2,
  TIME_ClockStateKhronosExtensions = 0x6F000000,
  TIME_ClockStateVendorStartUnused = 0x7F000000,
  TIME_ClockStateMax = 0x7FFFFFFF
}
