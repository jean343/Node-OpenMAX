// This file is auto-generated from 'node generateComponents.js' 

import omx = require('../../index')

export class Clock extends omx.Component {
  constructor(name?: string) {
    super('clock', name);
    this.setPorts(0, 80);
  }

  // ---- Text can be edited below this line --------
  run() {
    this.setParameter(this.out_port, omx.INDEXTYPE.IndexConfigTimeClockState, {
      eState: omx.TIME_CLOCKSTATE.TIME_ClockStateRunning
    });
    return this;
  };
  stop() {
    this.setParameter(this.out_port, omx.INDEXTYPE.IndexConfigTimeClockState, {
      eState: omx.TIME_CLOCKSTATE.TIME_ClockStateStopped
    });
    this.emit('finish');
    return this;
  };
  // ---- Text can be edited above this line --------
}