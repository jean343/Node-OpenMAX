# Node-OpenMAX

[![NPM version](http://img.shields.io/npm/v/openmax.svg)](https://www.npmjs.org/package/openmax)

Using the OMX library in C can be tricky and be a painful experience. I wanted a library which can greatly simplify the process while allowing me to modify any settings such as the H.264 I-frame interval and qp parameter. With this library, any OMX components can be linked with any other components with hardware tunnel or software Node Buffers. With the buffers, we can do data manipulation directly in Node.

The goal of this library is to:
- Provide a complete wrapper of the OpenMAX https://www.khronos.org/openmax/ library with auto-generated functions and headers with code signature similar to the C code.
- Add JavaScript modules to link user code and OpenMAX
- Use Node Streams to provide an efficient and simple transport between OMX components.

### Install ###
```
npm install --save openmax
```

## Quick Example

```javascript
var fs = require('fs');
var omx = require('openmax');

var VideoDecode = omx.VideoDecode();
var VideoRender = omx.VideoRender();

VideoDecode.setVideoPortFormat(omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC);

fs.createReadStream("video-LQ.h264")
    .pipe(VideoDecode)
    .tunnel(VideoRender);
```

### Run samples ###

There are JavaScript and TypeScript samples
To run the JavaScript samples:
```sh
git clone https://github.com/jean343/Node-OpenMAX.git
cd Node-OpenMAX/examples/js/
npm install
node SimpleVideoDecoderRender
```

To run the TypeScript samples:
```sh
npm install typings
git clone https://github.com/jean343/Node-OpenMAX.git
cd Node-OpenMAX/examples/ts/
npm install
node ./node_modules/typescript/bin/tsc
node dist/SimpleVideoDecoderRender
```

SimpleVideoDecoderRenderTunnel
Example to read an H.264 file, decode it using video_decode and tunnel it to the video_render.

SimpleVideoDecoderBuffer
Example to pipe the RAW YUV to a custom Node.js Stream.

SimpleVideoDecoderRenderBuffer
Example to pipe the RAW YUV to a custom Node.js Duplex Stream, do in-memory YUV manipulation the pipe the result to the monitor.

SimpleDecoderEncoder
This example can be run with pipe or tunnel, the tunnel is faster as the intermediate RAW data doesn't touch Node.
Decodes an H.264 stream, encode it using custom settings of constant QP, write the result to a file then decode this result and display on the screen.


### Test with jasmine ###
```
npm test
npm run test-watch
```

### Code samples ###
Pipe a file into a VideoDecode then tunnel to the Render
```javascript
fs.createReadStream("spec/data/video-LQ.h264")
  .pipe(VideoDecode)
  .tunnel(VideoRender);
```

Pipe a file to a VideoDecoder, encode it, write the result to a file, decode the result and display it.
```javascript
fs.createReadStream("spec/data/video-LQ.h264")
  .pipe(VideoDecode1)
  .tunnel(VideoEncode)
  .pipe(WriteFileFilter)
  .pipe(VideoDecode2)
  .tunnel(VideoRender);
```

Use the OMX OMX_GetParameter and OMX_SetParameter to change eCompressionFormat to
```javascript
var format = VideoDecode.component.getParameter(VideoDecode.component.in_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);
format.eCompressionFormat = omx.Video.OMX_VIDEO_CODINGTYPE.OMX_VIDEO_CodingAVC;
VideoDecode.component.setParameter(VideoDecode.component.in_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);
```

Get the complete OMX_IndexParamPortDefinition
```javascript
var format = VideoDecode.component.getParameter(VideoDecode.component.out_port, omx.Index.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
// Outputs
{
  eDir: 1,
  nBufferCountActual: 1,
  nBufferCountMin: 1,
  nBufferSize: 3133440,
  bEnabled: 0,
  bPopulated: 0,
  eDomain: 1,
  video: {
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
}
```

### Project ideas ###
This project was started with the idea of transcoding H.264 videos, converting it to and from JPEGs. But so much more can be done with the OMX library, Please let me know what you are up to and we can write a module to make this task simpler.
Here is a list of ideas, who is interested?
- Video transcoding
- RTSP integration
- FFMPEG integration
- YUV -> RGB conversion
- Remote desktop client or server
- CCTV camera MJPEG -> H.264 and H.264 -> MJPEG
- Video viewer like omxplayer but with complete setting control
- PI Camera
 - Connection, grabbing, encoding
 - Face detection on the PI camera
- Anything with the YUV / RGB stream such as Video analytics

### Why Node ###
The Open MAX library uses heavily Buffers, asynchronous code and this is a perfect fit for Node. Getting emptyBufferDoneCallback and EventPortSettingsChanged right in C is quite difficult. Node pipes have proven to be a good fit for the data flow. Finally, Node is great at networking and lots of OMX buffer in or out are likely to go onto the network.

### NOTES ###
The list of components for the Raspberry PI is at http://home.nouwen.name/RaspberryPi/documentation/ilcomponents/
It has only been tested with the Raspberry PI. If you have another hardware supporting Open MAX, I would love to know.

### Contribute ###
Want to be part of the project? Great! All are welcome! We will get there quicker together :)
Whether you find a bug, have a great feature request feel free to get in touch.
