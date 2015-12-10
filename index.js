var async = require("async");

var ILCLIENT_CREATE_FLAGS = {
  ILCLIENT_FLAGS_NONE: 0x0, // Used if no flags are set.
  ILCLIENT_ENABLE_INPUT_BUFFERS: 0x1, //If set we allow the client to communicate with input ports via buffer communication, rather than tunneling with another component.
  ILCLIENT_ENABLE_OUTPUT_BUFFERS: 0x2, // If set we allow the  client to communicate with output ports via buffer communication, rather than tunneling with another component.
  ILCLIENT_DISABLE_ALL_PORTS: 0x4, // If set we disable all ports on creation.
  ILCLIENT_HOST_COMPONENT: 0x8, // Create a host component. The default host ilcore only can create host components by being locally hosted so should only be used for testing purposes.
  ILCLIENT_OUTPUT_ZERO_BUFFERS: 0x10 // All output ports will have nBufferCountActual set to zero, if supported by the component.
};

var OMX_STATETYPE = {
  OMX_StateInvalid: 0, // component has detected that it's internal data structures are corrupted to the point that it cannot determine it's state properly
  OMX_StateLoaded: 1, // component has been loaded but has not completed initialization. The OMX_SetParameter macro and the OMX_GetParameter macro are the only valid macros allowed to be sent to the component in this state.
  OMX_StateIdle: 2, // component initialization has been completed successfully and the component is ready to to start.
  OMX_StateExecuting: 3, // component has accepted the start command and is processing data (if data is available)
  OMX_StatePause: 4, // component has received pause command
  OMX_StateWaitForResources: 5, // component is waiting for resources, either after preemption or before it gets the resources requested. See specification for complete details.
  OMX_StateMax: 0X7FFFFFFF
};

