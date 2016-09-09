import omx = require('../');

var Camera = new omx.Camera();
var VideoRender: omx.VideoRender;

Camera.init()
  .then(function() {
    VideoRender = new omx.VideoRender();
    return VideoRender.init();
  })
  .then(function() {
    Camera.setFormat().enable();
    Camera
      .tunnel(VideoRender)
      .on('finish', function() {
        console.log("Done");
      });
  })
  .catch(console.log.bind(console, "Error:"));