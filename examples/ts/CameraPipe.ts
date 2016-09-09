import omx = require('openmax');

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
      .pipe(VideoRender)
      .on('finish', function() {
        console.log("Done");
      });
  })
  .catch(console.log.bind(console, "Error:"));

setTimeout(process.exit, 5 * 1000);