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
buf.fill(128, bufferFormatSize, bufferFormatSize + 2 * bufferFormatSize / 4);

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

    this.fps = require('fps')({ every: 30 });
    this.fps.on('data', function(framerate) {
      console.log("Fps: ", name, framerate);
    });

    this.on('pipe', function(source) {
      source.on('portDefinitionChanged', function(portDefinition) {
        //        console.log('portDefinitionChanged', portDefinition);
        self.portDefinition = portDefinition.image ? portDefinition.image : portDefinition.video;
        console.log(self.portDefinition);
        self.nStride = self.portDefinition.nStride;
        self.nSliceHeight = self.portDefinition.nSliceHeight;
      });
    });
  }
  _write(chunk, enc, next) {
    this.fps.tick();
    if (this.portDefinition.eColorFormat === omx.OMX_COLOR_FORMATTYPE.OMX_COLOR_FormatYUV420PackedPlanar) {
      omx.Component.copyAsync(chunk, buf, bufferFormat.video.nStride, bufferFormat.video.nSliceHeight,
        this.offsetX, this.offsetY, this.nStride, this.width, this.nSliceHeight, this.height, next);
    }
    if (chunk.onBufferDone) { chunk.onBufferDone(); }
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

class WriteFileFilter extends stream.Duplex {
  stream: stream.Writable;
  constructor() {
    super();
    this.stream = fs.createWriteStream("spec/data/video-LQ-9.h264");
  }
  _read() {
  };
  _write(chunk, enc, next) {
    this.stream.write(chunk);

    this.push(chunk);
    next();
  };
}

class WriteHTTP extends stream.Duplex {
  http = require('http');
  res = null;
  onConnection;
  constructor() {
    super();
    var self = this;
    this.http.createServer(function(req, res) {
      console.log('createServer');
      res.writeHead(200, { 'Content-Type': 'Video/H264' });
      self.res = res;
      self.onConnection();
    }).listen(3000);
  }
  _read() {
  };
  _write(chunk, enc, next) {
    this.res.write(chunk);
    next();
  };
}

//     | col | col
// row |
// row |

(function() {
  var rows = 4; // y
  var cols = 4; // x
  var width = 1920;
  var height = 1080;

  var i = 1;
  function loop() {
    var VideoDecode: omx.VideoDecode;
    var Resize: omx.Resize;
    var fps = new omx.FPS();
    VideoDecode = new omx.VideoDecode('VideoDecode' + i);

    var coli = (i - 1) % cols;
    var rowi = Math.floor((i - 1) / cols);

    var rw = width / cols;
    var rh = height / rows;
    var rx = coli * rw;
    var ry = rowi * rh;

    var ws = new WritableFilter('count' + i, rx, ry, rw, rh);
    VideoDecode.init()
      //      .then(function() {
      //        Resize = new omx.Resize();
      //        return Resize.init();
      //      })
      .then(function() {
        VideoDecode.setVideoPortFormat(omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);
        VideoDecode.setBufferCount(4, 4);

        //        var format = {
        //          eDir: 1,
        //          nBufferCountActual: 1,
        //          nBufferCountMin: 1,
        //          nBufferSize: 460800,
        //          bEnabled: 0,
        //          bPopulated: 0,
        //          eDomain: 2,
        //          image:
        //          {
        //            pNativeRender: false,
        //            nFrameWidth: rw,
        //            nFrameHeight: rh,
        //            nStride: Math.ceil(rw / 16) * 16,
        //            nSliceHeight: Math.ceil(rh / 16) * 16,
        //            bFlagErrorConcealment: 0,
        //            eCompressionFormat: 0,
        //            eColorFormat: 20,
        //            pNativeWindow: false
        //          }
        //        };
        //        console.log(format);
        //        Resize.setParameter(Resize.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, format);

        //        var format2 = {
        //          eMode: omx.OMX_RESIZEMODETYPE.OMX_RESIZE_CROP,
        //          nMaxWidth: rw,
        //          nMaxHeight: rh,
        //          bPreserveAspectRatio: 0,
        //          bAllowUpscaling: 0
        //        };
        //        console.log('Resize2', format2);
        //        Resize.setParameter(Resize.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamResize, format2);

                        fs.createReadStream("spec/data/myth-160.h264")
//        fs.createReadStream("spec/data/video-LQ-640.h264")
          .pipe(VideoDecode)
          //                    .pipe(Resize)
          .pipe(ws)
          .on('finish', function() {
            console.log("Done");
          });

        console.log('iter', i++);
        if (i <= rows * cols) {
          loop();
        }
      });
  }
  //


  var VideoEncode: omx.VideoEncode;
  var VideoRender: omx.VideoRender;
  var readableFilter = new ReadableFilter();
  var writeFileFilter = new WriteFileFilter();
  var writeHTTP = new WriteHTTP();

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

      //      var http = require('http');
      //      http.createServer(function(req, res) {
      //        console.log('createServer');
      //        readableFilter
      //          .pipe(VideoEncode)
      //          .pipe(res);
      //        loop();
      //      }).listen(3000);

      readableFilter
//                                .pipe(VideoEncode)
        .pipe(VideoRender);
//                    .pipe(writeFileFilter);
      loop();

    })
    .catch(console.log.bind(console));

})();
//setTimeout(gc, 1);