var OMX_INDEXTYPE = {
  OMX_IndexComponentStartUnused: 0x1000000,
  OMX_IndexParamPriorityMgmt: 0x1000001,
  OMX_IndexParamAudioInit: 0x1000002,
  OMX_IndexParamImageInit: 0x1000003,
  OMX_IndexParamVideoInit: 0x1000004,
  OMX_IndexParamOtherInit: 0x1000005,
  OMX_IndexParamNumAvailableStreams: 0x1000006,
  OMX_IndexParamActiveStream: 0x1000007,
  OMX_IndexParamSuspensionPolicy: 0x1000008,
  OMX_IndexParamComponentSuspended: 0x1000009,
  OMX_IndexConfigCapturing: 0x100000A,
  OMX_IndexConfigCaptureMode: 0x100000B,
  OMX_IndexAutoPauseAfterCapture: 0x100000C,
  OMX_IndexParamContentURI: 0x100000D,
  OMX_IndexParamCustomContentPipe: 0x100000E,
  OMX_IndexParamDisableResourceConcealment: 0x100000F,
  OMX_IndexConfigMetadataItemCount: 0x1000010,
  OMX_IndexConfigContainerNodeCount: 0x1000011,
  OMX_IndexConfigMetadataItem: 0x1000012,
  OMX_IndexConfigCounterNodeID: 0x1000013,
  OMX_IndexParamMetadataFilterType: 0x1000014,
  OMX_IndexParamMetadataKeyFilter: 0x1000015,
  OMX_IndexConfigPriorityMgmt: 0x1000016,
  OMX_IndexParamStandardComponentRole: 0x1000017,
  OMX_IndexPortStartUnused: 0x2000000,
  OMX_IndexParamPortDefinition: 0x2000001,
  OMX_IndexParamCompBufferSupplier: 0x2000002,
  OMX_IndexReservedStartUnused: 0x3000000,
  OMX_IndexAudioStartUnused: 0x4000000,
  OMX_IndexParamAudioPortFormat: 0x4000001,
  OMX_IndexParamAudioPcm: 0x4000002,
  OMX_IndexParamAudioAac: 0x4000003,
  OMX_IndexParamAudioRa: 0x4000004,
  OMX_IndexParamAudioMp3: 0x4000005,
  OMX_IndexParamAudioAdpcm: 0x4000006,
  OMX_IndexParamAudioG723: 0x4000007,
  OMX_IndexParamAudioG729: 0x4000008,
  OMX_IndexParamAudioAmr: 0x4000009,
  OMX_IndexParamAudioWma: 0x400000A,
  OMX_IndexParamAudioSbc: 0x400000B,
  OMX_IndexParamAudioMidi: 0x400000C,
  OMX_IndexParamAudioGsm_FR: 0x400000D,
  OMX_IndexParamAudioMidiLoadUserSound: 0x400000E,
  OMX_IndexParamAudioG726: 0x400000F,
  OMX_IndexParamAudioGsm_EFR: 0x4000010,
  OMX_IndexParamAudioGsm_HR: 0x4000011,
  OMX_IndexParamAudioPdc_FR: 0x4000012,
  OMX_IndexParamAudioPdc_EFR: 0x4000013,
  OMX_IndexParamAudioPdc_HR: 0x4000014,
  OMX_IndexParamAudioTdma_FR: 0x4000015,
  OMX_IndexParamAudioTdma_EFR: 0x4000016,
  OMX_IndexParamAudioQcelp8: 0x4000017,
  OMX_IndexParamAudioQcelp13: 0x4000018,
  OMX_IndexParamAudioEvrc: 0x4000019,
  OMX_IndexParamAudioSmv: 0x400001A,
  OMX_IndexParamAudioVorbis: 0x400001B,
  OMX_IndexConfigAudioMidiImmediateEvent: 0x400001C,
  OMX_IndexConfigAudioMidiControl: 0x400001D,
  OMX_IndexConfigAudioMidiSoundBankProgram: 0x400001E,
  OMX_IndexConfigAudioMidiStatus: 0x400001F,
  OMX_IndexConfigAudioMidiMetaEvent: 0x4000020,
  OMX_IndexConfigAudioMidiMetaEventData: 0x4000021,
  OMX_IndexConfigAudioVolume: 0x4000022,
  OMX_IndexConfigAudioBalance: 0x4000023,
  OMX_IndexConfigAudioChannelMute: 0x4000024,
  OMX_IndexConfigAudioMute: 0x4000025,
  OMX_IndexConfigAudioLoudness: 0x4000026,
  OMX_IndexConfigAudioEchoCancelation: 0x4000027,
  OMX_IndexConfigAudioNoiseReduction: 0x4000028,
  OMX_IndexConfigAudioBass: 0x4000029,
  OMX_IndexConfigAudioTreble: 0x400002A,
  OMX_IndexConfigAudioStereoWidening: 0x400002B,
  OMX_IndexConfigAudioChorus: 0x400002C,
  OMX_IndexConfigAudioEqualizer: 0x400002D,
  OMX_IndexConfigAudioReverberation: 0x400002E,
  OMX_IndexConfigAudioChannelVolume: 0x400002F,
  OMX_IndexImageStartUnused: 0x5000000,
  OMX_IndexParamImagePortFormat: 0x5000001,
  OMX_IndexParamFlashControl: 0x5000002,
  OMX_IndexConfigFocusControl: 0x5000003,
  OMX_IndexParamQFactor: 0x5000004,
  OMX_IndexParamQuantizationTable: 0x5000005,
  OMX_IndexParamHuffmanTable: 0x5000006,
  OMX_IndexConfigFlashControl: 0x5000007,
  OMX_IndexVideoStartUnused: 0x6000000,
  OMX_IndexParamVideoPortFormat: 0x6000001,
  OMX_IndexParamVideoQuantization: 0x6000002,
  OMX_IndexParamVideoFastUpdate: 0x6000003,
  OMX_IndexParamVideoBitrate: 0x6000004,
  OMX_IndexParamVideoMotionVector: 0x6000005,
  OMX_IndexParamVideoIntraRefresh: 0x6000006,
  OMX_IndexParamVideoErrorCorrection: 0x6000007,
  OMX_IndexParamVideoVBSMC: 0x6000008,
  OMX_IndexParamVideoMpeg2: 0x6000009,
  OMX_IndexParamVideoMpeg4: 0x600000A,
  OMX_IndexParamVideoWmv: 0x600000B,
  OMX_IndexParamVideoRv: 0x600000C,
  OMX_IndexParamVideoAvc: 0x600000D,
  OMX_IndexParamVideoH263: 0x600000E,
  OMX_IndexParamVideoProfileLevelQuerySupported: 0x600000F,
  OMX_IndexParamVideoProfileLevelCurrent: 0x6000010,
  OMX_IndexConfigVideoBitrate: 0x6000011,
  OMX_IndexConfigVideoFramerate: 0x6000012,
  OMX_IndexConfigVideoIntraVOPRefresh: 0x6000013,
  OMX_IndexConfigVideoIntraMBRefresh: 0x6000014,
  OMX_IndexConfigVideoMBErrorReporting: 0x6000015,
  OMX_IndexParamVideoMacroblocksPerFrame: 0x6000016,
  OMX_IndexConfigVideoMacroBlockErrorMap: 0x6000017,
  OMX_IndexParamVideoSliceFMO: 0x6000018,
  OMX_IndexConfigVideoAVCIntraPeriod: 0x6000019,
  OMX_IndexConfigVideoNalSize: 0x600001A,
  OMX_IndexCommonStartUnused: 0x7000000,
  OMX_IndexParamCommonDeblocking: 0x7000001,
  OMX_IndexParamCommonSensorMode: 0x7000002,
  OMX_IndexParamCommonInterleave: 0x7000003,
  OMX_IndexConfigCommonColorFormatConversion: 0x7000004,
  OMX_IndexConfigCommonScale: 0x7000005,
  OMX_IndexConfigCommonImageFilter: 0x7000006,
  OMX_IndexConfigCommonColorEnhancement: 0x7000007,
  OMX_IndexConfigCommonColorKey: 0x7000008,
  OMX_IndexConfigCommonColorBlend: 0x7000009,
  OMX_IndexConfigCommonFrameStabilisation: 0x700000A,
  OMX_IndexConfigCommonRotate: 0x700000B,
  OMX_IndexConfigCommonMirror: 0x700000C,
  OMX_IndexConfigCommonOutputPosition: 0x700000D,
  OMX_IndexConfigCommonInputCrop: 0x700000E,
  OMX_IndexConfigCommonOutputCrop: 0x700000F,
  OMX_IndexConfigCommonDigitalZoom: 0x7000010,
  OMX_IndexConfigCommonOpticalZoom: 0x7000011,
  OMX_IndexConfigCommonWhiteBalance: 0x7000012,
  OMX_IndexConfigCommonExposure: 0x7000013,
  OMX_IndexConfigCommonContrast: 0x7000014,
  OMX_IndexConfigCommonBrightness: 0x7000015,
  OMX_IndexConfigCommonBacklight: 0x7000016,
  OMX_IndexConfigCommonGamma: 0x7000017,
  OMX_IndexConfigCommonSaturation: 0x7000018,
  OMX_IndexConfigCommonLightness: 0x7000019,
  OMX_IndexConfigCommonExclusionRect: 0x700001A,
  OMX_IndexConfigCommonDithering: 0x700001B,
  OMX_IndexConfigCommonPlaneBlend: 0x700001C,
  OMX_IndexConfigCommonExposureValue: 0x700001D,
  OMX_IndexConfigCommonOutputSize: 0x700001E,
  OMX_IndexParamCommonExtraQuantData: 0x700001F,
  OMX_IndexConfigCommonFocusRegion: 0x7000020,
  OMX_IndexConfigCommonFocusStatus: 0x7000021,
  OMX_IndexOtherStartUnused: 0x8000000,
  OMX_IndexParamOtherPortFormat: 0x8000001,
  OMX_IndexConfigOtherPower: 0x8000002,
  OMX_IndexConfigOtherStats: 0x8000003,
  OMX_IndexTimeStartUnused: 0x9000000,
  OMX_IndexConfigTimeScale: 0x9000001,
  OMX_IndexConfigTimeClockState: 0x9000002,
  OMX_IndexConfigTimeActiveRefClock: 0x9000003,
  OMX_IndexConfigTimeCurrentMediaTime: 0x9000004,
  OMX_IndexConfigTimeCurrentWallTime: 0x9000005,
  OMX_IndexConfigTimeCurrentAudioReference: 0x9000006,
  OMX_IndexConfigTimeCurrentVideoReference: 0x9000007,
  OMX_IndexConfigTimeMediaTimeRequest: 0x9000008,
  OMX_IndexConfigTimeClientStartTime: 0x9000009,
  OMX_IndexConfigTimePosition: 0x900000A,
  OMX_IndexConfigTimeSeekMode: 0x900000B,
  OMX_IndexVendorStartUnused: 0x7F000000,
  OMX_IndexMax: 0x7FFFFFFF
};

