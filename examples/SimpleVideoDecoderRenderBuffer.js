var fs = require('fs');
var omx = require('../');

var dp = require('stream').Duplex();
dp._read = function () {
};
dp._write = function (chunk, enc, next) {
  console.log(chunk);
  
  this.push(chunk);// + ' Duplex');
  
  next();
};

var VideoDecode = omx.VideoDecode();
var VideoRender = omx.VideoRender();

VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

fs.createReadStream("test/test.h264")
    .pipe(VideoDecode)
    .pipe(dp)
    .pipe(VideoRender);
