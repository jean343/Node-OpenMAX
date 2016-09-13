import omx = require('openmax');

var Clock = new omx.Clock();
var Camera = new omx.Camera();
var VideoRender = new omx.VideoRender();

omx.Component.initAll([Clock, Camera, VideoRender])
  .then(function() {
    Camera.setFormat().enable();
    Clock.run();

    Clock
      .tunnel(Camera)
      .pipe(VideoRender)
      .on('finish', function() {
        console.log("Done");
      });
  })
  .catch(console.log.bind(console, "Error:"));

setTimeout(() => {
  Clock.stop();
}, 5000);