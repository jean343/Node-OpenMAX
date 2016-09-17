import omx = require('../../index')
export class IMAGE_PORTDEFINITIONTYPE {
  pNativeRender;
  nFrameWidth: number;
  nFrameHeight: number;
  nStride: number;
  nSliceHeight: number;
  bFlagErrorConcealment: boolean;
  eCompressionFormat: omx.IMAGE_CODINGTYPE;
  eColorFormat: omx.COLOR_FORMATTYPE;
  pNativeWindow;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class IMAGE_PARAM_PORTFORMATTYPE {
  nIndex: number;
  eCompressionFormat: omx.IMAGE_CODINGTYPE;
  eColorFormat: omx.COLOR_FORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class IMAGE_PARAM_FLASHCONTROLTYPE {
  eFlashControl: omx.IMAGE_FLASHCONTROLTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class IMAGE_CONFIG_FOCUSCONTROLTYPE {
  eFocusControl: omx.IMAGE_FOCUSCONTROLTYPE;
  nFocusSteps: number;
  nFocusStepIndex: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class IMAGE_PARAM_QFACTORTYPE {
  nQFactor: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class IMAGE_PARAM_QUANTIZATIONTABLETYPE {
  eQuantizationTable: omx.IMAGE_QUANTIZATIONTABLETYPE;
  nQuantizationMatrix: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class IMAGE_PARAM_HUFFMANTTABLETYPE {
  eHuffmanTable: omx.IMAGE_HUFFMANTABLETYPE;
  nNumberOfHuffmanCodeOfLength: number;
  nHuffmanTable: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
