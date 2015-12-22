var omx = require('../');

var Duplex = require('stream').Duplex;
var utils = require('./utils');
var util = require('util');
var Node_OMX = require('bindings')('Node_OMX');
var EventEmitter = require('events').EventEmitter;
var OMX_STATETYPE = omx.Core.OMX_STATETYPE;
var OMX_INDEXTYPE = omx.Index.OMX_INDEXTYPE;
var BLOCK_TYPE = omx.BLOCK_TYPE;

utils.inherits(Node_OMX.COMPONENT, EventEmitter);

function Component(name) {
  if (!(this instanceof Component)) {
    return new Component(name, flags);
  }
  this.name = name;
  this.component = null;

  this.firstReadPacket = true;
  this.firstWritePacket = true;
  this.hasPortSettingsChanged = false;

  Duplex.call(this, undefined);
}

util.inherits(Component, Duplex);

Component.prototype.init = function (flags) {
  var self = this;
  Node_OMX.bcm_host_init();
  this.ILCLIENT = Node_OMX.ILCLIENT();

  this.component = Node_OMX.COMPONENT(this.ILCLIENT, this.name, flags);
  this.component.changeState(OMX_STATETYPE.OMX_StateIdle);



  this.on('pipe', function (source) {
    source.on('portDefinitionChanged', function (portDefinition) {
      console.log('portDefinitionChanged');
      var rendererPortDefinition = self.component.getParameter(self.component.in_port, OMX_INDEXTYPE.OMX_IndexParamPortDefinition);

      rendererPortDefinition.video = portDefinition.video;
      rendererPortDefinition.nBufferSize = portDefinition.nBufferSize;
      self.component.setParameter(self.component.in_port, OMX_INDEXTYPE.OMX_IndexParamPortDefinition, rendererPortDefinition);
    });
  });
};

Component.prototype.setPorts = function (in_port, out_port) {
  this.component.setPorts(in_port, out_port);
};

Component.prototype.tunnel = function (nextComponent) {
  var self = this;
  var TUNNEL = Node_OMX.TUNNEL(this.component, nextComponent.component);

  this.component.on("eventPortSettingsChanged", function () {
    TUNNEL.enable();
    nextComponent.component.changeState(OMX_STATETYPE.OMX_StateExecuting);
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
};

Component.prototype._read = function () {
  var self = this;

  function read() {
    if (self.firstReadPacket) {
      self.firstReadPacket = false;
      self.component.enableOutputPortBuffer();
      if (self.component.getState() !== OMX_STATETYPE.OMX_StateExecuting) {
        self.component.changeState(OMX_STATETYPE.OMX_StateExecuting);
      }
    }

    var outputBuffer = self.component.getOutputBuffer(BLOCK_TYPE.DO_BLOCK);
    self.component.fillBuffer(outputBuffer, function () {
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
      var portDefinition = self.component.getParameter(self.component.out_port, OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
      self.emit('portDefinitionChanged', portDefinition);
      read();
    });
  }
};

Component.prototype._write = function (chunk, enc, next) {
  if (this.firstWritePacket) {
    this.firstWritePacket = false;
    this.component.enableInputPortBuffer();

    if (this.component.getState() !== OMX_STATETYPE.OMX_StateExecuting) {
      this.component.changeState(OMX_STATETYPE.OMX_StateExecuting);
    }
  }

  var inputBuffer = this.component.getInputBuffer(BLOCK_TYPE.DO_BLOCK);
  inputBuffer.set(chunk);
  var timeout = setTimeout(next, 1000);//Timeout for empty buffer callback

  this.component.emptyBuffer(inputBuffer, function () {
    clearTimeout(timeout);
    next();
  });
};

module.exports = Component;