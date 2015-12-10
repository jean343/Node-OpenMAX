#include "Sample.h"
Nan::Persistent<v8::Function> Sample::constructor;

NAN_MODULE_INIT(Sample::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Sample").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "setValue", setValue);
  Nan::SetPrototypeMethod(tpl, "getValue", getValue);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Sample").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

Sample::Sample() {
}

Sample::~Sample() {
}

NAN_METHOD(Sample::New) {
  if (info.IsConstructCall()) {
    Sample *obj = new Sample();
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(Sample::setValue) {
  int value = info[0]->IsUndefined() ? 0 : Nan::To<int>(info[0]).FromJust();
  Sample* obj = Nan::ObjectWrap::Unwrap<Sample>(info.This());
  obj->value = value;
}

NAN_METHOD(Sample::getValue) {
  Sample* obj = Nan::ObjectWrap::Unwrap<Sample>(info.This());
  info.GetReturnValue().Set(obj->value);
}