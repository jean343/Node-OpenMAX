var fps = require('fps')({ every: 30 });
import fs = require('fs');
import omx = require('../');
import stream = require('stream');

fps.on('data', function(framerate) {
  console.log("Fps: ", framerate);
});


class WriteFileFilter extends stream.Duplex {
  stream: stream.Writable;
  constructor() {
    super();
    this.stream = fs.createWriteStream("spec/data/video-LQ-recode.h264");
    this.on('pipe', function(source) {
      var self = this;
      source.on('portDefinitionChanged', function(portDefinition) {
        self.emit('portDefinitionChanged', portDefinition);
      });
    });
  }
  _read() {
  };
  _write(chunk, enc, next) {
    this.stream.write(chunk);
    fps.tick();

    this.push(chunk);
    next();
  };
}

var VideoDecode1: omx.VideoDecode;
var VideoDecode2: omx.VideoDecode;
var VideoEncode: omx.VideoEncode;
var VideoRender: omx.VideoRender;
var writeFileFilter = new WriteFileFilter();

VideoDecode1 = new omx.VideoDecode('VideoDecode1');
VideoDecode1.init()
  .then(function() {
    VideoDecode2 = new omx.VideoDecode('VideoDecode2');
    return VideoDecode2.init();
  })
  .then(function() {
    VideoEncode = new omx.VideoEncode();
    return VideoEncode.init();
  })
  .then(function() {
    VideoRender = new omx.VideoRender();
    return VideoRender.init();
  })
  .then(function() {
    VideoDecode1.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
    VideoDecode2.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
    VideoEncode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

    VideoEncode.component.setParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoBitrate, {
      eControlRate: omx.OMX_VIDEO_CONTROLRATETYPE.OMX_Video_ControlRateDisable
    });

    var quantizationType = VideoEncode.component.getParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoQuantization);
    quantizationType.nQpI = 43;
    quantizationType.nQpP = quantizationType.nQpI;
    VideoEncode.component.setParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoQuantization, quantizationType);

    var useTunnel = false; // By using the tunnel, we send less data to node and can reduce the CPU load.

    if (useTunnel) {
      /*fs.createReadStream("spec/data/video-LQ.h264")
        .pipe(VideoDecode1)
        .tunnel(VideoEncode)
        .pipe(WriteFileFilter)
        .pipe(VideoDecode2)
        .tunnel(VideoRender);*/
    } else {
      fs.createReadStream("spec/data/video-LQ.h264")
        .pipe(VideoDecode1)
        .pipe(VideoEncode)
        .pipe(writeFileFilter)
        .pipe(VideoDecode2)
        .pipe(VideoRender)
        .on('finish', function() {
          console.log("Done");
        });
    }
  });
