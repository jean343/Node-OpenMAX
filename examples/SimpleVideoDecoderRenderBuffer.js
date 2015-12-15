var fs = require('fs');
var omx = require('../');

var dp = require('stream').Duplex();
dp._read = function () {
};
dp._write = function (chunk, enc, next) {
  console.log(chunk.length);

  this.push(chunk);// + ' Duplex');

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
//    .pipe(dp)
    .pipe(VideoRender);
