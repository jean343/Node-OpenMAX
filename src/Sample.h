#pragma once

#include <nan.h>

class Sample : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

private:
  explicit Sample();
  ~Sample();

  static NAN_METHOD(New);
  static NAN_METHOD(setValue);
  static NAN_METHOD(getValue);
  static Nan::Persistent<v8::Function> constructor;
  int value;
};
