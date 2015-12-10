#pragma once

#include <nan.h>

#include "ILCLIENT.h"
extern "C" {
#include "ilclient.h"
}

typedef struct _COMPONENT_T COMPONENT_T;

class COMPONENT : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  COMPONENT_T *component;
private:
  explicit COMPONENT(ILCLIENT* _client, char const *name, ILCLIENT_CREATE_FLAGS_T flags);
  ~COMPONENT();

  static NAN_METHOD(New);
  static Nan::Persistent<v8::Function> constructor;
};
