var fs = require('fs');
var omx = require('../');

var TransformFilter = require('stream').Duplex();
TransformFilter._read = function () {
};
TransformFilter._write = function (chunk, enc, next) {

  // Write a black square 200 x 200 in the Y channel of th YUV stream
  for (var x = 0; x < 200; x++) {
    for (var y = 0; y < 200; y++) {
      chunk.writeUInt8(0x0, y * 1920 + x);
    }
  }

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

var VideoDecode = omx.VideoDecode();
var VideoRender = omx.VideoRender();

VideoDecode.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

fs.createReadStream("spec/video-LQ.h264")
    .pipe(VideoDecode)
    .pipe(TransformFilter)
    .pipe(VideoRender);