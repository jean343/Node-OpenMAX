var Duplex = require('stream').Duplex;
var utils = require('./utils');
var util = require('util');
var Node_OMX = require('bindings')('Node_OMX');
var EventEmitter = require('events').EventEmitter;

utils.inherits(Node_OMX.COMPONENT, EventEmitter);

function Component(name, flags) {
  if (!(this instanceof Component)) {
    return new Component(name, flags);
  }
  
  Duplex.call(this, undefined);
  
  console.log('JS- Component');
  Node_OMX.bcm_host_init();
  this.ILCLIENT = Node_OMX.ILCLIENT();

  this.component = Node_OMX.COMPONENT(this.ILCLIENT, name, flags);
}

util.inherits(Component, Duplex);

Component.prototype.setPorts = function (in_port, out_port) {
  this.component.setPorts(in_port, out_port);
};

module.exports = Component;