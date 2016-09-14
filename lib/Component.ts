import omx = require('../');
import stream = require('stream');
import events = require('events');
import utils = require('./utils');
import printEvent = require('./printEvent');
import def = require('./Definitions');
import Promise = require('promise');

var Node_OMX: def.Node_OMX = require('bindings')('Node_OMX');

export enum VERBOSE_LEVEL {
  None,
  Info,
  Debug,
  Stack
}

export class EventHandlers {
  constructor(public eEvent: omx.OMX_EVENTTYPE, public nData1: number, public nData2: number, public fulfill, public reject, public stack?) {
  }
}

export class Component extends stream.Duplex {
  static isOMXInit: boolean = false;
  static verbose: VERBOSE_LEVEL = VERBOSE_LEVEL.None;
  static logComponent: string = null;
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

  autoClose = true;
  closingPromise = null;
  closed = false;

  in_list: Array<any>;
  out_list: Array<any>;

  constructor(public name: string, public cname?: string) {
    super({
      readableObjectMode: name === 'egl_render'
    });
    this.useOpenGL = name === 'egl_render';
    if (this.cname === undefined) this.cname = this.name;
  }

  log(level: VERBOSE_LEVEL, args: any[]) {
    if (level <= Component.verbose) {
      if (Component.logComponent === null || Component.logComponent === this.cname) {
        Array.prototype.unshift.call(args, this.cname);
        Array.prototype.unshift.call(args, '  '.repeat(level - 1));
        console.log.apply(console, args);
      }
    }
  }
  info(...optionalParams: any[]) {
    this.log(VERBOSE_LEVEL.Info, arguments);
  }
  debug(...optionalParams: any[]) {
    this.log(VERBOSE_LEVEL.Debug, arguments);
  }

  init() {
    return new Promise((fulfill, reject) => {
      this.initHost();
      this.component = Node_OMX.COMPONENTTYPE(this.name, this.componentEventHandler.bind(this), this.bufferDone.bind(this));
      this.registerComponentPipe();
      this.registerOnFinish();

      fulfill();
    })
      .then(() => {
        return this.disableAllPorts();
      })
      .then(() => {
        return this.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
      });
  }

  static initAll(components) {
    return Promise.all(components.map((component: omx.Component) => {
      return component.init();
    }));
  }

  initHost() {
    if (!Component.isOMXInit) {
      Node_OMX.bcm_host_init();
      Node_OMX.OMX_Init();
      Component.isOMXInit = true;
      //do something when app is closing
      process.on('exit', this.exitHandler.bind(null, true, false, 'exit')); // This must be null to prevent memory leak

      //catches ctrl+c event
      process.on('SIGINT', this.exitHandler.bind(null, false, true, 'SIGINT'));

      //catches uncaught exceptions
      process.on('uncaughtException', this.exitHandler.bind(null, false, true, 'uncaughtException'));
    }
  }
  exitHandler(cleanup, exit, type_str, err) {
    if (cleanup) {
      console.log('Quit on', type_str, err);
      Node_OMX.OMX_Deinit();
      Node_OMX.bcm_host_deinit();
    }
    if (exit) {
      process.exit();
    }
  }

  componentEventHandler(eEvent: omx.OMX_EVENTTYPE, nData1: number, nData2: number) {
    //    printEvent.log(this.name, eEvent, nData1, nData2);
    //      printEvent.logHandlers(this.registeredEventHandlers);

    for (var i = this.registeredEventHandlers.length - 1; i >= 0; i--) {
      var x = this.registeredEventHandlers[i];

      var isRightEvent = x.eEvent == eEvent && x.nData1 == nData1 && x.nData2 == nData2;
      var isError = eEvent == omx.OMX_EVENTTYPE.OMX_EventError;// && x.nData2 == nData2;

      if (isRightEvent || isError) {
        if (isRightEvent) {
          x.fulfill(this);
        }
        if (isError) {
          if (x.stack) {
            console.error(x.stack);
          }
          x.reject(nData1);
        }
        this.registeredEventHandlers.splice(i, 1);
      }
    }

    switch (eEvent) {
      case omx.OMX_EVENTTYPE.OMX_EventPortSettingsChanged:
        this.component.emit('eventPortSettingsChanged');
        break;
    }
  }

