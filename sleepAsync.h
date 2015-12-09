#pragma once

#include <nan.h>
#include "main.h"

class AsyncSleepWorker : public Nan::AsyncWorker {
public:

  AsyncSleepWorker(Nan::Callback *callback, MyObject* obj, int value) : Nan::AsyncWorker(callback), obj(obj), value(value) {
  }

  ~AsyncSleepWorker() {
  }

  void Execute();

private:
  MyObject *obj;
  int value;
};