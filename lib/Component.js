var Duplex = require('stream').Duplex;
var utils = require('./utils');
var util = require('util');
var Node_OMX = require('bindings')('Node_OMX');
var EventEmitter = require('events').EventEmitter;
var OMX_STATETYPE = require('./OMX_STATETYPE');
var OMX_INDEXTYPE = require('./OMX_INDEXTYPE');
var BLOCK_TYPE = require('./BLOCK_TYPE');

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
//    console.error('!!!something is piping into', self.name, source);
    source.on('portDefinitionChanged', function (portDefinition) {
      console.log('portDefinitionChanged', self.name, self.component.getState());
//      self.component.setParameter(self.component.in_port, OMX_INDEXTYPE.OMX_IndexParamPortDefinition, portDefinition);
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
  console.log('_read', this.name);
  var self = this;

  function read() {
    if (self.firstReadPacket) {
      self.firstReadPacket = false;
      self.component.enableOutputPortBuffer();
      if (self.component.getState() !== OMX_STATETYPE.OMX_StateExecuting) {
        self.component.changeState(OMX_STATETYPE.OMX_StateExecuting);
      }
      self.outputBuffer = self.component.getOutputBuffer(BLOCK_TYPE.DO_BLOCK);
    }

    self.component.fillBuffer(self.outputBuffer, function () {
      var buffer = self.outputBuffer.get();
      setTimeout(function () {
        self.push(buffer);
      }, 0);
    });
  }

  if (this.hasPortSettingsChanged) {
    read();
  } else {
    this.component.on("eventPortSettingsChanged", function () {
      self.hasPortSettingsChanged = true;
//      var portDefinition = self.component.getParameter(self.component.out_port, OMX_INDEXTYPE.OMX_IndexParamPortDefinition);
//      console.log('emit portDefinitionChanged', self.name, portDefinition);
//      self.emit('portDefinitionChanged', portDefinition);
      read();
    });
  }

};

Component.prototype._write = function (chunk, enc, next) {
  console.log('_write', this.name);
  if (this.name === 'video_render')
    console.log('getState', this.name, this.component.getState());
  if (this.firstWritePacket) {
    this.firstWritePacket = false;
    this.component.enableInputPortBuffer();

    if (this.component.getState() !== OMX_STATETYPE.OMX_StateExecuting) {
      this.component.changeState(OMX_STATETYPE.OMX_StateExecuting);
    }
  }

  if (this.name === 'video_render')
    console.log('getState', this.name, this.component.getState());
  var inputBuffer = this.component.getInputBuffer(BLOCK_TYPE.DO_BLOCK);

  if (this.name === 'video_render')
    console.log('inputBuffer', chunk.length, inputBuffer);
  inputBuffer.set(chunk.slice(0, inputBuffer.nAllocLen));
  this.component.emptyBuffer(inputBuffer, function () {
    if (this.name === 'video_render')
      console.log('emptyBuffer', true);
    setTimeout(next, 0);
  });
};

module.exports = Component;