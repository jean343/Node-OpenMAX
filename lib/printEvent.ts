import omx = require('../');

export function log(name: string, eEvent: omx.OMX_EVENTTYPE, nData1: number, nData2: number) {
  console.log('caught event', omx.OMX_EVENTTYPE[eEvent], nData1, nData2);

  switch (eEvent) {
    case omx.OMX_EVENTTYPE.OMX_EventCmdComplete:
      //                console.log("event_handler::OMX_EventCmdComplete");
      switch (nData1) {
        case omx.OMX_COMMANDTYPE.OMX_CommandStateSet:
          console.log("callback state changed (%s) to %d", name, nData2);
          break;
        case omx.OMX_COMMANDTYPE.OMX_CommandPortDisable:
          //              console.log("callback port disable %d", name, nData2);
          break;
        case omx.OMX_COMMANDTYPE.OMX_CommandPortEnable:
          console.log("callback port enable %d", name, nData2);
          break;
        case omx.OMX_COMMANDTYPE.OMX_CommandFlush:
          console.log("callback port flush %d", name, nData2);
          break;
        case omx.OMX_COMMANDTYPE.OMX_CommandMarkBuffer:
          console.log("callback mark buffer %d", name, nData2);
          break;
        default:
          break;
      }
      break;
    case omx.OMX_EVENTTYPE.OMX_EventError:
      var error = nData1;
      switch (error) {
        case omx.OMX_ERRORTYPE.OMX_ErrorPortUnpopulated:
          console.log("port unpopulated %x (%d)", name, error, nData2);
          break;
        case omx.OMX_ERRORTYPE.OMX_ErrorSameState:
          //          if (error_mask & ILCLIENT_ERROR_SAMESTATE) {
          //            console.log("ignore error: same state (%d)", name, nData2);
          //            event = NULL;
          //            break;
          //          }
          console.log("same state %x (%d)", name, error, nData2);
          break;
        case omx.OMX_ERRORTYPE.OMX_ErrorBadParameter:
          //          if (error_mask & ILCLIENT_ERROR_BADPARAMETER) {
          //            console.log("ignore error: bad parameter (%d)", name, nData2);
          //            event = NULL;
          //            break;
          //          }
          console.log("bad parameter %x (%d)", name, error, nData2);
          break;
        case omx.OMX_ERRORTYPE.OMX_ErrorIncorrectStateTransition:
          console.log("incorrect state transition %x (%d)", name, error, nData2);
          break;
        case omx.OMX_ERRORTYPE.OMX_ErrorBadPortIndex:
          console.log("bad port index %x (%d)", name, error, nData2);
          break;
        case omx.OMX_ERRORTYPE.OMX_ErrorStreamCorrupt:
          console.log("stream corrupt %x (%d)", name, error, nData2);
          break;
        case omx.OMX_ERRORTYPE.OMX_ErrorInsufficientResources:
          console.log("insufficient resources %x (%d)", name, error, nData2);
          break;
        case omx.OMX_ERRORTYPE.OMX_ErrorUnsupportedSetting:
          console.log("unsupported setting %x (%d)", name, error, nData2);
          break;
        case omx.OMX_ERRORTYPE.OMX_ErrorOverflow:
          console.log("overflow %x (%d)", name, error, nData2);
          break;
        //            case omx.OMX_ERRORTYPE.OMX_ErrorDiskFull:
        //              console.log("disk full %x (%d)", name, error, nData2);
        //              break;
        //            case omx.OMX_ERRORTYPE.OMX_ErrorMaxFileSize:
        //              console.log("max file size %x (%d)", name, error, nData2);
        //              break;
        //            case omx.OMX_ERRORTYPE.OMX_ErrorDrmUnauthorised:
        //              console.log("drm file is unauthorised %x (%d)", name, error, nData2);
        //              break;
        //            case omx.OMX_ERRORTYPE.OMX_ErrorDrmExpired:
        //              console.log("drm file has expired %x (%d)", name, error, nData2);
        //              break;
        //            case omx.OMX_ERRORTYPE.OMX_ErrorDrmGeneral:
        //              console.log("drm library error %x (%d)", name, error, nData2);
        //              break;
        default:
          console.log("unexpected error %x (%d)", name, error, nData2);
          break;
      }
      break;
    case omx.OMX_EVENTTYPE.OMX_EventBufferFlag:
      console.log("event_handler::OMX_EventBufferFlag");
      break;
    case omx.OMX_EVENTTYPE.OMX_EventPortSettingsChanged:
      console.log("event_handler::OMX_EventPortSettingsChanged");
      break;
    case omx.OMX_EVENTTYPE.OMX_EventMark:
      console.log("event_handler::OMX_EventMark");
      break;
    //        case omx.OMX_EVENTTYPE.OMX_EventParamOrConfigChanged:
    //          console.log("event_handler::OMX_EventParamOrConfigChanged");
    //          break;
  }
}
export function logHandlers(handlers: Array<omx.EventHandlers>) {
  for (var handler of handlers) {
    console.log('    handler', omx.OMX_EVENTTYPE[handler.eEvent], handler.nData1, handler.nData2);
  }
}
