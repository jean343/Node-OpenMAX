#pragma once

#include <nan.h>

class MyObject : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static NAN_METHOD(New);
  static NAN_METHOD(PlusOne);
  static NAN_METHOD(SleepSync);
  static NAN_METHOD(Sleep);
  static Nan::Persistent<v8::Function> constructor;
  double value_;
};
