//https://github.com/fcanas/node-native-boilerplate
//https://github.com/nodejs/nan/blob/master/doc/object_wrappers.md

#include <nan.h>
#include <unistd.h>

#include "main.h"
#include "sleepAsync.h"

#include "test/VideoDecoder.h"
#include "test/VideoRender.h"

using v8::Value;
using v8::Local;
using v8::Function;
using v8::FunctionTemplate;
using v8::String;

Nan::Persistent<v8::Function> MyObject::constructor;

NAN_MODULE_INIT(MyObject::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "plusOne", PlusOne);
  Nan::SetPrototypeMethod(tpl, "sleepSync", SleepSync);
  Nan::SetPrototypeMethod(tpl, "sleep", Sleep);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("MyObject").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

NAN_METHOD(MyObject::New) {
  if (info.IsConstructCall()) {
    double value = info[0]->IsUndefined() ? 0 : Nan::To<double>(info[0]).FromJust();
    MyObject *obj = new MyObject(value);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(MyObject::PlusOne) {
  MyObject* obj = Nan::ObjectWrap::Unwrap<MyObject>(info.This());
  obj->value_ += 1;
  info.GetReturnValue().Set(obj->value_);
}

NAN_METHOD(MyObject::SleepSync) {
  int value = info[0]->IsUndefined() ? 0 : Nan::To<int>(info[0]).FromJust();
  sleep(value);
}

void hello(const Nan::FunctionCallbackInfo<Value>& info) {
  String::Utf8Value filePath(info[0]);

  bcm_host_init();

  FILE *in;
  if ((in = fopen(*filePath, "rb")) == NULL) {
    printf("%s not found \n", *filePath);
    return;
  }

  ILCLIENT_T *clientHandle = ilclient_init();
  if (clientHandle == NULL) {
    fprintf(stderr, "IL client init failed\n");
    exit(1);
  }

  if (OMX_Init() != OMX_ErrorNone) {
    ilclient_destroy(clientHandle);
    fprintf(stderr, "OMX init failed\n");
    exit(1);
  }

  ilclient_set_error_callback(clientHandle, Component::error_callback, NULL);

  VideoDecoder* vd = new VideoDecoder(clientHandle);
  vd->createComponent();
  vd->changeState(OMX_StateIdle);

  VideoRender* vr = new VideoRender(clientHandle);
  vr->createComponent();
  vr->changeState(OMX_StateIdle);

  TUNNEL_T tunnel;
  memset(&tunnel, 0, sizeof (tunnel));
  set_tunnel(&tunnel, vd->component, vd->out_port, vr->component, vr->in_port);

  vd->setup();
  vd->enableInputPortBuffer();
  vd->changeState(OMX_StateExecuting);
  //  vd->enableOutputPortBuffer();

  int data_len = 0;
  unsigned char dest[1024 * 10];
  do {
    data_len = fread(dest, 1, sizeof (dest), in);
    if (vd->newPacket(dest, data_len)) {
      if (ilclient_setup_tunnel(&tunnel, 0, 0) != 0) {
        return;
      }
      vr->changeState(OMX_StateExecuting);
    }


  } while (data_len > 0);

  delete vd;











  info.GetReturnValue().Set(Nan::New("world").ToLocalChecked());
}

NAN_MODULE_INIT(Init) {
  Nan::Set(target, Nan::New("hello").ToLocalChecked(),
          Nan::GetFunction(Nan::New<FunctionTemplate>(hello)).ToLocalChecked());

  MyObject::Init(target);
}

NODE_MODULE(hello, Init)