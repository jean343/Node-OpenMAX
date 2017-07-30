import fs = require('fs');
import omx = require('../index');
import stream = require('stream');

//     | col | col
// row |
// row |

(function() {
  var rows = 3; // y
  var cols = 4; // x
  var width = 1920;
  var height = 1080;

  var i = 1;
  function loop() {
    var VideoDecode: omx.VideoDecode;
    var VideoRender: omx.VideoRender;
    var fps = new omx.FPS();
    VideoDecode = new omx.VideoDecode('VideoDecode' + i);

    var coli = (i - 1) % cols;
    var rowi = Math.floor((i - 1) / cols);

    var rw = width / cols;
    var rh = height / rows;
    var rx = coli * rw;
    var ry = rowi * rh;

    VideoDecode.init()
      .then(function() {
        VideoRender = new omx.VideoRender();
        return VideoRender.init();
      })
      .then(function() {
        VideoDecode.setVideoPortFormat(omx.VIDEO_CODINGTYPE.VIDEO_CodingAVC);
        VideoDecode.setBufferCount(1, 1);

        VideoRender.setBufferCount(1);

        var configDisplay = {
          set: omx.DISPLAYSETTYPE.DISPLAY_SET_DEST_RECT | omx.DISPLAYSETTYPE.DISPLAY_SET_FULLSCREEN | omx.DISPLAYSETTYPE.DISPLAY_SET_NOASPECT,
          fullscreen: 0,
          noaspect: 0,
          dest_rect: {
            x_offset: rx,
            y_offset: ry,
            width: rw,
            height: rh,
          }
        };

        VideoRender.setParameter(VideoRender.in_port, omx.INDEXTYPE.IndexConfigDisplayRegion, configDisplay);

        console.time("start");
        var start = +new Date();
        fs.createReadStream("spec/data/myth-160.h264")
          .pipe(VideoDecode)
          .tunnel(VideoRender)
          .on('finish', function() {
            console.timeEnd("start");
            console.log("Done");
          });

        var _i = i;
        setInterval(function() {
          var param = VideoRender.getParameter(VideoRender.in_port, omx.INDEXTYPE.IndexConfigBrcmPortStats);
          console.log("Fps " + _i + ": " + param.nFrameCount * 1000 / (+new Date() - start));
        }, 1000);

        console.log('iter', i++);
        if (i <= rows * cols) {
          loop();
        }
      })
      .catch(console.log.bind(console));
  }
  loop();
})();