  bufferDone(direction, pBuffer) {
    if (direction == 0) {
      this.debug('buffer_done', direction === 0 ? 'empty' : 'fill');
      this.emptyBufferDone();
    } else {
      this.out_list.forEach((item, i) => {
        if (item !== undefined) {
          if (pBuffer === item.header) {
            this.debug('buffer_done', direction === 0 ? 'empty' : 'fill', item.id);
            this.readDone(item);
            return;
          }
        }
      });
    }
  }

  registerComponentPipe() {
    this.on('pipe', (source) => {
      source.on('portDefinitionChanged', (portDefinition) => {
        var sinkPortDefinition = this.getParameter(this.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);

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
        this.setParameter(this.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, sinkPortDefinition);
      });
    });
  }

  registerOnFinish() {
    this.on('finish', () => {
      this.info('on finish');
      var inputBuffer = this.getInputBuffer();
      if (inputBuffer !== undefined) {
        inputBuffer.header.nFilledLen = 0;
        inputBuffer.header.nFlags = 0x00000001 | 0x00000100; //OMX_BUFFERFLAG_EOS|OMX_BUFFERFLAG_TIME_UNKNOWN;

        this.emptyBuffer(inputBuffer.header)
          .then(() => {
            if (this.out_port === 0) { // Output node
              if (this.autoClose) {
                this.close();
              }
            }
          })
          .catch(console.log.bind(console));
      }

      setTimeout(() => { }, 1000);
    });
  }

  static copyAsync(chunk, buf, destnStride, destnSliceHeight, offsetX, offsetY, nStride, width, nSliceHeight, height, callback) {
    return Node_OMX.copyAsync(chunk, buf, destnStride, destnSliceHeight, offsetX, offsetY, nStride, width, nSliceHeight, height, callback);
  }

  close() {
    if (this.closingPromise) {
      return this.closingPromise;
    }
    this.info('close');
    this.closingPromise = this.flush()
      .then(() => {
        this.debug('flush done');
        return this.disablePortBuffers([this.in_port, this.out_port])
      })
      .then(() => {
        this.debug('disablePortBuffers done');
        this.tunnelTo(this.in_port);
        this.tunnelTo(this.out_port);
        return Promise.resolve()
      })
      .then(() => {
        this.debug('teardown tunnel done');
        if (this.getState() !== omx.OMX_STATETYPE.OMX_StateIdle && this.getState() !== omx.OMX_STATETYPE.OMX_StateLoaded) {
          return this.changeState(omx.OMX_STATETYPE.OMX_StateIdle)
        } else {
          return Promise.resolve();
        }
      })
      .then(() => {
        this.debug('changeState OMX_StateIdle done', this.getState());
        return new Promise((fulfill, reject) => {
          return this.changeState(omx.OMX_STATETYPE.OMX_StateLoaded).then(fulfill, fulfill);
        });
      })
      .then(() => {
        this.debug('changeState OMX_StateLoaded done');
        this.component.close();
      })
      .then(() => {
        this.push(null);
        this.closed = true;
      })
      .catch(console.log.bind(console, "Error:"));
    return this.closingPromise;
  }

  registeredEventHandlers: Array<EventHandlers> = [];
  registerEventHandler(eEvent: omx.OMX_EVENTTYPE, nData1: number, nData2: number) {
    var stack;
    if (Component.verbose >= VERBOSE_LEVEL.Stack) {
      var err = new Error;
      stack = err.stack;
    }
    return new Promise((fulfill, reject) => {
      this.registeredEventHandlers.push(new EventHandlers(eEvent, nData1, nData2, fulfill, reject, stack));
    });
  }

