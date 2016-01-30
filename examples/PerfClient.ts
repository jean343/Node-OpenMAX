var http = require('http');
import omx = require('../');
import stream = require('stream');

class TransformFilter extends stream.Duplex {
  constructor() {
    super();
  }
  _read() {
  };
  _write(chunk, enc, next) {
    console.log(chunk.length);

    this.push(chunk);
    next();
  };
}

var transformFilter = new TransformFilter();

(function() {
  var VideoDecode: omx.VideoDecode;
  var VideoRender: omx.VideoRender;

  VideoDecode = new omx.VideoDecode();
  VideoDecode.init()
    .then(function() {
      VideoRender = new omx.VideoRender();
      return VideoRender.init();
    })
    .then(function() {
      VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
      VideoDecode.setBufferCount();

      http.get("http://localhost:3000", function(response) {
        response
          .pipe(transformFilter)
          .pipe(VideoDecode)
          .pipe(VideoRender)
          .on('finish', function() {
            console.log("Done");
          });
      });
    });
})();
//setTimeout(gc, 100);
