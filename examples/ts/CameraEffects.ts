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

var Clock = new omx.Clock();
var Camera = new omx.Camera();
var VideoRender = new omx.VideoRender();
var tf = new TransformFilter();

omx.Component.initAll([Clock, Camera, VideoRender])
  .then(function() {
    Camera.setFormat().enable();
    Clock.run();

    Clock
      .tunnel(Camera)
      .pipe(tf)
      .pipe(VideoRender)
      .on('finish', function() {
        console.log("Done");
      });
  })
  .catch(console.log.bind(console, "Error:"));

setTimeout(() => {
  Clock.stop();
}, 5000);