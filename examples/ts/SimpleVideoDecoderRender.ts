import fs = require('fs');
import omx = require('openmax');

  var VideoDecode = new omx.VideoDecode();
  var VideoRender = new omx.VideoRender();

omx.Component.initAll([VideoDecode, VideoRender])
    .then(function() {
      VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

      fs.createReadStream("../../spec/data/video-LQ.h264")
        .pipe(VideoDecode)
        .pipe(VideoRender)
        .on('finish', function() {
          console.log("Done");
          process.exit();
        });
    });
