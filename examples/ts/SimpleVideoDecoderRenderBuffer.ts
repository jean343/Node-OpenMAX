import fs = require('fs');
import stream = require('stream');
import omx = require('openmax');

class TransformFilter extends stream.Duplex {
  constructor() {
    super();
    var self = this;
    // Needed to forward the portDefinitionChanged from the VideoDecode to the VideoRender
    this.on('pipe', function(source) {
      source.on('portDefinitionChanged', function(portDefinition) {
        self.emit('portDefinitionChanged', portDefinition);
      });
    });
    this.on('finish', function() {
      this.push(null);
    });
  }
  _read() {
  };
  _write(chunk, enc, next) {

    // Write a black square 200 x 200 in the Y channel of th YUV stream
    for (var x = 0; x < 200; x++) {
      for (var y = 0; y < 200; y++) {
        chunk.writeUInt8(0x0, y * 1920 + x);
      }
    }

    this.push(chunk);

    next();
  };
}

var VideoDecode = new omx.VideoDecode('VideoDecode1');
var VideoRender = new omx.VideoRender();
var transformFilter = new TransformFilter();

omx.Component.initAll([VideoDecode, VideoRender])
  .then(function() {
    VideoDecode.setVideoPortFormat(omx.VIDEO_CODINGTYPE.VIDEO_CodingAVC);

    fs.createReadStream("../../spec/data/video-LQ.h264")
      .pipe(VideoDecode)
      .pipe(transformFilter)
      .pipe(VideoRender)
      .on('finish', function() {
        console.log("Done");
        process.exit();
      });
  });
