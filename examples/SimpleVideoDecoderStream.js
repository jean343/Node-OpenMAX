var fs = require('fs');
var omx = require('../');

(function () {
  var VideoDecode = omx.VideoDecode();
  var VideoRender = omx.VideoRender();

  VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

  fs.createReadStream("test/cut.avi")
//  fs.createReadStream("test/test.h264")
      .pipe(VideoDecode)
      .tunnel(VideoRender);

})();
global.gc();