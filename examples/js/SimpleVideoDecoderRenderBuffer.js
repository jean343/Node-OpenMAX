"use strict";
var fs = require('fs');
var stream = require('stream');
var omx = require('openmax');

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
TransformFilter.on('pipe', function (source) {
  var self = this;
  source.on('portDefinitionChanged', function (portDefinition) {
    self.emit('portDefinitionChanged', portDefinition);
  });
});
TransformFilter.on('finish', function () {
  this.push(null);
});

var VideoDecode = new omx.VideoDecode('VideoDecode1');
var VideoRender = new omx.VideoRender();
omx.Component.initAll([VideoDecode, VideoRender])
        .then(function () {
          VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
          fs.createReadStream("../../spec/data/video-LQ.h264")
                  .pipe(VideoDecode)
                  .pipe(TransformFilter)
                  .pipe(VideoRender)
                  .on('finish', function () {
                    console.log("Done");
                    process.exit();
                  });
        });
