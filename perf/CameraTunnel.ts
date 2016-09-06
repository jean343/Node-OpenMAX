import fs = require('fs');
import omx = require('../');


var Camera: omx.Camera;
var VideoRender: omx.VideoRender;

Camera = new omx.Camera();
Camera.init()
  .then(function() {
    VideoRender = new omx.VideoRender();
    return VideoRender.init();
  })
  .then(function() {

    var format = Camera.getParameter(Camera.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing);
    format.bEnabled = 1;
    Camera.setParameter(Camera.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing, format);

    Camera.tunnel(VideoRender)
      .on('finish', function() {
        console.log("Done");
      });
  });