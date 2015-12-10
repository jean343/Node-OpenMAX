//https://github.com/fcanas/node-native-boilerplate
//https://github.com/nodejs/nan/blob/master/doc/object_wrappers.md
//https://gist.github.com/bellbind/a68620383e0180b3afc6

#include <nan.h>
#include <unistd.h>

#include "main.h"

#include "init.h"
#include "ILCLIENT.h"
#include "COMPONENT.h"
#include "TUNNEL.h"

#include "Sample.h"

#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

using v8::Value;
using v8::Local;
using v8::Function;
using v8::FunctionTemplate;
using v8::String;

void play(const Nan::FunctionCallbackInfo<Value>& info) {
  String::Utf8Value filePath(info[0]);
  
  COMPONENT* _video_decode = Nan::ObjectWrap::Unwrap<COMPONENT>(Nan::To<v8::Object>(info[1]).ToLocalChecked());
  COMPONENT_T *video_decode = _video_decode->component;
  
  COMPONENT* _video_render = Nan::ObjectWrap::Unwrap<COMPONENT>(Nan::To<v8::Object>(info[2]).ToLocalChecked());
  COMPONENT_T *video_render = _video_render->component;
  
  TUNNEL* _tunnel = Nan::ObjectWrap::Unwrap<TUNNEL>(Nan::To<v8::Object>(info[3]).ToLocalChecked());
  TUNNEL_T *tunnel = &_tunnel->tunnel;

  FILE *in;
  if ((in = fopen(*filePath, "rb")) == NULL) {
    printf("%s not found \n", *filePath);
    return;
  }

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
      
      if (ilclient_setup_tunnel(tunnel, 0, 0) != 0) {
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

  ILCLIENT::Init(target);
  COMPONENT::Init(target);
  TUNNEL::Init(target);

  Sample::Init(target);
}

NODE_MODULE(Node_OMX, Init)