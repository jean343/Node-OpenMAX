var fs = require('fs');
var omx = require('../');

setInterval(function () { // test
  global.gc();
}, 100);
(function () {
  var VideoDecode = omx.VideoDecode();
  console.log('VideoDecode', VideoDecode, VideoDecode.__proto__);

  var VideoRender = omx.VideoRender();

  var Node_OMX = require('bindings')('Node_OMX');

  var TUNNEL = Node_OMX.TUNNEL(VideoDecode.component, VideoRender.component);

  format = VideoDecode.component.getParameter(130, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
  format.eCompressionFormat = omx.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC;
  VideoDecode.component.setParameter(130, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);

  VideoDecode.component.enableInputPortBuffer();
  VideoDecode.component.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);

  var inputBuffer = VideoDecode.component.getInputBuffer(omx.BLOCK_TYPE.DO_BLOCK);

  VideoDecode.component.on("eventPortSettingsChanged", function () {
    TUNNEL.enable();
    VideoRender.component.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
  });

  var CHUNK_SIZE = inputBuffer.nAllocLen;
  var buffer = new Buffer(CHUNK_SIZE);

  function readAll(file, nextBlock, done) {
    fs.open(file, 'r', function (err, fd) {
      if (err)
        throw err;
      function readNextChunk() {
        fs.read(fd, buffer, 0, CHUNK_SIZE, null, function (err, nread) {
          if (err)
            throw err;

          if (nread === 0) {
            fs.close(fd, function (err) {
              if (err)
                throw err;
            });

            done();
            return;
          }

          var data;
          if (nread < CHUNK_SIZE)
            data = buffer.slice(0, nread);
          else
            data = buffer;

          nextBlock.call(this, data, readNextChunk);
        });
      }
      readNextChunk();
    });
  }

  readAll("test/test.h264", function (data, complete) {
    inputBuffer.set(data);
    VideoDecode.component.emptyBuffer(inputBuffer, function () {
      complete();
    });
  }, function () {
    console.log('teardown');

    VideoDecode.component.emptyBuffer(undefined, function () {

      VideoRender.component.waitForEvent();

      TUNNEL.flush();

      console.log('disableInputPortBuffer');
      VideoDecode.component.disableInputPortBuffer();
      console.log('disable');
      TUNNEL.disable();
      console.log('teardown');
      TUNNEL.teardown();

      console.log('changeState');
      VideoDecode.component.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
      VideoRender.component.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
      console.log('OMX_StateLoaded');
      VideoDecode.component.changeState(omx.OMX_STATETYPE.OMX_StateLoaded);
      VideoRender.component.changeState(omx.OMX_STATETYPE.OMX_StateLoaded);

      console.log('bcm_host_deinit');
      Node_OMX.bcm_host_deinit();
      console.log('done');
      global.gc();
    });

  });
})();
global.gc();