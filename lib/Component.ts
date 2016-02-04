import omx = require('../');
import stream = require('stream');
import events = require('events');
import utils = require('./utils');
import printEvent = require('./printEvent');
import def = require('./Definitions');
var Promise = require('promise');

var Node_OMX: def.Node_OMX = require('bindings')('Node_OMX');

export class EventHandlers {
  constructor(public eEvent: omx.OMX_EVENTTYPE, public nData1: number, public nData2: number, public fulfill, public reject) {
  }
}

export class Component extends stream.Duplex {
  static isOMXInit: boolean = false;
  in_port: number;
  out_port: number;

  component: def.COMPONENTTYPE = null;
  buf2: Buffer;
  firstReadPacket: boolean = true;
  firstWritePacket: boolean = true;
  hasPortSettingsChanged: boolean = false;
  first_packet: boolean = true;

  useOpenGL = false;
  graphics: omx.Graphics = null;

  in_list: Array<any>;
  out_list: Array<any>;

  constructor(public name: string, public cname?: string) {
    super({
      readableObjectMode: name === 'egl_render'
    });
    this.useOpenGL = name === 'egl_render';
    if (this.cname === undefined) this.cname = this.name;
  }

  init() {
    var self = this;
    if (!Component.isOMXInit) {
      Node_OMX.bcm_host_init();
      Node_OMX.OMX_Init();
      Component.isOMXInit = true;
    }
    this.component = Node_OMX.COMPONENTTYPE(this.name);

    this.component.on('event_handler', function(eEvent: omx.OMX_EVENTTYPE, nData1: number, nData2: number) {
      //      printEvent.log(self.name, eEvent, nData1, nData2);
      //      printEvent.logHandlers(self.registeredEventHandlers);

      for (var i = self.registeredEventHandlers.length - 1; i >= 0; i--) {
        var x = self.registeredEventHandlers[i];

        var isRightEvent = x.eEvent == eEvent && x.nData1 == nData1 && x.nData2 == nData2;
        var isError = eEvent == omx.OMX_EVENTTYPE.OMX_EventError;// && x.nData2 == nData2;

        if (isRightEvent || isError) {
          if (isRightEvent) {
            x.fulfill(self);
          }
          if (isError) {
            x.reject(self, nData1);
          }
          self.registeredEventHandlers.splice(i, 1);
        }
      }

      switch (eEvent) {
        case omx.OMX_EVENTTYPE.OMX_EventPortSettingsChanged:
          this.emit('eventPortSettingsChanged');
          break;
      }

    });

    this.component.on('buffer_done', function(direction, pBuffer) {
      //      console.log('buffer_done', direction, pBuffer);
      if (direction == 0) {
        self.emptyBufferDone();
      } else {
        self.out_list.forEach(function(item, i) {
          if (item !== undefined) {
            if (pBuffer === item.header) {
              item.busy = false;
              self.readDone(item);
              return;
            }
          }
        });
      }
    });

    this.on('pipe', function(source) {
      source.on('portDefinitionChanged', function(portDefinition) {
        var sinkPortDefinition = self.getParameter(self.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);

        if (sinkPortDefinition.eDomain === omx.OMX_PORTDOMAINTYPE.OMX_PortDomainVideo && portDefinition.eDomain === omx.OMX_PORTDOMAINTYPE.OMX_PortDomainVideo) {
          sinkPortDefinition.video = portDefinition.video;
        }
        if (sinkPortDefinition.eDomain === omx.OMX_PORTDOMAINTYPE.OMX_PortDomainImage && portDefinition.eDomain === omx.OMX_PORTDOMAINTYPE.OMX_PortDomainImage) {
          sinkPortDefinition.image = portDefinition.image;
        }
        if (sinkPortDefinition.eDomain === omx.OMX_PORTDOMAINTYPE.OMX_PortDomainImage && portDefinition.eDomain === omx.OMX_PORTDOMAINTYPE.OMX_PortDomainVideo) {
          sinkPortDefinition.image = portDefinition.video;
        }
        if (sinkPortDefinition.eDomain === omx.OMX_PORTDOMAINTYPE.OMX_PortDomainVideo && portDefinition.eDomain === omx.OMX_PORTDOMAINTYPE.OMX_PortDomainImage) {
          sinkPortDefinition.video = portDefinition.image;
        }

        sinkPortDefinition.nBufferSize = portDefinition.nBufferSize;
        self.setParameter(self.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, sinkPortDefinition);
      });
    });


    this.on('finish', function() {
      console.log(self.cname, 'on finish');
      var inputBuffer = self.getInputBuffer();
      if (inputBuffer !== undefined) {
        inputBuffer.header.nFilledLen = 0;
        inputBuffer.header.nFlags = 0x00000001 | 0x00000100; //OMX_BUFFERFLAG_EOS|OMX_BUFFERFLAG_TIME_UNKNOWN;

        self.emptyBuffer(inputBuffer.header)
          .catch(console.log.bind(console));
      }
    });

    //    // Register stream end to push a null buffer down the stream
    //    this.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventBufferFlag, this.out_port, 1).then(function() {
    //      console.log(self.cname, 'on registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventBufferFlag');
    ////      self.push(null);
    //      console.log(self.cname, 'self.push(null)');
    //    });

    return this.disableAllPorts()
      .then(self.changeState(omx.OMX_STATETYPE.OMX_StateIdle));
  }

