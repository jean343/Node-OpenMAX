"use strict";
var omx = require('openmax');

var Clock;
var Camera;
var VideoRender;
Camera = new omx.Camera();
Camera.init()
        .then(function () {
          Clock = new omx.Clock();
          return Clock.init();
        })
        .then(function () {
          VideoRender = new omx.VideoRender();
          return VideoRender.init();
        })
        .then(function () {
          Camera.enable();
          Clock.run();

          Clock
                  .tunnel(Camera)
                  .tunnel(VideoRender)
                  .on('finish', function () {
                    console.log("Done");
                  });
        });
setTimeout(function () {
  Clock.stop();
}, 5000);
