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
        self.portDefinition = portDefinition;
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
        chunk.writeUInt8(0x0, y * this.portDefinition.video.nStride + x);
      }
    }

    this.push(chunk);

    next();
  };
}

var Camera: omx.Camera;
var tf = new TransformFilter();
var VideoRender: omx.VideoRender;

Camera = new omx.Camera();
Camera.init()
  .then(function() {
    VideoRender = new omx.VideoRender();
    return VideoRender.init();
  })
  .then(function() {
    Camera.setFormat().enable();
    Camera
      .pipe(tf)
      .pipe(VideoRender)
      .on('finish', function() {
        console.log("Done");
      });
  });
  
setTimeout(process.exit, 5 * 1000);