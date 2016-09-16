import omx = require('../../index')
export class OMX_TIME_CONFIG_SEEKMODETYPE {
  /**
   * The seek mode
   */
  eType: omx.OMX_TIME_SEEKMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_TIME_CONFIG_TIMESTAMPTYPE {
  /**
   * timestamp .
   */
  nTimestamp: omx.OMX_TICKS;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_TIME_CONFIG_MEDIATIMEREQUESTTYPE {
  /**
   * Media timestamp requested.
   */
  nMediaTimestamp: omx.OMX_TICKS;
  /**
   * Amount of wall clock time by which this request should be fulfilled early
   */
  nOffset: omx.OMX_TICKS;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_TIME_MEDIATIMETYPE {
  /**
   * Client private data to disabiguate this media time from others. Copied from the media time request. A value of zero is reserved for time scale updates.
   */
  nClientPrivate: number;
  /**
   * Reason for the update
   */
  eUpdateType: omx.OMX_TIME_UPDATETYPE;
  /**
   * Media time requested. If no media time was requested then this is the current media time.
   */
  nMediaTimestamp: omx.OMX_TICKS;
  /**
   * Amount of wall clock time by which this request was actually fulfilled early
   */
  nOffset: omx.OMX_TICKS;
  /**
   * Wall time corresponding to nMediaTimeStamp. A client may compare this value to current media time obtained from the Clock Component to determine the wall time until the media timestamp is really current.
   */
  nWallTimeAtMediaTime: omx.OMX_TICKS;
  /**
   * Current media time scale in Q16 format.
   */
  xScale: number;
  /**
   * Seeking Change. Added 7/12.
   */
  eState: omx.OMX_TIME_CLOCKSTATE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_TIME_CONFIG_SCALETYPE {
  /**
   * This is a value in Q16 format which is used for scaling the media time
   */
  xScale: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_TIME_CONFIG_CLOCKSTATETYPE {
  /**
   * State of the media time.
   */
  eState: omx.OMX_TIME_CLOCKSTATE;
  /**
   * Start time of the media time.
   */
  nStartTime: omx.OMX_TICKS;
  /**
   * Time to offset the media time by (e.g. preroll). Media time will be reported to be nOffset ticks earlier.
   */
  nOffset: omx.OMX_TICKS;
  /**
   * Mask of OMX_CLOCKPORT values.
   */
  nWaitMask: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_TIME_CONFIG_ACTIVEREFCLOCKTYPE {
  /**
   * Reference clock used to compute media time
   */
  eClock: omx.OMX_TIME_REFCLOCKTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_OTHER_CONFIG_POWERTYPE {
  /**
   * Flag to enable Power Management
   */
  bEnablePM: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_OTHER_CONFIG_STATSTYPE {
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_OTHER_PORTDEFINITIONTYPE {
  /**
   * Type of data expected for this channel
   */
  eFormat: omx.OMX_OTHER_FORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class OMX_OTHER_PARAM_PORTFORMATTYPE {
  /**
   * Indicates the enumeration index for the format from 0x0 to N-1
   */
  nIndex: number;
  /**
   * Type of data expected for this channel
   */
  eFormat: omx.OMX_OTHER_FORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
