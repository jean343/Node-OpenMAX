#include "init.h"

#include "bcm_host.h"

using v8::Value;

namespace NodeOMX {

  void bcm_host_init(const Nan::FunctionCallbackInfo<Value>& info) {
    ::bcm_host_init();
  }
  void bcm_host_deinit(const Nan::FunctionCallbackInfo<Value>& info) {
    ::bcm_host_deinit();
  }
}