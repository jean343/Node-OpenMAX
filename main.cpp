//https://github.com/fcanas/node-native-boilerplate
//https://github.com/nodejs/nan/blob/master/doc/object_wrappers.md
//https://gist.github.com/bellbind/a68620383e0180b3afc6

#include <nan.h>
#include <unistd.h>

#include "main.h"

#include "init.h"

#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

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

  TUNNEL_T tunnel;
  ILCLIENT_T *client;
  COMPONENT_T *video_decode, *video_render;
  memset(&tunnel, 0, sizeof (tunnel));

  if ((client = ilclient_init()) == NULL) {
    return;
  }

  if (OMX_Init() != OMX_ErrorNone) {
    ilclient_destroy(client);
    return;
  }

  // create video_decode
  if (ilclient_create_component(client, &video_decode, "video_decode", (ILCLIENT_CREATE_FLAGS_T) (ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_ENABLE_INPUT_BUFFERS)) != 0)
    return;

  // create video_render
  if (ilclient_create_component(client, &video_render, "video_render", ILCLIENT_DISABLE_ALL_PORTS) != 0)
    return;

  set_tunnel(&tunnel, video_decode, 131, video_render, 90);

  ilclient_change_component_state(video_decode, OMX_StateIdle);

  OMX_VIDEO_PARAM_PORTFORMATTYPE format;
  memset(&format, 0, sizeof (OMX_VIDEO_PARAM_PORTFORMATTYPE));
  format.nSize = sizeof (OMX_VIDEO_PARAM_PORTFORMATTYPE);
  format.nVersion.nVersion = OMX_VERSION;
  format.nPortIndex = 130;
  format.eCompressionFormat = OMX_VIDEO_CodingAVC;

  if (OMX_SetParameter(ILC_GET_HANDLE(video_decode), OMX_IndexParamVideoPortFormat, &format) == OMX_ErrorNone &&
          ilclient_enable_port_buffers(video_decode, 130, NULL, NULL, NULL) == 0) {

    ilclient_change_component_state(video_decode, OMX_StateExecuting);
  }

  bool port_settings_changed = false;
  bool first_packet = true;

  OMX_BUFFERHEADERTYPE *buf;
  while ((buf = ilclient_get_input_buffer(video_decode, 130, 1)) != NULL) {
    buf->nFilledLen = fread(buf->pBuffer, 1, buf->nAllocLen, in);

    if (port_settings_changed == false &&
            ((buf->nFilledLen > 0 && ilclient_remove_event(video_decode, OMX_EventPortSettingsChanged, 131, 0, 0, 1) == 0) ||
            (buf->nFilledLen == 0 && ilclient_wait_for_event(video_decode, OMX_EventPortSettingsChanged, 131, 0, 0, 1, ILCLIENT_EVENT_ERROR | ILCLIENT_PARAMETER_CHANGED, 10000) == 0))) {
      port_settings_changed = true;

      if (ilclient_setup_tunnel(&tunnel, 0, 0) != 0) {
        printf("ilclient_setup_tunnel 0 failed\n");
        return;
      }

      ilclient_change_component_state(video_render, OMX_StateExecuting);
    }

    printf("Got a filled buffer with %d, allocated %d\n", buf->nFilledLen, buf->nAllocLen);

    if (first_packet) {
      buf->nFlags = OMX_BUFFERFLAG_STARTTIME;
      first_packet = false;
    } else
      buf->nFlags = OMX_BUFFERFLAG_TIME_UNKNOWN;

    if (OMX_EmptyThisBuffer(ILC_GET_HANDLE(video_decode), buf) != OMX_ErrorNone) {
      printf("OMX_EmptyThisBuffer 1 failed\n");
      return;
    }
  }

  info.GetReturnValue().Set(Nan::New("world").ToLocalChecked());
}

NAN_MODULE_INIT(Init) {
  Nan::Set(target, Nan::New("bcm_host_init").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::bcm_host_init)).ToLocalChecked());
  Nan::Set(target, Nan::New("bcm_host_deinit").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::bcm_host_deinit)).ToLocalChecked());

  Nan::Set(target, Nan::New("play").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(play)).ToLocalChecked());

  Parent::Init(target);
}

NODE_MODULE(Node_OMX, Init)