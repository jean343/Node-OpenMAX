import omx = require('../');

export interface Node_OMX {
  bcm_host_init();
  bcm_host_deinit();
  OMX_Init();
  OMX_Deinit();
  copyAsync(chunk, buf, destnStride, destnSliceHeight, offsetX, offsetY, nStride, width, nSliceHeight, height, callback);

  COMPONENTTYPE(name: string): COMPONENTTYPE;
}

export interface COMPONENTTYPE {
  close();
  on(event: string, callback: (eEvent: omx.OMX_EVENTTYPE, nData1: number, nData2: number) => void);
  emit(event: string);
  setParameter(port: number, index: omx.OMX_INDEXTYPE, format: any);
  changeState(state: omx.OMX_STATETYPE);
  getState();
  tunnelTo(out_port: number, sink: any, in_port: number);
  getParameter(port: number, index: omx.OMX_INDEXTYPE);
  sendCommand(commandType: omx.OMX_COMMANDTYPE, port: number);
  useBuffer(port: number, buf: Buffer);
  freeBuffer(port: number, buf: Buffer);
  useEGLImage(port: number, buf: omx.EglImage);
  emptyBuffer(header);
  emptyBufferAsync(header, any);
  fillBuffer(header);
  fillBufferAsync(header, any);
}
