//This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../')

export class Clock extends omx.Component {
  constructor(name?: string) {
    super('clock', name);
    this.setPorts(0, 80);
  }

  run() {
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigTimeClockState, {
      eState: omx.OMX_TIME_CLOCKSTATE.OMX_TIME_ClockStateRunning
    });
    return this;
  };
  stop() {
    this.setParameter(this.out_port, omx.OMX_INDEXTYPE.OMX_IndexConfigTimeClockState, {
      eState: omx.OMX_TIME_CLOCKSTATE.OMX_TIME_ClockStateStopped
    });
    return this;
  };

}