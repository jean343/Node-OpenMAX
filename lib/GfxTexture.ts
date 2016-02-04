import omx = require('../');
import def = require('./Definitions');
var Node_OMX: def.Node_OMX = require('bindings')('Node_OMX');

export class GfxTexture {
  texture;
  constructor(width: number, height: number) {
    this.texture = Node_OMX.GfxTexture(width, height);
  }
  setPixels(pixels: Buffer) {
    this.texture.setPixels(pixels);
  }
}
