import omx = require('../');
import def = require('./Definitions');
var Node_OMX: def.Node_OMX = require('bindings')('Node_OMX');

export class Graphics {
  graphics;
  constructor() {
    this.graphics = Node_OMX.Graphics();
  }
  beginFrame() {
    this.graphics.beginFrame();
  }
  endFrame() {
    this.graphics.endFrame();
  }
  drawTextureRect(texture: omx.EglImage, x0: number, y0: number, x1: number, y1: number) {
    this.graphics.drawTextureRect(texture.eglImage, x0, y0, x1, y1);
  }
}
