var fs = require('fs');
var omx = require('../');

fs.mkdir("spec/jpegs", function () {
});

var imgNum = 0;
var WriteJPEGFilter = require('stream').Duplex();
WriteJPEGFilter._read = function () {
};
WriteJPEGFilter._write = function (chunk, enc, next) {
    console.log('ReadJPEGFilter', chunk.length);

    fs.writeFileSync("spec/jpegs/img" + (imgNum++) + ".jpg", chunk);

    this.push(chunk);
    next();
};
// Needed to forward the portDefinitionChanged from the VideoDecode to the VideoRender
WriteJPEGFilter.on('pipe', function (source) {
    var self = this;
    source.on('portDefinitionChanged', function (portDefinition) {
        self.emit('portDefinitionChanged', portDefinition);
    });
});


var TransformFilter = require('stream').Duplex();
TransformFilter._read = function () {
};
TransformFilter._write = function (chunk, enc, next) {
    console.log('TransformFilter', chunk.length);

    this.push(chunk);
    next();
};
// Needed to forward the portDefinitionChanged from the VideoDecode to the VideoRender
TransformFilter.on('pipe', function (source) {
    var self = this;
    source.on('portDefinitionChanged', function (portDefinition) {
        self.emit('portDefinitionChanged', portDefinition);
    });
});



var VideoDecode = omx.VideoDecode();
var ImageEncode = omx.ImageEncode();

VideoDecode.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
ImageEncode.setCompressionFormat(omx.Image.OMX_IMAGE_CODINGTYPE.OMX_IMAGE_CodingJPEG);

fs.createReadStream("spec/data/video-LQ.h264")
    .pipe(VideoDecode)
    .pipe(TransformFilter)
    .pipe(ImageEncode)
    .pipe(WriteJPEGFilter);