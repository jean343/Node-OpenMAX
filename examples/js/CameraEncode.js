"use strict";
var stream = require('stream');
var omx = require('openmax');

var Clock = new omx.Clock();
var Camera = new omx.Camera();
var ImageEncode = new omx.ImageEncode();


omx.Component.initAll([Clock, Camera, ImageEncode])
    .then(function () {
        Camera.setFormat().enable();

        var ws = require('stream').Writable();
        ws._write = function (chunk, enc, next) {
            next();

            if (chunk.onBufferDone) {
                console.log("Received compressed frame with length: ",
                    chunk.length, " but used: ", chunk.usedLength);
                chunk.onBufferDone();
            }
        };

        ImageEncode.setInputFormat(omx.IMAGE_CODINGTYPE.IMAGE_CodingJPEG);

        Clock.run();
        Clock
            .tunnel(Camera)
            .pipe(ImageEncode)
            .pipe(ws)
            .on('finish', function () {
                console.log("Done");
            });
    });
setTimeout(function () {
    Clock.stop();
}, 5000);

