#include "COMPONENT.h"
#include "TUNNEL.h"
Nan::Persistent<v8::Function> TUNNEL::constructor;

#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

#include "OMX_consts.h"

NAN_MODULE_INIT(TUNNEL::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("TUNNEL").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "set", set);
  
  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("TUNNEL").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

TUNNEL::TUNNEL() {
  memset(&tunnel, 0, sizeof (tunnel));
}

TUNNEL::~TUNNEL() {
}

NAN_METHOD(TUNNEL::New) {
  if (info.IsConstructCall()) {
    TUNNEL *obj = new TUNNEL();
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(TUNNEL::set) {
  TUNNEL* tunnel = Nan::ObjectWrap::Unwrap<TUNNEL>(info.This());
  
  COMPONENT* _video_decode = Nan::ObjectWrap::Unwrap<COMPONENT>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  COMPONENT* _video_render = Nan::ObjectWrap::Unwrap<COMPONENT>(Nan::To<v8::Object>(info[1]).ToLocalChecked());
  
  set_tunnel(&tunnel->tunnel, _video_decode->component, _video_decode->out_port, _video_render->component, _video_render->in_port);
}