import omx = require('../');

export interface Node_OMX {
  bcm_host_init();
  bcm_host_deinit();
  OMX_Init();
  OMX_Deinit();

  COMPONENTTYPE(name: string): COMPONENTTYPE;
}

export interface COMPONENTTYPE {
  on(event: string, callback: (eEvent: omx.OMX_EVENTTYPE, nData1: number, nData2: number) => void);
  setParameter(port: number, index: omx.OMX_INDEXTYPE, format: any);
  changeState(state: omx.OMX_STATETYPE);
  getState();
  getParameter(port: number, index: omx.OMX_INDEXTYPE);
  sendCommand(commandType: omx.OMX_COMMANDTYPE, port: number);
  useBuffer(port: number, buf: Buffer);
  emptyBuffer(header);
}