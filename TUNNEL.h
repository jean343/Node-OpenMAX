#pragma once

#include <nan.h>

class TUNNEL : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  TUNNEL_T tunnel;
private:
  explicit TUNNEL();
  ~TUNNEL();

  static NAN_METHOD(New);
  static NAN_METHOD(set);
  static Nan::Persistent<v8::Function> constructor;
};
