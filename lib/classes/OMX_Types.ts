import omx = require('../../index')
export class OMX_BU32 {
  /**
   * actual value
   */
  nValue: number;
  /**
   * minimum for value (i.e. nValue >= nMin)
   */
  nMin: number;
  /**
   * maximum for value (i.e. nValue <= nMax)
   */
  nMax: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_BS32 {
  /**
   * actual value
   */
  nValue: number;
  /**
   * minimum for value (i.e. nValue >= nMin)
   */
  nMin: number;
  /**
   * maximum for value (i.e. nValue <= nMax)
   */
  nMax: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_TICKS {
  /**
   * low bits of the signed 64 bit tick value
   */
  nLowPart: number;
  /**
   * high bits of the signed 64 bit tick value
   */
  nHighPart: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_MARKTYPE {
  /**
   * The component that will generate a mark event upon processing the mark.
   */
  hMarkTargetComponent;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
