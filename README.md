# Node-OMX

Using the OMX library in C can be tricky and be a painful experience. I wanted a library which can greatly simplify the process while allowing me to modify any settings such as the H.264 I-frame interval and qp parameter. With this library, any OMX components can be linked with any other components with hardware tunnel or software Node Buffers. With the buffers, we can do data manipulation directly in Node.

The goal of this library is to:
- Provide a complete wrapper of the OpenMAX https://www.khronos.org/openmax/ library with auto-generated functions and headers with code signature similar to the C code.
- Add JavaScript modules to link user code and OpenMAX
- Use Node Streams to provide an efficient and simple transport between OMX components.

### Install ###
```
npm install
```

### Run samples ###

Example to read an H.264 file, decode it using video_decode and tunnel it to the video_render.
```
node examples/SimpleVideoDecoderRenderTunnel
```

Example to pipe the RAW YUV to a custom Node.js Stream.
```
node examples/SimpleVideoDecoderBuffer
```

Example to pipe the RAW YUV to a custom Node.js Duplex Stream, do in-memory YUV manipulation the pipe the result to the monitor.
```
node examples/SimpleVideoDecoderRenderBuffer
```

This example can be run with pipe or tunnel, the tunnel is faster as the intermediate RAW data doesn't touch Node.
Decodes an H.264 stream, encode it using custom settings of constant QP, write the result to a file then decode this result and display on the screen.
```
node examples/SimpleDecoderEncoder
```

### Test with jasmine ###
```
npm test
```

### Code samples ###
Pipe a file into a VideoDecode then tunnel to the Render
```
fs.createReadStream("spec/video-LQ.h264")
  .pipe(VideoDecode)
  .tunnel(VideoRender);
```

Pipe a file to a VideoDecoder, encode it, write the result to a file, decode the result and display it.
```
fs.createReadStream("spec/video-LQ.h264")
  .pipe(VideoDecode1)
  .tunnel(VideoEncode)
  .pipe(WriteFileFilter)
  .pipe(VideoDecode2)
  .tunnel(VideoRender);
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