  static copyAsync(chunk, buf, destnStride, destnSliceHeight, offsetX, offsetY, nStride, width, nSliceHeight, height, callback) {
    return Node_OMX.copyAsync(chunk, buf, destnStride, destnSliceHeight, offsetX, offsetY, nStride, width, nSliceHeight, height, callback);
  }

  registeredEventHandlers: Array<EventHandlers> = [];
  registerEventHandler(eEvent: omx.OMX_EVENTTYPE, nData1: number, nData2: number) {
    var self = this;
    return new Promise(function(fulfill, reject) {
      self.registeredEventHandlers.push(new EventHandlers(eEvent, nData1, nData2, fulfill, reject));
    });
  }

  setPorts(in_port: number, out_port: number) {
    this.in_port = in_port;
    this.out_port = out_port;
  }
  changeState(state: omx.OMX_STATETYPE) {
    this.component.changeState(state);
    return this.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandStateSet, state);
  }
  getState(): omx.OMX_STATETYPE {
    return this.component.getState();
  }
  tunnelTo(out_port: number, sink: any, in_port: number) {
    return this.component.tunnelTo(out_port, sink.component, in_port);
  }
  getParameter(port: number, index: omx.OMX_INDEXTYPE) {
    return this.component.getParameter(port, index);
  }
  setParameter(port: number, index: omx.OMX_INDEXTYPE, format: any) {
    return this.component.setParameter(port, index, format);
  }
  sendCommand(commandType: omx.OMX_COMMANDTYPE, port: number) {
    return this.component.sendCommand(commandType, port);
  }
  disableAllPorts() {
    var self = this;
    var types = [
      omx.OMX_INDEXTYPE.OMX_IndexParamAudioInit,
      omx.OMX_INDEXTYPE.OMX_IndexParamVideoInit,
      omx.OMX_INDEXTYPE.OMX_IndexParamImageInit,
      omx.OMX_INDEXTYPE.OMX_IndexParamOtherInit
    ];

    var self = this;
    for (var i = 0; i < types.length; i++) {
      var ports = self.getParameter(0, types[i]);
      if (ports.nPorts === 0) continue;
      var portsArr = [];
      for (var j = 0; j < ports.nPorts; j++) {
        portsArr.push(self.disablePort(ports.nStartPortNumber + j));
      }
      return Promise.all(portsArr);
    }
  }
  disablePort(port: number) {
    this.sendCommand(omx.OMX_COMMANDTYPE.OMX_CommandPortDisable, port);
    return this.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandPortDisable, port);
  }

  static _id = 0;
  enablePort(port: number, createBuffer: boolean, useOpenGL: boolean) {
    if (createBuffer) {
      var portdef = this.getParameter(port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
      if (portdef.bEnabled != 0 || portdef.nBufferCountActual == 0 || (portdef.nBufferSize == 0 && !useOpenGL)) {
        throw "Cannot enable buffer, wrong buffer";
      }

      var state = this.getState();
      if (!(state == omx.OMX_STATETYPE.OMX_StateIdle || state == omx.OMX_STATETYPE.OMX_StateExecuting || state == omx.OMX_STATETYPE.OMX_StatePause)) {
        throw "Cannot enable buffer, wrong state";
      }
    }

    this.sendCommand(omx.OMX_COMMANDTYPE.OMX_CommandPortEnable, port);

    if (createBuffer) {
      var bufferList = [];
      for (var i = 0; i != portdef.nBufferCountActual; i++) {
        var buf, outputBuffer;
        if (useOpenGL) {
          var texture = new omx.GfxTexture(portdef.video.nFrameWidth, portdef.video.nFrameHeight);
          buf = new omx.EglImage(this.graphics.graphics, texture.texture);
          outputBuffer = this.component.useEGLImage(port, buf.eglImage);
        } else {
          buf = new Buffer(portdef.nBufferSize);

          outputBuffer = this.component.useBuffer(port, buf);
        }
        bufferList.push({
          buf: buf,
          header: outputBuffer,
          busy: false,
          id: Component._id++
        });
      }

      if (portdef.eDir == omx.OMX_DIRTYPE.OMX_DirInput) {
        this.in_list = bufferList;
      }
      else {
        this.out_list = bufferList;
      }
    }

    return this.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandPortEnable, port);
  }
  enableInputPortBuffer() {
    return this.enablePort(this.in_port, true, false);
  }
  enableOutputPortBuffer() {
    return this.enablePort(this.out_port, true, this.useOpenGL);
  }
  enableInputPort() {
    return this.enablePort(this.in_port, false, false);
  }
  enableOutputPort() {
    return this.enablePort(this.out_port, false, false);
  }

  getInputBuffer() {
    if (this.in_list !== undefined) {
      var buf = this.in_list.shift();
      this.in_list.push(buf);
      return buf;
    }
  }
  getOutputBuffer() {
    var self = this;
    return new Promise(function(fulfill, reject) {
      function retry() {
        var buf = undefined;
        for (var i = 0; i < self.out_list.length; i++) {
          if (self.out_list[i].busy === false) {
            buf = self.out_list[i];
            break;
          }
        }
        if (buf === undefined) {
          console.log('retry');
          setTimeout(retry, 1);
        } else {
          console.log('fulfill', buf.id);
          buf.busy = true;
          fulfill(buf);
        }
      }
      retry();
    });
  }

  emptyBufferDone;
  emptyBuffer(header) {
    var self = this;
    this.component.emptyBuffer(header);
    return new Promise(function(fulfill, reject) {
      self.emptyBufferDone = fulfill;
    });
  }
  fillBufferDone;
  fillBuffer(header) {
    var self = this;
    this.component.fillBuffer(header);
    return new Promise(function(fulfill, reject) {
      self.fillBufferDone = fulfill;
    });
  }

  tunnel(nextComponent) {
    var self = this;

    this.component.on("eventPortSettingsChanged", function() {
      console.log('eventPortSettingsChanged', self.cname, self.component);

      if (self.getState() === omx.OMX_STATETYPE.OMX_StateLoaded) {
        self.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
      }

      self.tunnelTo(self.out_port, nextComponent, nextComponent.in_port);

      var sourcePortPromise = self.enableOutputPort();
      var sinkPortPromise = nextComponent.enableInputPort();

      if (nextComponent.getState() === omx.OMX_STATETYPE.OMX_StateLoaded) {
        console.log('Error: nextComponent OMX_StateLoaded');
      }

      sinkPortPromise.then(function() {
        return sourcePortPromise;
      }).then(function() {
        nextComponent.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
      });
    });


    this.on('finish', function() {
      //      console.log('Component on finish');
      //      console.log('TUNNEL.flush');
      //      TUNNEL.flush();
      //      console.log('disableInputPortBuffer');
      //      //    self.component.disableInputPortBuffer();
      //      console.log('disable');
      //      TUNNEL.disable();
      //      console.log('teardown');
      //      TUNNEL.teardown();
      //      console.log('teardown complete');

      nextComponent.emit('finish');
    });

    return nextComponent;
  }

  initRead() {
    var self = this;
    if (this.firstReadPacket) {
      this.firstReadPacket = false;
      return this.enableOutputPortBuffer()
        .then(function() {
          if (self.getState() !== omx.OMX_STATETYPE.OMX_StateExecuting) {
            return self.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
          }
        });
    } else {
      return Promise.resolve();
    }
  }
  readDone(outputBuffer) {
    var self = this;
    var buffer: Buffer = outputBuffer.buf;

    // Catch EOF
    if (outputBuffer.header.nFlags & 0x00000001/*OMX_BUFFERFLAG_EOS*/) {
      this.push(null);
      return;
    } else {
      buffer.onBufferDone = function() {
        self.fillBuffer(outputBuffer.header);
      };
    }
    this.push(buffer);
  }
  _read() {
    //    console.log('_read', this.cname);
    var self = this;

    function read() {
      //      console.log('read', self.cname);
      self.initRead()
        .then(function() {
          for (var i = 0; i < self.out_list.length; i++) {
            self.fillBuffer(self.out_list[i].header);
          }
        })
        .catch(console.log.bind(console));
    }

    if (this.hasPortSettingsChanged) {

    } else {
      this.component.on("eventPortSettingsChanged", function() {
        console.log(self.name, 'eventPortSettingsChanged');
        self.hasPortSettingsChanged = true;
        var portDefinition = self.component.getParameter(self.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
        self.emit('portDefinitionChanged', portDefinition);
        read();
      });
    }
  }

  writeRecursive(chunk: Buffer, offset: number) {
    "use strict";
    var self = this;

    var inputBuffer = this.getInputBuffer();
    var inputBufferLength = inputBuffer.header.nAllocLen;

    var lastPacket = chunk.length <= offset + inputBufferLength;

    var slice = chunk.slice(offset, offset + inputBufferLength);
    slice.copy(inputBuffer.buf, 0, 0, inputBufferLength);
    inputBuffer.header.nFilledLen = chunk.length;
    if (this.first_packet) {
      inputBuffer.header.nFlags = 0x00000002; //OMX_BUFFERFLAG_STARTTIME;
      this.first_packet = false;
    } else {
      inputBuffer.header.nFlags = 0x00000100; //OMX_BUFFERFLAG_TIME_UNKNOWN;
    }

    if (this.cname === "image_decode" && lastPacket) {
      inputBuffer.header.nFlags |= 0x00000001; //OMX_BUFFERFLAG_EOS;
    }

    return this.emptyBuffer(inputBuffer.header)
      .then(function() {
        if (!lastPacket) {
          // Buffer too small
          return self.writeRecursive(chunk, offset + inputBufferLength);
        } else {
          if (chunk.onBufferDone) { chunk.onBufferDone(); }
          return Promise.resolve();
        }
      })
      .catch(console.log.bind(console));
  }

  initWrite() {
    var self = this;
    if (this.firstWritePacket) {
      this.firstWritePacket = false;
      return this.enableInputPortBuffer()
        .then(function() {
          if (self.getState() !== omx.OMX_STATETYPE.OMX_StateExecuting) {
            return self.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
          } else {
            return Promise.resolve();
          }
        })
        .then(function() {
          // Empty a dummy packet to fix the bug where the video_render doesn't call buffer done on the first packet
          if (self.cname === "video_render") {
            var inputBuffer = self.getInputBuffer();
            inputBuffer.header.nFilledLen = 0;
            self.emptyBuffer(inputBuffer.header)//Does not wait for it as the ack will never come
          }
          return Promise.resolve();
        })
        .catch(console.log.bind(console));
    } else {
      return Promise.resolve();
    }
  }
  _write(chunk: Buffer, enc, next: () => void) {
    //    console.log('_write', chunk.length, this.cname);
    var self = this;

    this.initWrite()
      .then(function() {
        return self.writeRecursive(chunk, 0);
      })
      .then(next)
      .catch(console.log.bind(console));

  }
}
utils.inherits(Node_OMX.COMPONENTTYPE, events.EventEmitter);
