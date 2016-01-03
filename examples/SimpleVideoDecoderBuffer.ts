import fs = require('fs');
import stream = require('stream');
import omx = require('../');

var ws = new stream.Writable();
ws._write = function (chunk, enc, next) {
  console.log('_write length', chunk.length, chunk);
  next();
};

var VideoDecode = new omx.VideoDecode();

VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

fs.createReadStream("spec/video-LQ.h264")
    .pipe(VideoDecode)
    .pipe(ws);
