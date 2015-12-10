#include "BUFFERHEADERTYPE.h"
Nan::Persistent<v8::Function> BUFFERHEADERTYPE::constructor;

NAN_MODULE_INIT(BUFFERHEADERTYPE::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("BUFFERHEADERTYPE").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "setValue", setValue);
  Nan::SetPrototypeMethod(tpl, "getValue", getValue);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("BUFFERHEADERTYPE").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

BUFFERHEADERTYPE::BUFFERHEADERTYPE(OMX_BUFFERHEADERTYPE* buf) {
  this->buf = buf;
}

BUFFERHEADERTYPE::~BUFFERHEADERTYPE() {
}

NAN_METHOD(BUFFERHEADERTYPE::New) {
  if (info.IsConstructCall()) {
    OMX_BUFFERHEADERTYPE* buf = (OMX_BUFFERHEADERTYPE*) (v8::Local<v8::External>::Cast(info[0])->Value());

    BUFFERHEADERTYPE *obj = new BUFFERHEADERTYPE(buf);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(BUFFERHEADERTYPE::setValue) {
  int value = info[0]->IsUndefined() ? 0 : Nan::To<int>(info[0]).FromJust();
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  obj->value = value;
}

NAN_METHOD(BUFFERHEADERTYPE::getValue) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  info.GetReturnValue().Set(obj->value);
}