import omx = require('../');
import stream = require('stream');
import events = require('events');
import utils = require('./utils');

var Node_OMX = require('bindings')('Node_OMX');

export class Component extends stream.Duplex {
  ILCLIENT: any;
  component: any;
  buf2: Buffer;
  firstReadPacket: boolean;
  firstWritePacket: boolean;
  hasPortSettingsChanged: boolean;
  hasFinished : boolean;

  constructor(public name: string) {
    super();
    this.component = null;

    this.firstReadPacket = true;
    this.firstWritePacket = true;
    this.hasPortSettingsChanged = false;
  }

  init (flags: omx.ILCLIENT_CREATE_FLAGS) {
    var self = this;
    Node_OMX.bcm_host_init();
    this.ILCLIENT = Node_OMX.ILCLIENT();

    this.component = Node_OMX.COMPONENT(this.ILCLIENT, this.name, flags);
    this.component.changeState(omx.OMX_STATETYPE.OMX_StateIdle);

    this.on('pipe', function (source) {
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
    });
  }

  setPorts (in_port: number, out_port: number) {
    this.component.setPorts(in_port, out_port);
  }

  tunnel (nextComponent) {
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
  }

  _read () {
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
  }
}
utils.inherits(Node_OMX.COMPONENT, events.EventEmitter);
