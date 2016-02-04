import fs = require('fs');
import omx = require('../');
import stream = require('stream');

var VideoDecode: omx.VideoDecode;
VideoDecode = new omx.VideoDecode('VideoDecode');
var EglRender: omx.EglRender;


class WritableFilter extends stream.Writable {
  graphics: omx.Graphics;
  fps;
  constructor() {
    super({
      objectMode: true
    });

    //    var self = this;
    this.graphics = new omx.Graphics();

    this.fps = require('fps')({ every: 30 });
    this.fps.on('data', function(framerate) {
      console.log("Fps : ", framerate);
    });
  }
  _write(chunk: omx.EglImage, enc, next) {
    try {
      this.fps.tick();
      var self = this;

      if (chunk.onBufferDone) { chunk.onBufferDone(); }
      next();
      
      //      console.time("draw");
      self.graphics.beginFrame();
      self.graphics.drawTextureRect(chunk, -1, 1, 1, -1);
      self.graphics.endFrame();
      //      console.timeEnd("draw");
    } catch (err) {
      console.log(err);
    }
  };
}

var ws = new WritableFilter();
VideoDecode.init()
  .then(function() {
    EglRender = new omx.EglRender();
    return EglRender.init();
  })
  .then(function() {
    VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
//    VideoDecode.setBufferCount(1, 4);

//    EglRender.setBufferCount(3, 1);
    EglRender.graphics = ws.graphics;

    console.time("start");
    //        fs.createReadStream("spec/data/myth-160.h264")
//        fs.createReadStream("spec/data/test.h264")
    fs.createReadStream("spec/data/video-LQ-640.h264")
      .pipe(VideoDecode)
      .tunnel(EglRender)
      .pipe(ws)

      .on('finish', function() {
        console.timeEnd("start");
        console.log("Done");
      });
  })
  .catch(console.log.bind(console));