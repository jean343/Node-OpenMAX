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
        VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
        VideoDecode.setBufferCount(1, 1);

        VideoRender.setBufferCount(1);

        var configDisplay = {
          set: omx.OMX_DISPLAYSETTYPE.OMX_DISPLAY_SET_DEST_RECT | omx.OMX_DISPLAYSETTYPE.OMX_DISPLAY_SET_FULLSCREEN | omx.OMX_DISPLAYSETTYPE.OMX_DISPLAY_SET_NOASPECT,
          fullscreen: 0,
          noaspect: 0,
          dest_rect: {
            x_offset: rx,
            y_offset: ry,
            width: rw,
            height: rh,
          }
        };

        //        console.log(VideoRender.getParameter(VideoRender.in_port, omx.OMX_INDEXTYPE.OMX_IndexConfigDisplayRegion));
        VideoRender.setParameter(VideoRender.in_port, omx.OMX_INDEXTYPE.OMX_IndexConfigDisplayRegion, configDisplay);
        //        console.log(VideoRender.getParameter(VideoRender.in_port, omx.OMX_INDEXTYPE.OMX_IndexConfigDisplayRegion));

        console.time("start");
        var start = +new Date();
        fs.createReadStream("spec/data/myth-160.h264")
//                          fs.createReadStream("spec/data/video-LQ-640.h264")
          //        fs.createReadStream("spec/data/video-LQ-1280.h264")
          .pipe(VideoDecode)
          //          .pipe(fps)
          .tunnel(VideoRender)
          .on('finish', function() {
            console.timeEnd("start");
            console.log("Done");
          });

        var _i = i;
        setInterval(function() {
          var param = VideoRender.getParameter(VideoRender.in_port, omx.OMX_INDEXTYPE.OMX_IndexConfigBrcmPortStats);
          console.log("Fps " + _i + ": " + param.nFrameCount * 1000 / (+new Date() - start));
        }, 2000);

        console.log('iter', i++);
        if (i <= rows * cols) {
          loop();
        }
      })
      .catch(console.log.bind(console));
  }
  loop();
})();