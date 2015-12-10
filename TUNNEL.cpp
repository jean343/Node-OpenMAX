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

  Nan::SetPrototypeMethod(tpl, "enable", enable);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("TUNNEL").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

TUNNEL::TUNNEL(COMPONENT* source, COMPONENT* sink) {
  memset(&tunnel, 0, sizeof (tunnel));
  set_tunnel(&tunnel, source->component, source->out_port, sink->component, sink->in_port);
}

TUNNEL::~TUNNEL() {
}

NAN_METHOD(TUNNEL::New) {
  if (info.IsConstructCall()) {
    COMPONENT* source = Nan::ObjectWrap::Unwrap<COMPONENT>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
    COMPONENT* sink = Nan::ObjectWrap::Unwrap<COMPONENT>(Nan::To<v8::Object>(info[1]).ToLocalChecked());

    TUNNEL *obj = new TUNNEL(source, sink);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 2;
    v8::Local<v8::Value> argv[argc] = {info[0], info[1]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(TUNNEL::enable) {
  TUNNEL* tunnel = Nan::ObjectWrap::Unwrap<TUNNEL>(info.This());

  int rc = ilclient_setup_tunnel(&tunnel->tunnel, 0, 0);
  if (rc != 0) {
    char buf[255];
    sprintf(buf, "enable tunnel failed with rc: %d", rc);
    Nan::ThrowError(buf);
    return;
  }
}