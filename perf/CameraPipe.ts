import omx = require('../');

var Camera = new omx.Camera();
var VideoRender = new omx.VideoRender();

Camera.init()
  .then(function() {
    return VideoRender.init();
  })
  .then(function() {
    Camera.setFormat().enable();
    Camera
      .pipe(VideoRender)
      .on('finish', function() {
        console.log("Done");
      });
  });