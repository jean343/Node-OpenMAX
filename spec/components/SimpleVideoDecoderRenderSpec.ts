import fs = require('fs');
import omx = require('../../');

describe("SimpleVideoDecoderRenderSpec", function() {
  var VideoDecode: omx.VideoDecode;
  var VideoRender: omx.VideoRender;

  beforeEach(function(done) {
    VideoDecode = new omx.VideoDecode();
    VideoDecode.init()
      .then(function() {
        VideoRender = new omx.VideoRender();
        return VideoRender.init();
      })
      .then(done);
  });

  it("should play simple video", function(done) {
    VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

    fs.createReadStream("spec/data/video-LQ-30frames.h264")
      .pipe(VideoDecode)
      .pipe(VideoRender)
      .on('finish', function() {
        console.log("Done");
        done();
      });
  });

});

