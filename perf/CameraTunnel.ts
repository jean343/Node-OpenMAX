import omx = require('../');

var Clock = new omx.Clock();
var Camera = new omx.Camera();
var VideoRender: omx.VideoRender;

Camera.init()
  .then(function() {
    Clock = new omx.Clock();
    return Clock.init();
  })
  .then(function() {
    VideoRender = new omx.VideoRender();
    return VideoRender.init();
  })
  .then(function() {
    Camera.setFormat().enable();
    Clock.run();

    Clock
      .tunnel(Camera)
      .tunnel(VideoRender)
      .on('finish', function() {
        console.log("Done");
      });
  })
  .catch(console.log.bind(console, "Error:"));

setTimeout(() => {
  Clock.stop();
}, 5000);