# Node-OMX

Using the OMX library in C can be tricky and be a painful experience. I wanted a library which can greatly simplify the process while allowing me to modify any settings such as the H.264 I-frame interval and qp parameter. With this library, any OMX components can be linked with any other components with hardware tunnel or software Node Buffers. With the buffers, we can do data manipulation directly in Node.

The goal of this library is to:
- Provide a complete wrapper of the OpenMAX https://www.khronos.org/openmax/ library with auto-generated functions and headers with code signature similar to the C code.
- Add JavaScript modules to link user code and OpenMAX
- Use Node pipes to provide an efficient and simple transport between OMX components.

### Install ###
```
npm install
```

### Run samples ###
```
node examples/SimpleVideoDecoderRenderTunnel
node examples/SimpleVideoDecoderBuffer
node examples/SimpleVideoDecoderRenderBuffer
```

### Test with jasmine ###
```
npm test
```

### Why Node ###
The Open MAX library uses heavily Buffers, asynchronous code and this is a perfect fit for Node. Getting emptyBufferDoneCallback and EventPortSettingsChanged right in C is quite difficult. Node pipes have proven to be a good fit for the data flow. Finally, Node is great at networking and lots of OMX buffer in or out are likely to go onto the network.

### NOTES ###
The list of components for the Raspberry PI is at http://home.nouwen.name/RaspberryPi/documentation/ilcomponents/
It has only been tested with the Raspberry PI. If you have another hardware supporting Open MAX, I would love to know.

### Contribute ###
Want to be part of the project? Great! All are welcome! We will get there quicker together :)
Whether you find a bug, have a great feature request feel free to get in touch.
