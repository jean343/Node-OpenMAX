var fs = require('fs');
var omx = require('../');

var dp = require('stream').Duplex();
dp._read = function () {
};
dp._write = function (chunk, enc, next) {

  for (var x = 0; x < 200; x++) {
    for (var y = 0; y < 200; y++) {
      chunk.writeUInt8(0x0, y * 1920 + x);
    }
  }
  
  this.push(chunk);

  next();
};
dp.on('pipe', function (source) {
  var self = this;
  source.on('portDefinitionChanged', function (portDefinition) {
    self.emit('portDefinitionChanged', portDefinition);
  });
});

var VideoDecode = omx.VideoDecode();
var VideoRender = omx.VideoRender();

VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

fs.createReadStream("test/test.h264")
    .pipe(VideoDecode)
    .pipe(dp)
    .pipe(VideoRender);
