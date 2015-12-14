var Duplex = require('stream').Duplex;
var utils = require('./utils');
var util = require('util');
var Node_OMX = require('bindings')('Node_OMX');
var EventEmitter = require('events').EventEmitter;
var OMX_STATETYPE = require('./OMX_STATETYPE');

utils.inherits(Node_OMX.COMPONENT, EventEmitter);

function Component(name) {
  if (!(this instanceof Component)) {
    return new Component(name, flags);
  }
  this.name = name;
  this.component = null;
  Duplex.call(this, undefined);
}

util.inherits(Component, Duplex);

Component.prototype.init = function (flags) {
  Node_OMX.bcm_host_init();
  this.ILCLIENT = Node_OMX.ILCLIENT();

  this.component = Node_OMX.COMPONENT(this.ILCLIENT, this.name, flags);
  this.component.changeState(OMX_STATETYPE.OMX_StateIdle);
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

module.exports = Component;