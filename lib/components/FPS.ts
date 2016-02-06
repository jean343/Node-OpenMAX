import stream = require('stream');

export class FPS extends stream.Duplex {
  fps = 0;
  numFrame = 0;
  lastSec = +Date.now();
  constructor(public ms = 1000) {
    super();
    var self = this;
    // Needed to forward the portDefinitionChanged from the VideoDecode to the VideoRender
    this.on('pipe', function(source) {
      source.on('portDefinitionChanged', function(portDefinition) {
        self.emit('portDefinitionChanged', portDefinition);
      });
    });
  }
  _read() {
  };
  _write(chunk, enc, next) {
    this.numFrame++;

    var newTime = +Date.now();
    if (newTime >= this.lastSec + this.ms) {
      this.fps = this.numFrame * (1000 / this.ms);
      this.numFrame = 0;
      this.lastSec = newTime;
      console.log("FPS: ", this.fps);
    }

    this.push(chunk);
    next();
  };
}