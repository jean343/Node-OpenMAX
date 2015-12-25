var fps = require('fps')({every: 30});
var fs = require('fs');
var omx = require('../');

fps.on('data', function (framerate) {
  console.log("Fps: ", framerate);
});

var TransformFilter = require('stream').Duplex();
TransformFilter._read = function () {
};
TransformFilter._write = function (chunk, enc, next) {
  console.log('chunk', chunk.length);
  fps.tick();

  this.push(chunk);
  next();
};
// Needed to forward the portDefinitionChanged from the VideoDecode to the VideoRender
TransformFilter.on('pipe', function (source) {
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

fs.createReadStream("test/test.h264")
    .pipe(VideoDecode1)
    .pipe(VideoEncode)
    .pipe(TransformFilter)
    .pipe(VideoDecode2)
    .pipe(VideoRender)
    .pipe(fs.createWriteStream("test/test-recode.h264"));
