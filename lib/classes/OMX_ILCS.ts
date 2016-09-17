import omx = require('../../index')
export class OMX_PARAM_PORTSUMMARYTYPE {
  /**
   * Total number of ports
   */
  nNumPorts: number;
  /**
   * Which set of ports is details below, portIndex[0] is port reqSet 32
   */
  reqSet: number;
  /**
   * Bitfield, 1 if output port, 0 if input port, max 256 ports
   */
  portDir: number;
  /**
   * Port Indexes
   */
  portIndex: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_MARKCOMPARISONTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_PARAM_TUNNELSTATUSTYPE {
  /**
   * Query the nIndex'th port and fill in nPortIndex
   */
  nIndex: number;
  /**
   * If OMX_TRUE read nIndex, otherwise read nPortIndex
   */
  bUseIndex: boolean;
  /**
   * Port on tunnelled component
   */
  nTunneledPort: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
