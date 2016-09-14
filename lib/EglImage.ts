import omx = require('../index');
import def = require('./Definitions');
var Node_OMX: def.Node_OMX = require('bindings')('Node_OMX');

export class EglImage {
  eglImage;
  constructor(graphics: omx.Graphics, texture: omx.GfxTexture) {
    this.eglImage = Node_OMX.EglImage(graphics, texture);
  }
  //  drawTextureRect(texture: gl.GfxTexture, x0: number, y0: number, x1: number, y1: number) {
  //    this.graphics.drawTextureRect(texture.texture, x0, y0, x1, y1);
  //  }
}
