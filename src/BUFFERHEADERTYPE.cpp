#include "BUFFERHEADERTYPE.h"
#include "log.h"
Nan::Persistent<v8::Function> BUFFERHEADERTYPE::constructor;

NAN_MODULE_INIT(BUFFERHEADERTYPE::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("BUFFERHEADERTYPE").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("nAllocLen").ToLocalChecked(), nAllocLenGet, nAllocLenSet);
  Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("nFilledLen").ToLocalChecked(), nFilledLenGet, nFilledLenSet);
  Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("nOffset").ToLocalChecked(), nOffsetGet, nOffsetSet);
  Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("nFlags").ToLocalChecked(), nFlagsGet, nFlagsSet);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("BUFFERHEADERTYPE").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

BUFFERHEADERTYPE::BUFFERHEADERTYPE(OMX_BUFFERHEADERTYPE* buf) : buf(buf), first_packet(true) {
  plog("BUFFERHEADERTYPE(%p)", this);
}

BUFFERHEADERTYPE::~BUFFERHEADERTYPE() {
  plog("~BUFFERHEADERTYPE(%p)", this);
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

NAN_GETTER(BUFFERHEADERTYPE::nAllocLenGet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  info.GetReturnValue().Set(obj->buf->nAllocLen);
}

NAN_SETTER(BUFFERHEADERTYPE::nAllocLenSet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  int nAllocLen = Nan::To<int>(value).FromJust();
  obj->buf->nAllocLen = nAllocLen;
}

NAN_GETTER(BUFFERHEADERTYPE::nFilledLenGet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  info.GetReturnValue().Set(obj->buf->nFilledLen);
}

NAN_SETTER(BUFFERHEADERTYPE::nFilledLenSet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  int nFilledLen = Nan::To<int>(value).FromJust();
  obj->buf->nFilledLen = nFilledLen;
}

NAN_GETTER(BUFFERHEADERTYPE::nOffsetGet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  info.GetReturnValue().Set(obj->buf->nOffset);
}

NAN_SETTER(BUFFERHEADERTYPE::nOffsetSet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  int nOffset = Nan::To<int>(value).FromJust();
  obj->buf->nOffset = nOffset;
}

NAN_GETTER(BUFFERHEADERTYPE::nFlagsGet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  info.GetReturnValue().Set(obj->buf->nFlags);
}

NAN_SETTER(BUFFERHEADERTYPE::nFlagsSet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  int nFlags = Nan::To<int>(value).FromJust();
  obj->buf->nFlags = nFlags;
}