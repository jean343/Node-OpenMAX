var fps = require('fps')({every: 30});
var fs = require('fs');
var omx = require('../');

fps.on('data', function (framerate) {
  console.log("Fps: ", framerate);
});

var stream = fs.createWriteStream("test/test-recode.h264");
var WriteFileFilter = require('stream').Duplex();
WriteFileFilter._read = function () {
};
WriteFileFilter._write = function (chunk, enc, next) {
//  console.log('chunk', chunk.length);
  stream.write(chunk);
  fps.tick();

  this.push(chunk);
  next();
};
// Needed to forward the portDefinitionChanged from the VideoDecode to the VideoRender
WriteFileFilter.on('pipe', function (source) {
  var self = this;
  source.on('portDefinitionChanged', function (portDefinition) {
    self.emit('portDefinitionChanged', portDefinition);
  });
});

var VideoDecode1 = omx.VideoDecode();
var VideoDecode2 = omx.VideoDecode();
var VideoEncode = omx.VideoEncode();
var VideoRender = omx.VideoRender();

VideoDecode1.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
VideoDecode2.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
VideoEncode.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

VideoEncode.component.setParameter(VideoEncode.component.out_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamVideoBitrate, {
  eControlRate: omx.Video.OMX_VIDEO_CONTROLRATETYPE.OMX_Video_ControlRateDisable
});

var quantizationType = VideoEncode.component.getParameter(VideoEncode.component.out_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamVideoQuantization);
quantizationType.nQpI = 43;
quantizationType.nQpP = quantizationType.nQpI;
VideoEncode.component.setParameter(VideoEncode.component.out_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamVideoQuantization, quantizationType);

var useTunnel = true; // By using the tunnel, we send less data to node and can reduce the CPU load.

if (useTunnel) {
  fs.createReadStream("test/test.h264")
      .pipe(VideoDecode1)
      .tunnel(VideoEncode)
      .pipe(WriteFileFilter)
      .pipe(VideoDecode2)
      .tunnel(VideoRender);
} else {
  fs.createReadStream("test/test.h264")
      .pipe(VideoDecode1)
      .pipe(VideoEncode)
      .pipe(WriteFileFilter)
      .pipe(VideoDecode2)
      .pipe(VideoRender);
}