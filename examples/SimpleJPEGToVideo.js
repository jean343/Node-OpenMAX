var fs = require('fs');
var omx = require('../');

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

var imgNum = 1;
var ReadJPEGFilter = require('stream').Readable();
ReadJPEGFilter._read = function () {
    "use strict";
    if (imgNum<20) {
        var chunk = fs.readFileSync("spec/data/frame_" + pad2(imgNum++) + ".jpg");

        this.push(chunk);
    } else {
        this.push(null);
    }
};


var ImageDecode = omx.ImageDecode();
var VideoEncode = omx.VideoEncode();

ImageDecode.setInputFormat(omx.Image.OMX_IMAGE_CODINGTYPE.OMX_IMAGE_CodingJPEG);
VideoEncode.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

VideoEncode.component.setParameter(VideoEncode.component.out_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamVideoBitrate, {
    eControlRate: omx.Video.OMX_VIDEO_CONTROLRATETYPE.OMX_Video_ControlRateVariable,
    nTargetBitrate: 50000
});

ReadJPEGFilter
    .pipe(ImageDecode)
    .pipe(VideoEncode)
    .pipe(fs.createWriteStream("spec/data/SimpleJPEGToVideo.h264"))
    .on('finish', function () {
        console.log("Encoding done");
        console.log("The encoded video is at: spec/data/SimpleJPEGToVideo.h264");
    });
