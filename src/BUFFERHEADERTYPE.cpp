#include "BUFFERHEADERTYPE.h"
Nan::Persistent<v8::Function> BUFFERHEADERTYPE::constructor;

NAN_MODULE_INIT(BUFFERHEADERTYPE::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("BUFFERHEADERTYPE").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("nAllocLen").ToLocalChecked(), nAllocLenGet);
  Nan::SetPrototypeMethod(tpl, "set", set);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("BUFFERHEADERTYPE").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

BUFFERHEADERTYPE::BUFFERHEADERTYPE(OMX_BUFFERHEADERTYPE* buf) : buf(buf), first_packet(true) {
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

NAN_GETTER(BUFFERHEADERTYPE::nAllocLenGet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  info.GetReturnValue().Set(obj->buf->nAllocLen);
}

NAN_METHOD(BUFFERHEADERTYPE::set) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  OMX_BUFFERHEADERTYPE* buf = obj->buf;

  v8::Local<v8::Object> bufferObj = info[0]->ToObject();
  char* bufferData = node::Buffer::Data(bufferObj);
  size_t bufferLength = node::Buffer::Length(bufferObj);

  if (bufferLength > buf->nAllocLen) { // bound check
    bufferLength = buf->nAllocLen;
  }
  
//  printf("memcpy(0x%p, 0x%p, %d);\n", buf->pBuffer, bufferData, bufferLength);
  
  memcpy(buf->pBuffer, bufferData, bufferLength);
  
  buf->nFilledLen = bufferLength;

  if (obj->first_packet) {
    buf->nFlags = OMX_BUFFERFLAG_STARTTIME;
    obj->first_packet = false;
  } else {
    buf->nFlags = OMX_BUFFERFLAG_TIME_UNKNOWN;
  }
  info.GetReturnValue().Set(info.This());
}