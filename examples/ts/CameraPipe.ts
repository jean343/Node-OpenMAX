import fs = require('fs');
import stream = require('stream');
import omx = require('openmax');

var Camera: omx.Camera;
var VideoRender: omx.VideoRender;

Camera = new omx.Camera();
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
  });
  
setTimeout(process.exit, 5 * 1000);