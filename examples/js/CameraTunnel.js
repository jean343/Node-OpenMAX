"use strict";
var omx = require('openmax');
var Camera;
var VideoRender;
Camera = new omx.Camera();
Camera.init()
        .then(function () {
          VideoRender = new omx.VideoRender();
          return VideoRender.init();
        })
        .then(function () {
          Camera.enable();
          Camera.tunnel(VideoRender)
                  .on('finish', function () {
                    console.log("Done");
                  });
        });
setTimeout(process.exit, 5 * 1000);