var OMX_VIDEO_CODINGTYPE = {
  OMX_VIDEO_CodingUnused: 0,
  OMX_VIDEO_CodingAutoDetect: 1,
  OMX_VIDEO_CodingMPEG2: 2,
  OMX_VIDEO_CodingH263: 3,
  OMX_VIDEO_CodingMPEG4: 4,
  OMX_VIDEO_CodingWMV: 5,
  OMX_VIDEO_CodingRV: 6,
  OMX_VIDEO_CodingAVC: 7,
  OMX_VIDEO_CodingMJPEG: 8,
  OMX_VIDEO_CodingMax: 0x7FFFFFFF
};

var OMX_VIDEO_PARAM_PORTFORMATTYPE = {
  nIndex: 0, // Indicates the enumeration index for the format from 0x0 to N-1 
  eCompressionFormat: 0, // Compression format used in this instance of the component. When OMX_VIDEO_CodingUnused is specified , eColorFormat is used
  eColorFormat: 0, // Decompressed format used by this component
  xFramerate: 0//Indicates the video frame rate in Q16 format 
};

var myaddon = require("./build/Release/Node_OMX.node");

myaddon.bcm_host_init();
var ILCLIENT = myaddon.ILCLIENT();

var video_decode = myaddon.COMPONENT(ILCLIENT, "video_decode", ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS);
video_decode.setPorts(130, 131);

