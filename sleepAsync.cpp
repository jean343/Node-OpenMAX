#include <nan.h>
#include <unistd.h>

#include "sleepAsync.h"

using v8::Value;
using v8::Local;
using v8::Function;
using v8::FunctionTemplate;

NAN_METHOD(MyObject::Sleep) {
  MyObject* obj = Nan::ObjectWrap::Unwrap<MyObject>(info.This());

  int value = info[0]->IsUndefined() ? 0 : Nan::To<int>(info[0]).FromJust();

  Local<Function> callbackHandle = info[1].As<Function>();
  Nan::Callback *callback = new Nan::Callback(callbackHandle);

  //  Nan::MakeCallback(Nan::GetCurrentContext()->Global(), callbackHandle, 0, 0);
  Nan::AsyncQueueWorker(new AsyncSleepWorker(callback, obj, value));
}

void AsyncSleepWorker::Execute() {
  sleep(value);
}