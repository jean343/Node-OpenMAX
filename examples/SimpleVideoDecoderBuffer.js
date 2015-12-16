var fs = require('fs');
var omx = require('../');

var ws = require('stream').Writable();
ws._write = function (chunk, enc, next) {
  console.log('_write length', chunk.length, chunk);
  next();
};

var VideoDecode = omx.VideoDecode();

VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

fs.createReadStream("test/test.h264")
    .pipe(VideoDecode)
    .pipe(ws);