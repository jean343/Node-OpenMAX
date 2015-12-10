#include "Component.h"

Component::Component(int in_port, int out_port) :
in_port(in_port),
out_port(out_port) {
  clientHandle = ilclient_init();
  if (clientHandle == NULL) {
    fprintf(stderr, "IL client init failed\n");
    exit(1);
  }

  if (OMX_Init() != OMX_ErrorNone) {
    ilclient_destroy(clientHandle);
    fprintf(stderr, "OMX init failed\n");
    exit(1);
  }

  ilclient_set_error_callback(clientHandle, Component::error_callback, NULL);
}

Component::~Component() {
  OMX_Deinit();
  ilclient_destroy(clientHandle);
}

int Component::waitForEvent(OMX_EVENTTYPE event, int port, OMX_U32 nData2, int event_flag, int suspend) {
  int ret = ilclient_wait_for_event(component, event, port, 0, nData2, 1, event_flag, suspend);
  if (ret != 0) {
    fprintf(stderr, "No event %d received: %d\n", event_flag, ret);
  }
  return ret;
}

int Component::changeState(OMX_STATETYPE state) {
  printState(handle);
  printf("Change state to %s\n", state2str(state));
  int err;
  err = ilclient_change_component_state(component, state);
  if (err < 0) {
    fprintf(stderr, "Couldn't change state to %s\n", state2str(state));
    exit(1);
  }
  printState(handle);
  return err;
}

int Component::createComponent(char const *componentName, ILCLIENT_CREATE_FLAGS_T flags) {
  int err;
  err = ilclient_create_component(clientHandle, &component, (char*)componentName, (ILCLIENT_CREATE_FLAGS_T) (ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_ENABLE_INPUT_BUFFERS | ILCLIENT_ENABLE_OUTPUT_BUFFERS));
  if (err == -1) {
    fprintf(stderr, "Component create failed\n");
    exit(1);
  }
  handle = ilclient_get_handle(component);

  printState(handle);

  return err;
}