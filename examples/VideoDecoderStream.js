var fs = require('fs');
var omx = require('../');

setInterval(function () { // test
  global.gc();
}, 100);
(function () {
  var VideoDecode = omx.VideoDecode();
  console.log('VideoDecode', VideoDecode, VideoDecode.__proto__);
  var VideoRender = omx.VideoRender();
  var Node_OMX = require('bindings')('Node_OMX');
  var TUNNEL = Node_OMX.TUNNEL(VideoDecode.component, VideoRender.component);
  VideoDecode.component.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
  format = VideoDecode.component.getParameter(130, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
  format.eCompressionFormat = omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC;
  VideoDecode.component.setParameter(130, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);
  VideoDecode.component.enableInputPortBuffer();
  VideoDecode.component.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);

  VideoDecode.component.on("eventPortSettingsChanged", function () {
    TUNNEL.enable();
    VideoRender.component.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
  });
  fs.createReadStream("test/test.h264")
      .pipe(VideoDecode)
      .on('finish', function () {
        console.log('teardown');
        VideoDecode.component.emptyBuffer(undefined, function () {

          VideoRender.component.waitForEvent();
          TUNNEL.flush();
          console.log('disableInputPortBuffer');
          VideoDecode.component.disableInputPortBuffer();
          console.log('disable');
          TUNNEL.disable();
          console.log('teardown');
          TUNNEL.teardown();
          console.log('changeState');
          VideoDecode.component.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
          VideoRender.component.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
          console.log('OMX_StateLoaded');
          VideoDecode.component.changeState(omx.OMX_STATETYPE.OMX_StateLoaded);
          VideoRender.component.changeState(omx.OMX_STATETYPE.OMX_StateLoaded);
          console.log('bcm_host_deinit');
          Node_OMX.bcm_host_deinit();
          console.log('done');
          global.gc();
        });
      });

})();
global.gc();