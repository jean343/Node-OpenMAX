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
private:
  explicit COMPONENT(ILCLIENT* _client, char const *name, ILCLIENT_CREATE_FLAGS_T flags);
  ~COMPONENT();

  static NAN_METHOD(New);
  static NAN_METHOD(setPorts);
  static NAN_METHOD(changeState);
  static Nan::Persistent<v8::Function> constructor;
};
