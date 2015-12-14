#pragma once

#include <nan.h>

#include "ILCLIENT.h"
extern "C" {
#include "ilclient.h"
}

class COMPONENT : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  COMPONENT_T *component;
  OMX_HANDLETYPE handle;
  int in_port;
  int out_port;

  uv_async_t* async;
  Nan::Callback *lastEmptyBufferCallback;
private:
  explicit COMPONENT(ILCLIENT* _client, char const *name, ILCLIENT_CREATE_FLAGS_T flags);
  ~COMPONENT();

  static void emptyBufferDoneCallback(void *userdata, COMPONENT_T *comp);

  NAN_INLINE static NAUV_WORK_CB(asyncEmptyBufferDone) {
    COMPONENT *obj = static_cast<COMPONENT*> (async->data);
    if (obj->lastEmptyBufferCallback != NULL) {
      obj->lastEmptyBufferCallback->Call(0, 0);
      obj->lastEmptyBufferCallback = NULL;
    }
  }

  static NAN_METHOD(New);
  
  static NAN_METHOD(setPorts);
  static NAN_GETTER(_in_port);
  static NAN_GETTER(_out_port);
  
  static NAN_METHOD(changeState);
  static NAN_METHOD(getState);
  static NAN_METHOD(getParameter);
  static NAN_METHOD(setParameter);

  static NAN_METHOD(enableInputPort);
  static NAN_METHOD(enableOutputPort);
  static NAN_METHOD(enableInputPortBuffer);
  static NAN_METHOD(enableOutputPortBuffer);
  static NAN_METHOD(disableInputPort);
  static NAN_METHOD(disableOutputPort);
  static NAN_METHOD(disableInputPortBuffer);
  static NAN_METHOD(disableOutputPortBuffer);

  void enablePort(int port);
  void enablePortBuffer(int port);
  void disablePort(int port);
  void disablePortBuffer(int port);

  static NAN_METHOD(getInputBuffer);
  static NAN_METHOD(emptyBuffer);
  static NAN_METHOD(waitForEvent);

  static Nan::Persistent<v8::Function> constructor;
};
