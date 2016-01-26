import fs = require('fs');
import omx = require('../');

var VideoDecode = new omx.VideoDecode();
var VideoRender = new omx.VideoRender();

VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

/*fs.createReadStream("spec/data/video-LQ.h264")
    .pipe(VideoDecode)
    .tunnel(VideoRender);*/
