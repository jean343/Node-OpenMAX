var Node_OMX = require('bindings')('Node_OMX');
var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');
var OMX_STATETYPE = require('./OMX_STATETYPE');

function VideoRender() {
  if (!(this instanceof VideoRender)) {
    return new VideoRender();
  }
  this.component.setPorts(90);
}

VideoRender.prototype = new Component("video_render", ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS);

VideoRender.prototype.on('finish', function () {
  console.log('VideoRender on finish');
  this.component.changeState(OMX_STATETYPE.OMX_StateIdle);
  this.component.changeState(OMX_STATETYPE.OMX_StateLoaded);
});

module.exports = VideoRender;