import omx = require('../../');
import stream = require('stream');

class WritableFilter extends stream.Writable {
  constructor() {
    super();
  }
  _write(chunk, enc, next) {
    next();
    if (chunk.onBufferDone) {
      chunk.onBufferDone();
    }
  };
}

describe("Camera", function() {
  var Camera: omx.Camera;
  var ws: WritableFilter;

  beforeEach(function(done) {
    Camera = new omx.Camera();
    Camera.init()
      .then(function() {
        done();
      })
      .catch(console.log.bind(console));
    ws = new WritableFilter();
  });

  afterEach(function(done) {
    Camera.close()
      .then(function() {
        done();
      })
  });

  it("should have right ports", function() {
    expect(Camera.in_port).toEqual(73);
    expect(Camera.out_port).toEqual(71);
  });

  it("should have the right format", function() {
    var f = Camera.getParameter(Camera.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
    expect(f).toEqual({
      nIndex: 0,
      eCompressionFormat: 0,
      eColorFormat: 20,
      xFramerate: 0
    });
  });

  it("should have the right port definition", function() {
    var f = Camera.getParameter(Camera.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
    expect(f).toEqual({
      eDir: 1,
      nBufferCountActual: 1,
      nBufferCountMin: 1,
      nBufferSize: 15360,
      bEnabled: 0,
      bPopulated: 0,
      eDomain: 1,
      video:
      {
        pNativeRender: false,
        nFrameWidth: 640,
        nFrameHeight: 480,
        nStride: 640,
        nSliceHeight: 16,
        nBitrate: 0,
        xFramerate: 0,
        bFlagErrorConcealment: 0,
        eCompressionFormat: 0,
        eColorFormat: 20,
        pNativeWindow: false
      }
    });
  });

  it("should set format", function() {
    Camera.setFormat();
    var f = Camera.getParameter(Camera.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
    expect(f).toEqual({
      eDir: 1,
      nBufferCountActual: 1,
      nBufferCountMin: 1,
      nBufferSize: 460800,
      bEnabled: 0,
      bPopulated: 0,
      eDomain: 1,
      video:
      {
        pNativeRender: false,
        nFrameWidth: 640,
        nFrameHeight: 480,
        nStride: 640,
        nSliceHeight: 480,
        nBitrate: 0,
        xFramerate: 0,
        bFlagErrorConcealment: 0,
        eCompressionFormat: 0,
        eColorFormat: 20,
        pNativeWindow: false
      }
    });
  });

  it("should enable", function() {
    Camera.enable();
    var f = Camera.getParameter(Camera.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing);
    expect(f).toEqual({ bEnabled: 1 });
  });

  it("should disable", function() {
    Camera.disable();
    var f = Camera.getParameter(Camera.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigPortCapturing);
    expect(f).toEqual({ bEnabled: 0 });
  });

  it("should tunnel and pipe to stream", function(done) {
    var Clock = new omx.Clock();
    Clock.init()
      .then(function() {
        Camera.setFormat().enable();
        Clock.run();

        Clock
          .tunnel(Camera)
          .pipe(ws)
          .on('finish', function() {
            done();
          });
        setTimeout(() => {
          Clock.stop();
        }, 100);
      })
      .catch(console.log.bind(console, "Error:"));

  });

  xit("should tunnel to renderer", function(done) {
    var Clock = new omx.Clock();
    var VideoRender: omx.VideoRender;
    Clock.init()
      .then(function() {
        VideoRender = new omx.VideoRender();
        return VideoRender.init();
      })
      .then(function() {
        Camera.setFormat().enable();
        Clock.run();

        Clock
          .tunnel(Camera)
          .tunnel(VideoRender)
          .on('finish', function() {
            done();
          });
        setTimeout(() => {
          Clock.stop();
        }, 100);
      })
      .catch(console.log.bind(console, "Error:"));

  });

});
