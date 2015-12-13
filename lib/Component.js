var Node_OMX = require('bindings')('Node_OMX');
var EventEmitter = require('events').EventEmitter;

function inherits(target, source) {
  for (var k in source.prototype) {
    target.prototype[k] = source.prototype[k];
  }
}
inherits(Node_OMX.COMPONENT, EventEmitter);

function Component(name, flags) {
  if (!(this instanceof Component)) {
    return new Component(name, flags);
  }
  
  console.log('JS- Component');
  Node_OMX.bcm_host_init();
  this.ILCLIENT = Node_OMX.ILCLIENT();

  this.component = Node_OMX.COMPONENT(this.ILCLIENT, name, flags);
}

Component.prototype.setPorts = function (in_port, out_port) {
  this.component.setPorts(in_port, out_port);
};

module.exports = Component;