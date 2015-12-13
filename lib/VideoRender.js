var Node_OMX = require('bindings')('Node_OMX');
var Component = require('./Component');
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');

//function VideoRender() {
//  if (!(this instanceof VideoRender)) {
//    return new VideoRender();
//  }
//  var component = new Component("video_render", ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS);
//  component.setPorts(90);
//}

function VideoRender() {
  if (!(this instanceof VideoRender)) {
    return new VideoRender();
  }
//  console.log('this', this, this.__proto__);
  this.component.setPorts(90);
}

VideoRender.prototype = new Component("video_render", ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS);

module.exports = VideoRender;