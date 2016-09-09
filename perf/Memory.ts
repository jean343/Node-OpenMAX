import omx = require('../');
import fs = require('fs');

(function play() {
  var i = 0;
  i++;
  var VideoDecode: omx.VideoDecode;
  var VideoRender: omx.VideoRender;

  VideoDecode = new omx.VideoDecode("VideoDecode" + i);
  VideoDecode.init()
    .then(function() {
      VideoRender = new omx.VideoRender("VideoRender" + i);
      return VideoRender.init();
    })
    .then(function() {
      VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

      fs.createReadStream("spec/data/video-LQ-30frames.h264")
        .pipe(VideoDecode)
        .pipe(VideoRender)
        .on('finish', function() {
          console.log("Done");
          setTimeout(play, 0);
        });
    })
    .catch(console.log.bind(console, "Error:"));
})();

setInterval(gc, 10);