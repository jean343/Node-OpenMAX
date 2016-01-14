#include "init.h"

#include "bcm_host.h"
#include "OMX_consts.h"

using v8::Value;

namespace NodeOMX {

  void bcm_host_init(const Nan::FunctionCallbackInfo<Value>& info) {
    ::bcm_host_init();
  }

  void bcm_host_deinit(const Nan::FunctionCallbackInfo<Value>& info) {
    ::bcm_host_deinit();
  }

  void OMX_Init(const Nan::FunctionCallbackInfo<Value>& info) {
    OMX_ERRORTYPE rc = ::OMX_Init();
    if (rc != OMX_ErrorNone) {
      char buf[255];
      sprintf(buf, "OMX_Init() returned error: %s, have you called bcm_host_init?", OMX_consts::err2str(rc));
      Nan::ThrowError(buf);
      return;
    }
  }
  void OMX_Deinit(const Nan::FunctionCallbackInfo<Value>& info) {
    OMX_ERRORTYPE rc = ::OMX_Deinit();
    if (rc != OMX_ErrorNone) {
      char buf[255];
      sprintf(buf, "OMX_Deinit() returned error: %s", OMX_consts::err2str(rc));
      Nan::ThrowError(buf);
      return;
    }
  }
}