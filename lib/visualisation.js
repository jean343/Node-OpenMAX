var Node_OMX = require('bindings')('Node_OMX');
var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');
var OMX_STATETYPE = require('./OMX_STATETYPE');

function Visualisation() {
  if (!(this instanceof Visualisation)) {
    return new Visualisation();
  }
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
  this.component.setPorts(140,141);

  self.on('finish', function () {
    console.log('Visualisation on finish');
    self.component.emptyBuffer(undefined, function () {
      self.component.changeState(OMX_STATETYPE.OMX_StateIdle);
      self.component.changeState(OMX_STATETYPE.OMX_StateLoaded);
    });
  });
}

Visualisation.prototype = new Component('visualisation');

module.exports = Visualisation;
