import omx = require('openmax');
import stream = require('stream');
import fs = require('fs');

class WritableFilter extends stream.Writable {
  constructor() {
    super();
  }
  _write(chunk, enc, next) {
    console.log('_write length', chunk.length, chunk);
    next();
    if (chunk.onBufferDone) {
      chunk.onBufferDone();
    }
  };
}

var VideoDecode = new omx.VideoDecode();
var ws = new WritableFilter();

VideoDecode.init()
  .then(function() {
    VideoDecode.setVideoPortFormat(omx.VIDEO_CODINGTYPE.VIDEO_CodingAVC);

    fs.createReadStream("../../spec/data/video-LQ.h264")
      .pipe(VideoDecode)
      .pipe(ws)
      .on('finish', function() {
        console.log("Done");
        process.exit();
      });
  });
