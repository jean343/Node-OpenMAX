import fs = require('fs');
import omx = require('../index');
import stream = require('stream');

var VideoDecode: omx.VideoDecode;
var VideoRender: omx.VideoRender;
var fps = new omx.FPS(1000);
VideoDecode = new omx.VideoDecode('VideoDecode');

//omx.Component.verbose = omx.VERBOSE_LEVEL.None;
omx.Component.verbose = omx.VERBOSE_LEVEL.Debug;
omx.Component.logComponent = 'VideoDecode';

// 2050.206ms

class WritableFilter extends stream.Writable {

  constructor() {
    super();
  }
  _write(chunk, enc, next) {
    if (chunk.onBufferDone) { chunk.onBufferDone(); }
    next();
  };
}

class ReadableFilter extends stream.Readable {
  fd = null;
  chunkSize = 65536;
  buffer = new Buffer(this.chunkSize);
  bufferID = 0;
  constructor() {
    super();
    var self = this;
    fs.open('spec/data/myth-160.h264', 'r', function(err, fd) {
      self.fd = fd;
    });
  }
  _read() {
    if (this.fd === null) return;
    var self = this;
    console.log('_', 'start read');
    fs.read(this.fd, this.buffer, 0, this.chunkSize, null, function(err, bytesRead, buffer) {
      console.log('_', 'done read');
      console.log('_', 'start push');

      setTimeout(function() {
        var buf = new Buffer(bytesRead);
        buf.bufferID = self.bufferID++;
        buffer.copy(buf);
        self.push(buf);
        console.log('_', 'done push');
      }, 100);
    });
  };
}

var ws = new WritableFilter();
var rs = new ReadableFilter();

VideoDecode.init()
  .then(function() {
    VideoRender = new omx.VideoRender();
    return VideoRender.init();
  })
  .then(function() {
    VideoDecode.setVideoPortFormat(omx.VIDEO_CODINGTYPE.VIDEO_CodingAVC);
    VideoDecode.setBufferCount(1, 1);

    VideoRender.setBufferCount(2);

    console.time("start");
    fs.createReadStream("spec/data/myth-160.h264")
      //        fs.createReadStream("spec/data/test.h264")
      //    fs.createReadStream("spec/data/video-LQ-640.h264")
      //    rs
      .pipe(VideoDecode)
      .pipe(fps)
      //            .pipe(ws)
      .pipe(VideoRender)
      .on('finish', function() {
        console.timeEnd("start");
        console.log("Done");
      });
  })
  .catch(console.log.bind(console));
setTimeout(gc, 100);