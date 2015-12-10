//https://github.com/fcanas/node-native-boilerplate
//https://github.com/nodejs/nan/blob/master/doc/object_wrappers.md
//https://gist.github.com/bellbind/a68620383e0180b3afc6

#include <nan.h>
#include <unistd.h>

#include "main.h"

#include "init.h"

#include "test/VideoDecoder.h"
#include "test/VideoRender.h"

using v8::Value;
using v8::Local;
using v8::Function;
using v8::FunctionTemplate;
using v8::String;

class Parent : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

private:
  explicit Parent();
  ~Parent();

  static NAN_METHOD(New);
  static NAN_METHOD(setValue);
  static NAN_METHOD(getValue);
  static Nan::Persistent<v8::Function> constructor;
  int value;
};
Nan::Persistent<v8::Function> Parent::constructor;

NAN_MODULE_INIT(Parent::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Parent").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "setValue", setValue);
  Nan::SetPrototypeMethod(tpl, "getValue", getValue);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Parent").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

Parent::Parent() {
}

Parent::~Parent() {
}

NAN_METHOD(Parent::New) {
  if (info.IsConstructCall()) {
    Parent *obj = new Parent();
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(Parent::setValue) {
  int value = info[0]->IsUndefined() ? 0 : Nan::To<int>(info[0]).FromJust();
  Parent* obj = Nan::ObjectWrap::Unwrap<Parent>(info.This());
  obj->value = value;
}

NAN_METHOD(Parent::getValue) {
  Parent* obj = Nan::ObjectWrap::Unwrap<Parent>(info.This());
  info.GetReturnValue().Set(obj->value);
}







void play(const Nan::FunctionCallbackInfo<Value>& info) {
  String::Utf8Value filePath(info[0]);

  FILE *in;
  if ((in = fopen(*filePath, "rb")) == NULL) {
    printf("%s not found \n", *filePath);
    return;
  }

  VideoDecoder* vd = new VideoDecoder();
  vd->createComponent();
  vd->changeState(OMX_StateIdle);

  VideoRender* vr = new VideoRender();
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
  Nan::Set(target, Nan::New("bcm_host_init").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::bcm_host_init)).ToLocalChecked());
  Nan::Set(target, Nan::New("bcm_host_deinit").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::bcm_host_deinit)).ToLocalChecked());

  Nan::Set(target, Nan::New("play").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(play)).ToLocalChecked());

  Parent::Init(target);
}

NODE_MODULE(Node_OMX, Init)