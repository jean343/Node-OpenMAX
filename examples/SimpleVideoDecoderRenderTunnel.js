var fs = require('fs');
var omx = require('../');

var VideoDecode = omx.VideoDecode();
var VideoRender = omx.VideoRender();

VideoDecode.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

fs.createReadStream("spec/data/video-LQ.h264")
    .pipe(VideoDecode)
    .tunnel(VideoRender);
