import omx = require('../../index')
export class PRIORITYMGMTTYPE {
  /**
   * Priority of the component group
   */
  nGroupPriority: number;
  /**
   * ID of the component group
   */
  nGroupID: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_COMPONENTROLETYPE {
  /**
   * name of standard component which defines component role
   */
  cRole: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class BUFFERHEADERTYPE {
  /**
   * Pointer to actual block of memory that is acting as the buffer
   */
  pBuffer: number;
  /**
   * size of the buffer allocated, in bytes
   */
  nAllocLen: number;
  /**
   * number of bytes currently in the buffer
   */
  nFilledLen: number;
  /**
   * start offset of valid data in bytes from the start of the buffer
   */
  nOffset: number;
  /**
   * The component that will generate a mark event upon processing this buffer.
   */
  hMarkTargetComponent;
  /**
   * Optional entry that the component and application can update with a tick count when they access the component. This value should be in microseconds. Since this is a value relative to an arbitrary starting point, this value cannot be used to determine absolute time. This is an optional entry and not all components will update it.
   */
  nTickCount: number;
  /**
   * Timestamp corresponding to the sample starting at the first logical sample boundary in the buffer. Timestamps of successive samples within the buffer may be inferred by adding the duration of the of the preceding buffer to the timestamp of the preceding buffer.
   */
  nTimeStamp: omx.TICKS;
  /**
   * buffer specific flags
   */
  nFlags: number;
  /**
   * The index of the output port (if any) using this buffer
   */
  nOutputPortIndex: number;
  /**
   * The index of the input port (if any) using this buffer
   */
  nInputPortIndex: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OTHER_EXTRADATATYPE {
  /**
   * Extra Data type
   */
  eType: omx.EXTRADATATYPE;
  /**
   * Size of the supporting data to follow
   */
  nDataSize: number;
  /**
   * Supporting data hint
   */
  data: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PORT_PARAM_TYPE {
  /**
   * The number of ports for this component
   */
  nPorts: number;
  /**
   * first port number for this type of port
   */
  nStartPortNumber: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_BUFFERSUPPLIERTYPE {
  /**
   * buffer supplier
   */
  eBufferSupplier: omx.BUFFERSUPPLIERTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class TUNNELSETUPTYPE {
  /**
   * bit flags for tunneling
   */
  nTunnelFlags: number;
  /**
   * supplier preference
   */
  eSupplier: omx.BUFFERSUPPLIERTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
