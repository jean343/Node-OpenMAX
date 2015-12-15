#pragma once

#include <nan.h>

#include "bcm_host.h"

#include "OMX_consts.h"

class Parameters {
public:
  static v8::Local<v8::Object> GetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex);
  static void SetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex, v8::Local<v8::Object> param);
};
