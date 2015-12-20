var omx = require('../../');

describe("Player", function () {
  var VideoDecode;

  beforeEach(function () {
    VideoDecode = omx.VideoDecode();
  });

  it("should have right ports", function () {
    expect(VideoDecode.component.in_port).toEqual(130);
    expect(VideoDecode.component.out_port).toEqual(131);
  });

  it("should have the right format", function () {
    var f = VideoDecode.component.getParameter(VideoDecode.component.in_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
    expect(f).toEqual({
      nIndex: 0,
      eCompressionFormat: 4,
      eColorFormat: 20,
      xFramerate: 0
    });
  });

  it("should have the right port fefinition", function () {
    var f = VideoDecode.component.getParameter(VideoDecode.component.out_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
    expect(f).toEqual({
      eDir: 1,
      nBufferCountActual: 1,
      nBufferCountMin: 1,
      nBufferSize: 115200,
      bEnabled: 0,
      bPopulated: 0,
      eDomain: 1,
      video: {
        pNativeRender: false,
        nFrameWidth: 320,
        nFrameHeight: 240,
        nStride: 320,
        nSliceHeight: 240,
        nBitrate: 0,
        xFramerate: 0,
        bFlagErrorConcealment: 0,
        eCompressionFormat: 0,
        eColorFormat: 20,
        pNativeWindow: false
      }
    });
  });


});
