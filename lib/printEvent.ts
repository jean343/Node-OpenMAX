import omx = require('../index');

export function log(name: string, eEvent: omx.EVENTTYPE, nData1: number, nData2: number) {
//  console.log('on %s caught event', name, omx.EVENTTYPE[eEvent], nData1, nData2);

  switch (eEvent) {
    case omx.EVENTTYPE.EventCmdComplete:
      //                console.log("event_handler::EventCmdComplete");
      switch (nData1) {
        case omx.COMMANDTYPE.CommandStateSet:
          console.log("callback state changed (%s) to %d", name, nData2);
          break;
        case omx.COMMANDTYPE.CommandPortDisable:
          //              console.log("callback port disable %d", name, nData2);
          break;
        case omx.COMMANDTYPE.CommandPortEnable:
          console.log("callback port enable %d", name, nData2);
          break;
        case omx.COMMANDTYPE.CommandFlush:
          console.log("callback port flush %d", name, nData2);
          break;
        case omx.COMMANDTYPE.CommandMarkBuffer:
          console.log("callback mark buffer %d", name, nData2);
          break;
        default:
          break;
      }
      break;
    case omx.EVENTTYPE.EventBufferFlag:
      console.log("event_handler::EventBufferFlag");
      break;
    case omx.EVENTTYPE.EventPortSettingsChanged:
      console.log("event_handler::EventPortSettingsChanged");
      break;
    case omx.EVENTTYPE.EventMark:
      console.log("event_handler::EventMark");
      break;
    //        case omx.EVENTTYPE.EventParamOrConfigChanged:
    //          console.log("event_handler::EventParamOrConfigChanged");
    //          break;
  }
  logError(name, eEvent, nData1, nData2);
}
export function logError(name: string, eEvent: omx.EVENTTYPE, nData1: number, nData2: number) {
  switch (eEvent) {
    case omx.EVENTTYPE.EventError:
      var error = nData1;
      switch (error) {
        case omx.ERRORTYPE.ErrorPortUnpopulated:
          console.log("port unpopulated %x (%d)", name, error, nData2);
          break;
        case omx.ERRORTYPE.ErrorSameState:
          //          if (error_mask & ILCLIENT_ERROR_SAMESTATE) {
          //            console.log("ignore error: same state (%d)", name, nData2);
          //            event = NULL;
          //            break;
          //          }
          console.log("same state %x (%d)", name, error, nData2);
          break;
        case omx.ERRORTYPE.ErrorBadParameter:
          //          if (error_mask & ILCLIENT_ERROR_BADPARAMETER) {
          //            console.log("ignore error: bad parameter (%d)", name, nData2);
          //            event = NULL;
          //            break;
          //          }
          console.log("bad parameter %x (%d)", name, error, nData2);
          break;
        case omx.ERRORTYPE.ErrorIncorrectStateTransition:
          console.log("incorrect state transition %x (%d)", name, error, nData2);
          break;
        case omx.ERRORTYPE.ErrorBadPortIndex:
          console.log("bad port index %x (%d)", name, error, nData2);
          break;
        case omx.ERRORTYPE.ErrorStreamCorrupt:
          console.log("stream corrupt %x (%d)", name, error, nData2);
          break;
        case omx.ERRORTYPE.ErrorInsufficientResources:
          console.log("insufficient resources %x (%d)", name, error, nData2);
          break;
        case omx.ERRORTYPE.ErrorUnsupportedSetting:
          console.log("unsupported setting %x (%d)", name, error, nData2);
          break;
        case omx.ERRORTYPE.ErrorOverflow:
          console.log("overflow %x (%d)", name, error, nData2);
          break;
        //            case omx.ERRORTYPE.ErrorDiskFull:
        //              console.log("disk full %x (%d)", name, error, nData2);
        //              break;
        //            case omx.ERRORTYPE.ErrorMaxFileSize:
        //              console.log("max file size %x (%d)", name, error, nData2);
        //              break;
        //            case omx.ERRORTYPE.ErrorDrmUnauthorised:
        //              console.log("drm file is unauthorised %x (%d)", name, error, nData2);
        //              break;
        //            case omx.ERRORTYPE.ErrorDrmExpired:
        //              console.log("drm file has expired %x (%d)", name, error, nData2);
        //              break;
        //            case omx.ERRORTYPE.ErrorDrmGeneral:
        //              console.log("drm library error %x (%d)", name, error, nData2);
        //              break;
        default:
          console.log("Error on %s unexpected error", name, omx.ERRORTYPE[error], nData2);
          break;
      }
      break;
  }
}
export function logHandlers(handlers: Array<omx.EventHandlers>) {
  for (var handler of handlers) {
    console.log('    handler', omx.EVENTTYPE[handler.eEvent], handler.nData1, handler.nData2);
  }
}
