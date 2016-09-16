import omx = require('../../index')
export class OMX_IMAGE_PORTDEFINITIONTYPE {
  pNativeRender;
  nFrameWidth: number;
  nFrameHeight: number;
  nStride: number;
  nSliceHeight: number;
  bFlagErrorConcealment: boolean;
  eCompressionFormat: omx.OMX_IMAGE_CODINGTYPE;
  eColorFormat: omx.OMX_COLOR_FORMATTYPE;
  pNativeWindow;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_IMAGE_PARAM_PORTFORMATTYPE {
  nIndex: number;
  eCompressionFormat: omx.OMX_IMAGE_CODINGTYPE;
  eColorFormat: omx.OMX_COLOR_FORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_IMAGE_PARAM_FLASHCONTROLTYPE {
  eFlashControl: omx.OMX_IMAGE_FLASHCONTROLTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_IMAGE_CONFIG_FOCUSCONTROLTYPE {
  eFocusControl: omx.OMX_IMAGE_FOCUSCONTROLTYPE;
  nFocusSteps: number;
  nFocusStepIndex: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_IMAGE_PARAM_QFACTORTYPE {
  nQFactor: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_IMAGE_PARAM_QUANTIZATIONTABLETYPE {
  eQuantizationTable: omx.OMX_IMAGE_QUANTIZATIONTABLETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_IMAGE_PARAM_HUFFMANTTABLETYPE {
  eHuffmanTable: omx.OMX_IMAGE_HUFFMANTABLETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
