import fs = require('fs');
import omx = require('../');
import stream = require('stream');


class WritableFilter extends stream.Writable {
  fps;
  constructor(public name: string) {
    super();

    this.fps = require('fps')({ every: 30 });
    this.fps.on('data', function(framerate) {
      console.log("Fps: ", name, framerate);
    });
  }
  _write(chunk, enc, next) {
    //    console.log('_write length', chunk.length, chunk);
    this.fps.tick();
    next();
  };
}




var i = 1;
var max = 12;
function loop() {
  var VideoDecode: omx.VideoDecode;
//  var VideoEncode: omx.VideoEncode;
  VideoDecode = new omx.VideoDecode('VideoDecode' + i);
  var ws = new WritableFilter('count' + i);
  VideoDecode.init()
//    .then(function() {
//      VideoEncode = new omx.VideoEncode();
//      return VideoEncode.init();
//    })
    .then(function() {
      VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
      VideoDecode.setBufferCount(1);

//      VideoEncode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
//
//      VideoEncode.component.setParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoBitrate, {
//        eControlRate: omx.OMX_VIDEO_CONTROLRATETYPE.OMX_Video_ControlRateDisable
//      });
//
//      var quantizationType = VideoEncode.component.getParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoQuantization);
//      quantizationType.nQpI = 43;
//      quantizationType.nQpP = quantizationType.nQpI;
//      VideoEncode.component.setParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoQuantization, quantizationType);

      fs.createReadStream("spec/data/video-LQ-1280.h264")
        .pipe(VideoDecode)
//        .pipe(VideoEncode)
//        .pipe(ws)
        .on('finish', function() {
          console.log("Done");
        });

      console.log('iter', i++);
      if (i <= max) {
        setTimeout(loop, 1);
      }
    });
}
loop();














