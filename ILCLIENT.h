#pragma once

#include <nan.h>

typedef struct _ILCLIENT_T ILCLIENT_T;

class ILCLIENT : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  ILCLIENT_T *client;
private:
  explicit ILCLIENT();
  ~ILCLIENT();

  static NAN_METHOD(New);
  static Nan::Persistent<v8::Function> constructor;
};
