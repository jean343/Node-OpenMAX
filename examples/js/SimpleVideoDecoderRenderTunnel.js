"use strict";
var fs = require('fs');
var omx = require('openmax');
var VideoDecode;
var VideoRender;
VideoDecode = new omx.VideoDecode('VideoDecode1');
VideoDecode.init()
    .then(function () {
    VideoRender = new omx.VideoRender();
    return VideoRender.init();
})
    .then(function () {
    VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
    fs.createReadStream("../../spec/data/video-LQ.h264")
        .pipe(VideoDecode)
        .tunnel(VideoRender)
        .on('finish', function () {
        console.log("Done");
        process.exit();
    });
});
