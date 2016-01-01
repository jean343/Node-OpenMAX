#include "ILCLIENT.h"
Nan::Persistent<v8::Function> ILCLIENT::constructor;

#include "log.h"
#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

#include "OMX_consts.h"

NAN_MODULE_INIT(ILCLIENT::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("ILCLIENT").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("ILCLIENT").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

ILCLIENT::ILCLIENT() {
  plog("ILCLIENT()");
  if ((client = ilclient_init()) == NULL) {
    Nan::ThrowError("ilclient_init() is NULL");
    return;
  }

  OMX_ERRORTYPE rc = OMX_Init();
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "OMX_Init() returned error: %s, have you called bcm_host_init?", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    ilclient_destroy(client);
    return;
  }
}

ILCLIENT::~ILCLIENT() {
  plog("~ILCLIENT()");
  ilclient_destroy(client);
}

NAN_METHOD(ILCLIENT::New) {
  if (info.IsConstructCall()) {
    ILCLIENT *obj = new ILCLIENT();
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}