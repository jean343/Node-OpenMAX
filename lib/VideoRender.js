var Node_OMX = require('bindings')('Node_OMX');
var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');
var OMX_STATETYPE = require('./OMX_STATETYPE');

function VideoRender() {
  if (!(this instanceof VideoRender)) {
    return new VideoRender();
  }
  var self = this;
  this.init(ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS);
  this.component.setPorts(90);
  
  self.on('finish', function () {
    console.log('VideoRender on finish');
    self.component.emptyBuffer(undefined, function () {
      self.component.changeState(OMX_STATETYPE.OMX_StateIdle);
      self.component.changeState(OMX_STATETYPE.OMX_StateLoaded);
    });
  });
}

VideoRender.prototype = new Component("video_render");

module.exports = VideoRender;