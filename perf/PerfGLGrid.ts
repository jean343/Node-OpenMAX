import fs = require('fs');
import omx = require('../index');
import stream = require('stream');
var async = require('async');

var graphics = new omx.Graphics();


var allWS: Array<WritableFilter> = [];

class WritableFilter extends stream.Writable {
  texture: omx.EglImage;
  data: Buffer;
  x0; y0; x1; y1;
  fps;
  constructor(
    public offsetX: number,
    public offsetY: number,
    public width: number,
    public height: number) {
    super({
      objectMode: true
    });

    this.x0 = this.offsetX * 2 - 1;
    this.y0 = -(this.offsetY * 2 - 1);
    this.x1 = this.x0 + this.width * 2;
    this.y1 = this.y0 - this.height * 2;

    this.fps = require('fps')({ every: 30 });
    this.fps.on('data', function(framerate) {
      console.log("Fps : ", framerate);
    });
  }
  _write(chunk, enc, next) {
//    console.time("_write");
    this.fps.tick();
    this.texture = chunk;
    if (chunk.onBufferDone) { chunk.onBufferDone(); }
    next();
//    console.timeEnd("_write");
  };
}

var drawfps = require('fps')({ every: 30 });
drawfps.on('data', function(framerate) {
  console.log("Fps draw : ", framerate);
});
function draw() {
  graphics.beginFrame();

  //  async.each(allWS, function(ws: WritableFilter, callback) {
  //    if (ws.texture !== undefined) {
  //      setTimeout(function() {
  //        graphics.drawTextureRect(ws.texture, ws.x0, ws.y0, ws.x1, ws.y1);
  //        callback();
  //      }, 0);
  //    } else {
  //      callback();
  //    }
  //  }, function(err) {
  //    graphics.endFrame();
  //    //      console.timeEnd("draw");
  //  });
  
  //  //  console.time("forEach");
  allWS.forEach(function(ws) {
    if (ws.texture === undefined) return;
    graphics.drawTextureRect(ws.texture, ws.x0, ws.y0, ws.x1, ws.y1);
  });

  graphics.endFrame();
  drawfps.tick();

}
setInterval(draw, 1000 / 30);

function range(start, end) {
  var foo = [];
  for (var i = start; i <= end; i++) {
    foo.push(i);
  }
  return foo;
}

(function() {
  var rows = 4; // y
  var cols = 4; // x

  async.each(range(1, rows * cols), function(i, callback) {
    var VideoDecode: omx.VideoDecode;
    var EglRender: omx.EglRender;
    var fps = new omx.FPS();
    VideoDecode = new omx.VideoDecode('VideoDecode' + i);

    var coli = (i - 1) % cols;
    var rowi = Math.floor((i - 1) / cols);

    var rw = 1 / cols;
    var rh = 1 / rows;
    var rx = coli * rw;
    var ry = rowi * rh;

    var ws = new WritableFilter(rx, ry, rw, rh);
    allWS.push(ws);
    VideoDecode.init()
      .then(function() {
        EglRender = new omx.EglRender();
        return EglRender.init();
      })
      .then(function() {
        VideoDecode.setVideoPortFormat(omx.VIDEO_CODINGTYPE.VIDEO_CodingAVC);
        VideoDecode.setBufferCount(1, 1);

        EglRender.setBufferCount(1, 1);
        EglRender.graphics = graphics;

        console.time("start");
        //        fs.createReadStream("spec/data/myth-160.h264")
        fs.createReadStream("spec/data/video-LQ-640.h264")
          //        fs.createReadStream("spec/data/video-LQ-1280.h264")
          .pipe(VideoDecode)
          .tunnel(EglRender)
          .pipe(ws)
          .on('finish', function() {
            console.log("Done");
          });

        console.log('iter', i++);
        callback();
      })
      .catch(console.log.bind(console));
  });
})();