  setPorts(in_port: number, out_port: number) {
    this.in_port = in_port;
    this.out_port = out_port;
  }
  changeState(state: omx.OMX_STATETYPE) {
    this.debug("Change state from", this.getState(), 'to', state)
    this.sendCommand(omx.OMX_COMMANDTYPE.OMX_CommandStateSet, state);
    return this.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandStateSet, state);
  }
  getState(): omx.OMX_STATETYPE {
    return this.component.getState();
  }
  tunnelTo(out_port: number, sink?: Component, in_port?: number) {
    if (!out_port) return;
    if (sink) {
      this.info('tunnel from', this.cname, out_port, 'to', sink.cname, in_port);
      return this.component.tunnelTo(out_port, sink.component, in_port);
    } else {
      this.info('destroy tunnel from', this.cname, out_port);
      return this.component.tunnelTo(out_port, undefined, 0);
    }
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
    var types = [
      omx.OMX_INDEXTYPE.OMX_IndexParamAudioInit,
      omx.OMX_INDEXTYPE.OMX_IndexParamVideoInit,
      omx.OMX_INDEXTYPE.OMX_IndexParamImageInit,
      omx.OMX_INDEXTYPE.OMX_IndexParamOtherInit
    ];

    var portsArr = [];
    for (var i = 0; i < types.length; i++) {
      var ports = this.getParameter(0, types[i]);
      if (ports.nPorts === 0) continue;
      for (var j = 0; j < ports.nPorts; j++) {
        portsArr.push(this.disablePort(ports.nStartPortNumber + j));
      }
    }
    return Promise.all(portsArr);
  }

  flush(ports?: Array<number>) {
    this.debug('flush');

    if (!ports) ports = [this.in_port, this.out_port];

    var promises = ports.map((port) => {
      if (port) {
        var portdef = this.getParameter(port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
        if (portdef.bEnabled == 0 || portdef.nBufferCountActual == 0 || portdef.nBufferSize == 0) {
          return Promise.resolve();
        }
        this.sendCommand(omx.OMX_COMMANDTYPE.OMX_CommandFlush, port);
        return this.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandFlush, port);
      }
    });

    return Promise.all(promises);
  }

  disablePort(port: number) {
    this.debug('disablePort', port);
    this.sendCommand(omx.OMX_COMMANDTYPE.OMX_CommandPortDisable, port);
    return this.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandPortDisable, port);
  }
  disablePortBuffers(ports: Array<number>) {
    this.debug('disablePortBuffers', ports);

    var promises = ports.map((port) => {
      if (port) {
        var portdef = this.getParameter(port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
        if (portdef.bEnabled == 0 || portdef.nBufferCountActual == 0 || portdef.nBufferSize == 0) {
          return Promise.resolve();
        }
        this.sendCommand(omx.OMX_COMMANDTYPE.OMX_CommandPortDisable, port);

        var list;
        list = portdef.eDir == omx.OMX_DIRTYPE.OMX_DirInput ? this.in_list : this.out_list;
        if (list !== undefined) {
          list.forEach((item, i) => {
            this.component.freeBuffer(port, item.header);
          });
        }

        return this.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandPortDisable, port);
      }
    });

    return Promise.all(promises);
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
          this.debug('useEGLImage', this.name, port, buf.eglImage);
        } else {
          buf = new Buffer(portdef.nBufferSize);

          outputBuffer = this.component.useBuffer(port, buf);
          this.debug('useBuffer', this.name, port, buf);
        }
        bufferList.push({
          buf: buf,
          header: outputBuffer,
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
    this.debug('enableInputPortBuffer', this.in_port);
    return this.enablePort(this.in_port, true, false);
  }
  enableOutputPortBuffer() {
    this.debug('enableOutputPortBuffer', this.out_port, this.useOpenGL);
    return this.enablePort(this.out_port, true, this.useOpenGL);
  }
  enableInputPort() {
    this.debug('enableInputPort', this.in_port);
    return this.enablePort(this.in_port, false, false);
  }
  enableOutputPort() {
    this.debug('enableOutputPort', this.out_port);
    return this.enablePort(this.out_port, false, false);
  }

  getInputBuffer() {
    if (this.in_list !== undefined) {
      var buf = this.in_list.shift();
      this.in_list.push(buf);
      return buf;
    }
  }

  emptyBufferDone;
  emptyBuffer(header) {
    return new Promise((fulfill, reject) => {
      this.emptyBufferDone = fulfill;
      this.component.emptyBufferAsync(header, function() {
      });
    });
  }
  fillBuffer(header) {
    return new Promise((fulfill, reject) => {
      this.component.fillBufferAsync(header, function() {
        fulfill();
      });
    });
  }

  doTunnel(nextComponent: Component) {
    this.info('tunnel eventPortSettingsChanged');

    if (this.getState() === omx.OMX_STATETYPE.OMX_StateLoaded) {
      this.debug('tunnel changeState OMX_StateIdle');
      this.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
    }

    this.tunnelTo(this.out_port, nextComponent, nextComponent.in_port);

    var sourcePortPromise = this.enableOutputPort();
    var sinkPortPromise = nextComponent.enableInputPort();

    if (nextComponent.getState() === omx.OMX_STATETYPE.OMX_StateLoaded) {
      this.info('Error: nextComponent OMX_StateLoaded');
    }

    sinkPortPromise
      .then(function() {
        return sourcePortPromise;
      })
      .then(() => {
        this.debug('tunnel changeState OMX_StateExecuting', nextComponent.cname);
        nextComponent.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
        this.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
      })
      .catch(console.log.bind(console));
  }
  tunnel(nextComponent: Component) {
    if (this.name === "video_decode") {
      this.component.on("eventPortSettingsChanged", () => {
        this.doTunnel(nextComponent);
      });
    } else {
      this.doTunnel(nextComponent);
    }

    this.on('finish', () => {
      this.info("Tunnel on finish")
      this.close();
    });

    return nextComponent;
  }

  initRead() {
    if (this.firstReadPacket) {
      this.debug('initRead firstReadPacket');
      this.firstReadPacket = false;
      return this.enableOutputPortBuffer()
        .then(() => {
          if (this.getState() !== omx.OMX_STATETYPE.OMX_StateExecuting) {
            this.debug('initRead changeState OMX_StateExecuting');
            return this.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
          }
        })
        .catch(console.log.bind(console));
    } else {
      return Promise.resolve();
    }
  }
  readDone(outputBuffer) {
    var buffer: Buffer = outputBuffer.buf;

    // Catch EOF
    if (outputBuffer.header.nFlags & 0x00000001/*OMX_BUFFERFLAG_EOS*/) {
      this.info("Received OMX_BUFFERFLAG_EOS");
      if (this.autoClose) {
        this.close();
      }

      return;
    } else {
      buffer.onBufferDone = () => {
        this.fillBuffer(outputBuffer.header);
      };
    }
    this.push(buffer);
  }
  readyToRead() {
    this.info('_read eventPortSettingsChanged');
    this.hasPortSettingsChanged = true;
    var portDefinition = this.component.getParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
    this.debug('_read portDefinition', portDefinition);
    this.emit('portDefinitionChanged', portDefinition);

    this.initRead()
      .then(() => {
        this.debug('initRead done');
        for (var i = 0; i < this.out_list.length; i++) {
          this.fillBuffer(this.out_list[i].header);
        }
      })
      .catch(console.log.bind(console));
  }
  _read() {
    this.debug('_read');

    if (!this.hasPortSettingsChanged) {
      if (this.name === "video_decode") {
        this.component.on("eventPortSettingsChanged", this.readyToRead.bind(this));
      } else {
        this.readyToRead();
      }
    }
  }
  writeRecursive(chunk: Buffer, offset: number) {
    "use strict";

    this.debug('writeRecursive', chunk.length, offset);

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

    if (this.name === "image_decode" && lastPacket) {
      inputBuffer.header.nFlags |= 0x00000001; //OMX_BUFFERFLAG_EOS;
    }

    this.debug('emptyBuffer');
    return this.emptyBuffer(inputBuffer.header)
      .then(() => {
        this.debug('emptyBuffer then');
        if (!lastPacket) {
          this.info('Buffer too small');
          // Buffer too small
          return this.writeRecursive(chunk, offset + inputBufferLength);
        } else {
          if (chunk.onBufferDone) { chunk.onBufferDone(); }
          return Promise.resolve();
        }
      })
      .catch(console.log.bind(console));
  }

  initWrite() {
    if (this.firstWritePacket) {
      this.firstWritePacket = false;
      return this.enableInputPortBuffer()
        .then(() => {
          if (this.getState() !== omx.OMX_STATETYPE.OMX_StateExecuting) {
            return this.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
          } else {
            return Promise.resolve();
          }
        })
        .then(() => {
          // Empty a dummy packet to fix the bug where the video_render doesn't call buffer done on the first packet
          if (this.name === "video_render") {
            var inputBuffer = this.getInputBuffer();
            inputBuffer.header.nFilledLen = 0;
            this.emptyBuffer(inputBuffer.header)//Does not wait for it as the ack will never come
          }
          return Promise.resolve();
        })
        .catch(console.log.bind(console));
    } else {
      return Promise.resolve();
    }
  }
  _write(chunk: Buffer, enc, next: () => void) {
    this.debug('_write', chunk.length);

    this.initWrite()
      .then(() => {
        return this.writeRecursive(chunk, 0);
      })
      .then(next)
      .catch(console.log.bind(console));

  }
}
utils.inherits(Node_OMX.COMPONENTTYPE, events.EventEmitter);
