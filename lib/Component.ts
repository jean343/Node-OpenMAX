import omx = require('../');
import stream = require('stream');
import events = require('events');
import utils = require('./utils');
import printEvent = require('./printEvent');
var Promise = require('promise');

var Node_OMX = require('bindings')('Node_OMX');

export class EventHandlers {
  constructor(public eEvent: omx.OMX_EVENTTYPE, public nData1: number, public nData2: number, public callback: () => any) {
  }
}

export class Component extends stream.Duplex {
  static isOMXInit: boolean = false;
  in_port: number;
  out_port: number;

  component: any;
  buf2: Buffer;
  firstReadPacket: boolean;
  firstWritePacket: boolean;
  hasPortSettingsChanged: boolean;
  hasFinished: boolean;

  constructor(public name: string) {
    super();
    this.component = null;

    this.firstReadPacket = true;
    this.firstWritePacket = true;
    this.hasPortSettingsChanged = false;
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
      printEvent.log(self.name, eEvent, nData1, nData2);

      printEvent.logHandlers(self.registeredEventHandlers);
      for (var i = self.registeredEventHandlers.length - 1; i >= 0; i--) {
        var x = self.registeredEventHandlers[i];

        var isRightEvent = x.eEvent == eEvent && x.nData1 == nData1 && x.nData2 == nData2;
        var isError = eEvent == omx.OMX_EVENTTYPE.OMX_EventError;// && x.nData2 == nData2;

        if (isRightEvent || isError) {
          x.callback();
          self.registeredEventHandlers.splice(i, 1);
        }
      }

    });

    return this.disableAllPorts()
      .then(self.changeState(omx.OMX_STATETYPE.OMX_StateIdle));
        
          
    //            function(res) {
    //        console.log('disableAllPorts done');
    //        self.changeState(omx.OMX_STATETYPE.OMX_StateIdle, function() {
    //
    //        });
    //      });


    /*this.on('pipe', function (source) {
      source.on('portDefinitionChanged', function (portDefinition) {
        var sinkPortDefinition = self.component.getParameter(self.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);

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
        self.component.setParameter(self.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, sinkPortDefinition);
      });
    });


    this.on('finish', function () {
      console.log(self.name, 'on finish');
      self.hasFinished = true;
    });
    this.on('end', function () {
      console.log(self.name, 'on end');
    });*/
  }

  registeredEventHandlers: Array<EventHandlers> = [];
  registerEventHandler(eEvent: omx.OMX_EVENTTYPE, nData1: number, nData2: number, callback: () => any) {
    this.registeredEventHandlers.push(new EventHandlers(eEvent, nData1, nData2, callback));
  }

  setPorts(in_port: number, out_port: number) {
    this.in_port = in_port;
    this.out_port = out_port;
  }
  changeState(state: omx.OMX_STATETYPE) {
    var self = this;
    return new Promise(function(fulfill, reject) {
      self.component.changeState(state);
      self.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandStateSet, state, function() {
        console.log('fulfill', state);
        fulfill();
      });
//      self.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventError, omx.OMX_ERRORTYPE.OMX_ErrorIncorrectStateOperation, state, function() {
//        console.log('reject', state);
//        reject();
//      });
    });
  }
  getState(): omx.OMX_STATETYPE {
    return this.component.getState();
  }
  getParameter(port: number, index: omx.OMX_INDEXTYPE) {
    return this.component.getParameter(port, index);
  }
  setParameter(port: number, index: omx.OMX_INDEXTYPE, format: any) {
    return this.component.setParameter(port, index, format);
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
    var self = this;
    return new Promise(function(fulfill, reject) {
      self.registerEventHandler(omx.OMX_EVENTTYPE.OMX_EventCmdComplete, omx.OMX_COMMANDTYPE.OMX_CommandPortDisable, port, function() {
        fulfill(port);
      });
      self.component.disablePort(port);
    });
  }

  /*tunnel (nextComponent) {
    var self = this;
    var TUNNEL = Node_OMX.TUNNEL(this.component, nextComponent.component);

    this.component.on("eventPortSettingsChanged", function () {
      console.log('eventPortSettingsChanged', self.name, self.component);

      var sourceDef = self.component.getParameter(self.component.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
      var sinkDef = nextComponent.component.getParameter(nextComponent.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);

      sinkDef.video = sourceDef.video;
      sinkDef.nBufferSize = sourceDef.nBufferSize;

      nextComponent.component.setParameter(nextComponent.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition, sinkDef);

      TUNNEL.enable();
      nextComponent.component.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
    });


    this.on('finish', function () {
      console.log('Component on finish');
      console.log('TUNNEL.flush');
      TUNNEL.flush();
      console.log('disableInputPortBuffer');
  //    self.component.disableInputPortBuffer();
      console.log('disable');
      TUNNEL.disable();
      console.log('teardown');
      TUNNEL.teardown();
      console.log('teardown complete');

      nextComponent.emit('finish');
    });

    return nextComponent;
  }*/

  /*_read () {
    var self = this;

    function read() {
      //console.log('read', self.name);
      if (self.firstReadPacket) {
        self.firstReadPacket = false;
        self.component.enableOutputPortBuffer();
        if (self.component.getState() !== omx.OMX_STATETYPE.OMX_StateExecuting) {
          self.component.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
        }
      }

      var outputBuffer = self.component.getOutputBuffer(omx.BLOCK_TYPE.DO_BLOCK);
      self.component.fillBuffer(outputBuffer, function () {
        if (self.hasFinished) {
          return; // Warning, this might prune the last image
        }
        var buffer = outputBuffer.get();

        if (self.buf2 === undefined || self.buf2.length < buffer.length) {
          self.buf2 = new Buffer(buffer.length);
        }
        buffer.copy(self.buf2, 0, 0, buffer.length); // I am copying the buffer since outputBuffer.get shares the buffer with getOutputBuffer

        self.push(self.buf2.slice(0, buffer.length));
      });
    }

    if (this.hasPortSettingsChanged) {
      read();
    } else {
      this.component.on("eventPortSettingsChanged", function () {
        console.log('eventPortSettingsChanged');
        self.hasPortSettingsChanged = true;
        var portDefinition = self.component.getParameter(self.component.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
        self.emit('portDefinitionChanged', portDefinition);
        read();
      });
    }
  }

  writeRecursive (chunk: Buffer, offset: number, next: () => void) {
    "use strict";
    var self = this;

    var inputBuffer = this.component.getInputBuffer(omx.BLOCK_TYPE.DO_BLOCK);
    var inputBufferLength = inputBuffer.nAllocLen;

    var lastPacket = chunk.length <= offset + inputBufferLength;

    // In the case of the image_decode, we need the lastPacket flag (OMX_BUFFERFLAG_EOS) to be set after each chunk
    inputBuffer.set(chunk.slice(offset), this.name === "image_decode" ? lastPacket : false);
    var timeout = setTimeout(next, 100);//Timeout for empty buffer callback

    this.component.emptyBuffer(inputBuffer, function () {
      clearTimeout(timeout);

      if (!lastPacket) {
        // Buffer too small
        self.writeRecursive(chunk, offset + inputBufferLength, next);
      } else {
        next();
      }
    });
  }

  _write (chunk: Buffer, enc, next: () => void) {
    if (this.firstWritePacket) {
      this.firstWritePacket = false;
      this.component.enableInputPortBuffer();

      if (this.component.getState() !== omx.OMX_STATETYPE.OMX_StateExecuting) {
        this.component.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
      }
    }

    this.writeRecursive(chunk, 0, next);
  }*/
}
utils.inherits(Node_OMX.COMPONENTTYPE, events.EventEmitter);
