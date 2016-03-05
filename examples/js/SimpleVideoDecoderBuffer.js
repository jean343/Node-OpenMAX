"use strict";
var omx = require('openmax');
var stream = require('stream');
var fs = require('fs');

var ws = require('stream').Writable();
ws._write = function (chunk, enc, next) {
  console.log('_write length', chunk.length, chunk);
  next();

  if (chunk.onBufferDone) {
    chunk.onBufferDone();
  }
};

var VideoDecode = new omx.VideoDecode();
VideoDecode.init().then(function () {
  VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
  fs.createReadStream("../../spec/data/video-LQ.h264")
          .pipe(VideoDecode)
          .pipe(ws)
          .on('finish', function () {
            console.log("Done");
            process.exit();
          });
});