var video_render = myaddon.COMPONENT(ILCLIENT, "video_render", ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS);
video_render.setPorts(90);

var TUNNEL = myaddon.TUNNEL();

TUNNEL.set(video_decode, video_render);

video_decode.changeState(OMX_STATETYPE.OMX_StateIdle);

format = video_decode.getParameter(130, OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
format.eCompressionFormat = OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC;
video_decode.setParameter(130, OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);

video_decode.enableInputPortBuffer();
video_decode.changeState(OMX_STATETYPE.OMX_StateExecuting);

console.log(myaddon.play("test/test.h264", video_decode, video_render, TUNNEL));

myaddon.bcm_host_deinit();


//try {
//
//  var obj = new myaddon.MyObject(0);
//  console.log('obj', obj);
//  console.log(obj.plusOne());
//  console.log(obj.plusOne());
//  console.log(obj.plusOne());
//
//  console.log('t');
//  var obj2 = myaddon.MyObject();
//  console.log('obj2', obj2);
//  console.log(obj2.plusOne());
//  console.log(obj2.plusOne());
//  console.log(obj2.plusOne());
//
//} catch (e) {
//  console.error(e, e.stack);
//}
//
////console.time("sleepSync");
////myaddon.MyObject().sleepSync(1);
////console.timeEnd("sleepSync");
////
////console.time("sleep");
////console.time("sleep done");
////myaddon.MyObject().sleep(1, function () {
////  console.timeEnd("sleep done");
////});
////console.timeEnd("sleep");
//
//var arr = [];
//for (var i = 0; i < 8; i++) {
//  arr.push(i);
//}
//
//console.time("sleep");
//console.time("call");
//async.each(arr, function (item, callback) {
//  myaddon.MyObject().sleep(1, callback);
//}, function () {
//  console.timeEnd("sleep");
//});
//console.timeEnd("call");