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