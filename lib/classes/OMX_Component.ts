import omx = require('../../index')
export class PARAM_PORTDEFINITIONTYPE {
  /**
   * Direction (input or output) of this port
   */
  eDir: omx.DIRTYPE;
  /**
   * The actual number of buffers allocated on this port
   */
  nBufferCountActual: number;
  /**
   * The minimum number of buffers this port requires
   */
  nBufferCountMin: number;
  /**
   * Size, in bytes, for buffers to be used for this channel
   */
  nBufferSize: number;
  /**
   * Ports default to enabled and are enabled/disabled by OMX_CommandPortEnable/OMX_CommandPortDisable. When disabled a port is unpopulated. A disabled port is not populated with buffers on a transition to IDLE.
   */
  bEnabled: boolean;
  /**
   * Port is populated with all of its buffers as indicated by nBufferCountActual. A disabled port is always unpopulated. An enabled port is populated on a transition to OMX_StateIdle and unpopulated on a transition to loaded.
   */
  bPopulated: boolean;
  /**
   * Domain of the port. Determines the contents of metadata below.
   */
  eDomain: omx.PORTDOMAINTYPE;
  audio: omx.AUDIO_PORTDEFINITIONTYPE;
  video: omx.VIDEO_PORTDEFINITIONTYPE;
  image: omx.IMAGE_PORTDEFINITIONTYPE;
  other: omx.OTHER_PORTDEFINITIONTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_U32TYPE {
  /**
   * U32 value
   */
  nU32: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_SUSPENSIONPOLICYTYPE {
  ePolicy: omx.SUSPENSIONPOLICYTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_SUSPENSIONTYPE {
  eType: omx.SUSPENSIONTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_BOOLEANTYPE {
  bEnabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CONTENTURITYPE {
  /**
   * The URI name
   */
  contentURI: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_CONTENTPIPETYPE {
  /**
   * The pipe handle
   */
  hPipe;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class RESOURCECONCEALMENTTYPE {
  /**
   * disallow the use of resource concealment methods (like degrading algorithm quality to lower resource consumption or functional bypass) on a component as a resolution to resource conflicts.
   */
  bResourceConcealmentForbidden: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_METADATAITEMCOUNTTYPE {
  eScopeMode: omx.METADATASCOPETYPE;
  nScopeSpecifier: number;
  nMetadataItemCount: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_METADATAITEMTYPE {
  eScopeMode: omx.METADATASCOPETYPE;
  nScopeSpecifier: number;
  nMetadataItemIndex: number;
  eSearchMode: omx.METADATASEARCHMODETYPE;
  eKeyCharset: omx.METADATACHARSETTYPE;
  nKeySizeUsed: number;
  nKey: number;
  eValueCharset: omx.METADATACHARSETTYPE;
  nValueMaxSize: number;
  nValueSizeUsed: number;
  nValue: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CONTAINERNODECOUNTTYPE {
  bAllKeys: boolean;
  nParentNodeID: number;
  nNumNodes: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class CONFIG_CONTAINERNODEIDTYPE {
  bAllKeys: boolean;
  nParentNodeID: number;
  nNodeIndex: number;
  nNodeID: number;
  bIsLeafType: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class PARAM_METADATAFILTERTYPE {
  /**
   * if true then this structure refers to all keys and the three key fields below are ignored
   */
  bAllKeys: boolean;
  eKeyCharset: omx.METADATACHARSETTYPE;
  nKeySizeUsed: number;
  nKey : number;
  nLanguageCountrySizeUsed: number;
  nLanguageCountry: number;
  /**
   * if true then key is part of filter (e.g. retained for query later). If false then key is not part of filter
   */
  bEnabled: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
