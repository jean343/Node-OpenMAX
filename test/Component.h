#pragma once

#include <stdio.h>
#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

#define TIMEOUT_MS 2000

class Component {
public:

  template<class T>
  static void InitOMXParams(T *params, int port) {
    memset(params, 0, sizeof (T));
    params->nSize = sizeof (T);
    params->nVersion.nVersion = OMX_VERSION;
    params->nPortIndex = port;
  }

  static char const *state2str(OMX_STATETYPE state) {
    switch (state) {
      case OMX_StateLoaded: return "StateLoaded";
      case OMX_StateIdle: return "StateIdle";
      case OMX_StateExecuting: return "StateExecuting";
      case OMX_StatePause: return "StatePause";
      case OMX_StateWaitForResources: return "StateWait";
      case OMX_StateInvalid: return "StateInvalid";
      default: return "State unknown";
    }
  }

  static void printState(OMX_HANDLETYPE handle) {
    OMX_STATETYPE state;
    OMX_ERRORTYPE err;

    err = OMX_GetState(handle, &state);
    if (err != OMX_ErrorNone) {
      fprintf(stderr, "Error on getting state\n");
      exit(1);
    }
    printf("%s\n", Component::state2str(state));
  }

  static char const *err2str(int err) {
    switch (err) {
      case OMX_ErrorInsufficientResources: return "OMX_ErrorInsufficientResources";
      case OMX_ErrorUndefined: return "OMX_ErrorUndefined";
      case OMX_ErrorInvalidComponentName: return "OMX_ErrorInvalidComponentName";
      case OMX_ErrorComponentNotFound: return "OMX_ErrorComponentNotFound";
      case OMX_ErrorInvalidComponent: return "OMX_ErrorInvalidComponent";
      case OMX_ErrorBadParameter: return "OMX_ErrorBadParameter";
      case OMX_ErrorNotImplemented: return "OMX_ErrorNotImplemented";
      case OMX_ErrorUnderflow: return "OMX_ErrorUnderflow";
      case OMX_ErrorOverflow: return "OMX_ErrorOverflow";
      case OMX_ErrorHardware: return "OMX_ErrorHardware";
      case OMX_ErrorInvalidState: return "OMX_ErrorInvalidState";
      case OMX_ErrorStreamCorrupt: return "OMX_ErrorStreamCorrupt";
      case OMX_ErrorPortsNotCompatible: return "OMX_ErrorPortsNotCompatible";
      case OMX_ErrorResourcesLost: return "OMX_ErrorResourcesLost";
      case OMX_ErrorNoMore: return "OMX_ErrorNoMore";
      case OMX_ErrorVersionMismatch: return "OMX_ErrorVersionMismatch";
      case OMX_ErrorNotReady: return "OMX_ErrorNotReady";
      case OMX_ErrorTimeout: return "OMX_ErrorTimeout";
      case OMX_ErrorSameState: return "OMX_ErrorSameState";
      case OMX_ErrorResourcesPreempted: return "OMX_ErrorResourcesPreempted";
      case OMX_ErrorPortUnresponsiveDuringAllocation: return "OMX_ErrorPortUnresponsiveDuringAllocation";
      case OMX_ErrorPortUnresponsiveDuringDeallocation: return "OMX_ErrorPortUnresponsiveDuringDeallocation";
      case OMX_ErrorPortUnresponsiveDuringStop: return "OMX_ErrorPortUnresponsiveDuringStop";
      case OMX_ErrorIncorrectStateTransition: return "OMX_ErrorIncorrectStateTransition";
      case OMX_ErrorIncorrectStateOperation: return "OMX_ErrorIncorrectStateOperation";
      case OMX_ErrorUnsupportedSetting: return "OMX_ErrorUnsupportedSetting";
      case OMX_ErrorUnsupportedIndex: return "OMX_ErrorUnsupportedIndex";
      case OMX_ErrorBadPortIndex: return "OMX_ErrorBadPortIndex";
      case OMX_ErrorPortUnpopulated: return "OMX_ErrorPortUnpopulated";
      case OMX_ErrorComponentSuspended: return "OMX_ErrorComponentSuspended";
      case OMX_ErrorDynamicResourcesUnavailable: return "OMX_ErrorDynamicResourcesUnavailable";
      case OMX_ErrorMbErrorsInFrame: return "OMX_ErrorMbErrorsInFrame";
      case OMX_ErrorFormatNotDetected: return "OMX_ErrorFormatNotDetected";
      case OMX_ErrorContentPipeOpenFailed: return "OMX_ErrorContentPipeOpenFailed";
      case OMX_ErrorContentPipeCreationFailed: return "OMX_ErrorContentPipeCreationFailed";
      case OMX_ErrorSeperateTablesUsed: return "OMX_ErrorSeperateTablesUsed";
      case OMX_ErrorTunnelingUnsupported: return "OMX_ErrorTunnelingUnsupported";
      default: return "unknown error";
    }
  }

  static void error_callback(void *userdata, COMPONENT_T *comp, OMX_U32 data) {
    fprintf(stderr, "OMX error %s\n", Component::err2str(data));
  }

  enum BLOCK_TYPE {
    DO_BLOCK = 1,
    DO_NOT_BLOCK = 0
  };

  void enableInputPort() {
    enablePort(in_port);
  }

  void enableOutputPort() {
    enablePort(out_port);
  }

  void enableInputPortBuffer() {
    enablePortBuffer(in_port);
  }

  void enableOutputPortBuffer() {
    enablePortBuffer(out_port);
  }

  void disableInputPort() {
    disablePort(in_port);
  }

  void disableOutputPort() {
    disablePort(out_port);
  }

  void disableInputPortBuffer() {
    disablePortBuffer(in_port);
  }

  void disableOutputPortBuffer() {
    disablePortBuffer(out_port);
  }

  int waitForEvent(OMX_EVENTTYPE event, int port, OMX_U32 nData2, int event_flag, int suspend);

  int changeState(OMX_STATETYPE state);

  int flush() {
    OMX_SendCommand(handle, OMX_CommandFlush, out_port, NULL);
    return waitForEvent(OMX_EventCmdComplete, OMX_CommandFlush, out_port, 0, TIMEOUT_MS);
  }

  OMX_BUFFERHEADERTYPE *getInputBuffer(BLOCK_TYPE type) {
    return ilclient_get_input_buffer(component, in_port, (int) type);
  }

  OMX_BUFFERHEADERTYPE *getOutputBuffer(BLOCK_TYPE type) {
    return ilclient_get_output_buffer(component, out_port, (int) type);
  }

  int in_port;
  int out_port;
  COMPONENT_T *component;
  OMX_HANDLETYPE handle;
  ILCLIENT_T *clientHandle;
protected:

  Component(int in_port, int out_port);
  ~Component();

  void enablePort(int port) {
    printf("enablePort: %d\n", port);
    ilclient_enable_port(component, port);
  }

  void enablePortBuffer(int port) {
    printf("enablePortBuffer: %d\n", port);
    if (ilclient_enable_port_buffers(component, port, NULL, NULL, NULL) != 0) {
      printf("ERROR enablePortBuffer: %d\n", port);
    }
  }

  void disablePort(int port) {
    printf("disablePort: %d\n", port);
    ilclient_disable_port(component, port);
  }

  void disablePortBuffer(int port) {
    printf("disablePortBuffer: %d\n", port);
    ilclient_disable_port_buffers(component, port, NULL, NULL, NULL);
  }

  int createComponent(char const *componentName, ILCLIENT_CREATE_FLAGS_T flags);


private:
};