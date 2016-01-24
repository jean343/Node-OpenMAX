import fs = require('fs');
import omx = require('../');
import stream = require('stream');

var bufferFormat = {
  eDir: 1,
  nBufferCountActual: 1,
  nBufferCountMin: 1,
  nBufferSize: 3133440,
  bEnabled: 0,
  bPopulated: 0,
  eDomain: 1,
  video:
  {
    pNativeRender: false,
    nFrameWidth: 1920,
    nFrameHeight: 1080,
    nStride: 1920,
    nSliceHeight: 1088,
    nBitrate: 0,
    xFramerate: 0,
    bFlagErrorConcealment: 0,
    eCompressionFormat: 0,
    eColorFormat: 20,
    pNativeWindow: false
  }
};
var bufferFormatSize = bufferFormat.video.nStride * bufferFormat.video.nSliceHeight;

var buf: Buffer = new Buffer(bufferFormat.nBufferSize);

buf.fill(0, 0, bufferFormatSize);
buf.fill(128, bufferFormatSize,
  bufferFormatSize + 2 * bufferFormatSize / 4);

class WritableFilter extends stream.Writable {
  fps;
  portDefinition;
  nStride;
  nSliceHeight;
  constructor(
    public name: string,
    public offsetX: number,
    public offsetY: number,
    public width: number,
    public height: number
  ) {
    super();
    var self = this;

    console.log(this.offsetX, this.offsetY, this.width, this.height);

    this.fps = require('fps')({ every: 30 });
    this.fps.on('data', function(framerate) {
      console.log("Fps: ", name, framerate);
    });

    this.on('pipe', function(source) {
      source.on('portDefinitionChanged', function(portDefinition) {
        //        console.log('portDefinitionChanged', portDefinition);
        self.portDefinition = portDefinition;
        self.nStride = self.portDefinition.video.nStride;
        self.nSliceHeight = self.portDefinition.video.nSliceHeight;
      });
    });
  }
  _write(chunk, enc, next) {
    //    console.log('_write length', chunk.length, chunk);
    if (this.portDefinition.video.eColorFormat === omx.OMX_COLOR_FORMATTYPE.OMX_COLOR_FormatYUV420PackedPlanar) {
      var w = Math.min(this.nStride, this.width);
      var h = Math.min(this.nSliceHeight, this.height);

      function copyBlock(offsetIn, offsetOut, offsetX, offsetY, nStride, _w, _h, _width) {
        for (var y = 0; y < _h; y++) {
          var s = chunk.slice(offsetIn + y * nStride, offsetIn + y * nStride + _w);

          var destOffset = offsetOut + offsetX + (offsetY + y) * _width;
          s.copy(buf, destOffset);
        }
      }

      copyBlock(0, 0, this.offsetX, this.offsetY, this.nStride, w, h, width);
      copyBlock(this.nStride * this.nSliceHeight, bufferFormatSize, this.offsetX / 2, this.offsetY / 2, this.nStride / 2, w / 2, h / 2, width / 2);
    }
    this.fps.tick();
    next();
  };
}

class ReadableFilter extends stream.Readable {
  fps;
  firstPacket: boolean = true;

  constructor() {
    super();
    this.fps = require('fps')({ every: 30 });
    this.fps.on('data', function(framerate) {
      console.log("Fps: out ", framerate);
    });
  }
  _read() {
    var self = this;

    if (this.firstPacket) {
      this.firstPacket = false;
      this.emit('portDefinitionChanged', bufferFormat);
    }

    setTimeout(function() {
      self.fps.tick();
      self.push(buf);
    }, 1000 / 30);
  };
}


//     | col | col
// row |
// row |

var rows = 1; // y
var cols = 1; // x
var width = 1920;
var height = 1080;

var i = 1;
function loop() {
  var VideoDecode: omx.VideoDecode;
  VideoDecode = new omx.VideoDecode('VideoDecode' + i);

  var coli = (i - 1) % cols;
  var rowi = Math.floor((i - 1) / cols);

  var rw = width / cols;
  var rh = height / rows;
  var rx = coli * rw;
  var ry = rowi * rh;

  //  var ws = new WritableFilter('count' + i, rx, ry, rw, rh);
  var ws = new WritableFilter('count' + i, 0, 0, 640, 480);
  VideoDecode.init()
    .then(function() {
      VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
      VideoDecode.setBufferCount(1);

      fs.createReadStream("spec/data/video-LQ-640.h264")
        .pipe(VideoDecode)
        .pipe(ws)
        .on('finish', function() {
          console.log("Done");
        });

      console.log('iter', i++);
      if (i <= rows * cols) {
        //        setTimeout(loop, 1);
        loop();
      }
    });
}
loop();





var VideoEncode: omx.VideoEncode;
var VideoRender: omx.VideoRender;
var readableFilter = new ReadableFilter();

VideoEncode = new omx.VideoEncode();
VideoEncode.init()
  .then(function() {
    VideoRender = new omx.VideoRender();
    return VideoRender.init();
  })
  .then(function() {
    VideoEncode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

    VideoEncode.component.setParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoBitrate, {
      eControlRate: omx.OMX_VIDEO_CONTROLRATETYPE.OMX_Video_ControlRateDisable
    });

    var quantizationType = VideoEncode.component.getParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoQuantization);
    quantizationType.nQpI = 25;
    quantizationType.nQpP = quantizationType.nQpI;
    VideoEncode.component.setParameter(VideoEncode.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoQuantization, quantizationType);

    readableFilter
      .pipe(VideoRender);


  });









