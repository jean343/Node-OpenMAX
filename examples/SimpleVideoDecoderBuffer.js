var fs = require('fs');
var omx = require('../');

var ws = require('stream').Writable();
ws._write = function (chunk, enc, next) {
  console.log('_write length', chunk.length, chunk);
  next();
};

var VideoDecode = omx.VideoDecode();

VideoDecode.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

fs.createReadStream("spec/data/video-LQ.h264")
    .pipe(VideoDecode)
    .pipe(ws)
    .on('finish', function () {
      console.log("Done");
    });