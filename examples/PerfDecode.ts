import fs = require('fs');
import omx = require('../');

var VideoDecode: omx.VideoDecode;
var EglRender: omx.EglRender;
var fps = new omx.FPS();
VideoDecode = new omx.VideoDecode('VideoDecode');

// 2050.206ms

VideoDecode.init()
  .then(function() {
    EglRender = new omx.VideoRender();
    return EglRender.init();
  })
  .then(function() {
    VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
    VideoDecode.setBufferCount(1, 1);
    
//    VideoRender.setBufferCount(1);

    console.time("start");
//    fs.createReadStream("spec/data/myth-160.h264")
//    fs.createReadStream("spec/data/test.h264")
    fs.createReadStream("spec/data/video-LQ-640.h264")
      .pipe(VideoDecode)
//      .pipe(fps)
      .tunnel(EglRender)
      .on('finish', function() {
        console.timeEnd("start");
        console.log("Done");
      });
  })
  .catch(console.log.bind(console));