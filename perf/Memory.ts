import fs = require('fs');
import omx = require('../');

//(function play() {
//  var VideoDecode: omx.VideoDecode;
//  var VideoRender: omx.VideoRender;
//
//  VideoDecode = new omx.VideoDecode();
//  VideoDecode.init()
//    .then(function() {
//      VideoRender = new omx.VideoRender();
//      return VideoRender.init();
//    })
//    .then(function() {
//      VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
//
//      fs.createReadStream("spec/data/video-LQ-30frames.h264")
//        .pipe(VideoDecode)
//        .pipe(VideoRender)
//        .on('finish', function() {
//          console.log("Done");
//          setTimeout(play, 500);
//        });
//    });
//})();

(function play() {
  console.log("play");
  var VideoDecode: omx.VideoDecode;

  VideoDecode = new omx.VideoDecode();
  VideoDecode.init()
    .then(function() {
      VideoDecode.close();
      console.log("Done");
    })
  setTimeout(play, 500);
})();

setInterval(gc, 1);