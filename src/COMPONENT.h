#pragma once

#include <nan.h>

#include "ILCLIENT.h"
extern "C" {
#include "ilclient.h"
}

#include "log.h"

class COMPONENT : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  COMPONENT_T *component;
  OMX_HANDLETYPE handle;
  int in_port;
  int out_port;

  uv_async_t *asyncEmpty, *asyncFill;
  Nan::Callback *lastEmptyBufferCallback;
  Nan::Callback *lastFillBufferCallback;
private:
  explicit COMPONENT(ILCLIENT* _client, char const *name, ILCLIENT_CREATE_FLAGS_T flags);
  ~COMPONENT();

  static void emptyBufferDoneCallback(void *userdata, COMPONENT_T *comp);
  static void fillBufferDoneCallback(void *userdata, COMPONENT_T *comp);

  NAN_INLINE static NAUV_WORK_CB(asyncEmptyBufferDone) {
    Nan::HandleScope scope;
    COMPONENT *obj = static_cast<COMPONENT*> (async->data);
    log("asyncEmptyBufferDone(0x%p, 0x%p)", obj, obj->lastEmptyBufferCallback);
    if (obj->lastEmptyBufferCallback != NULL) {
      Nan::Callback *callback = obj->lastEmptyBufferCallback;
      obj->lastEmptyBufferCallback = NULL;
      callback->Call(0, 0);
    }
  }

  NAN_INLINE static NAUV_WORK_CB(asyncFillBufferDone) {
    Nan::HandleScope scope;
    COMPONENT *obj = static_cast<COMPONENT*> (async->data);
    log("asyncFillBufferDone(0x%p, 0x%p)", obj, obj->lastFillBufferCallback);
    if (obj->lastFillBufferCallback != NULL) {
      Nan::Callback *callback = obj->lastFillBufferCallback;
      obj->lastFillBufferCallback = NULL;
      callback->Call(0, 0);
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
  static NAN_METHOD(getOutputBuffer);
  static NAN_METHOD(emptyBuffer);
  static NAN_METHOD(fillBuffer);
  static NAN_METHOD(waitForEvent);

  static Nan::Persistent<v8::Function> constructor;
};
