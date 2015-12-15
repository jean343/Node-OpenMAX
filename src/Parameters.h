#pragma once

#include <nan.h>

#include "bcm_host.h"

#include "OMX_consts.h"

class Parameters {
public:
  static v8::Local<v8::Object> GetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex);
  static void SetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex, v8::Local<v8::Object> param);
private:

  template<class T>
  static void GetParameterTemplate(T *format, int port, OMX_HANDLETYPE *handle, OMX_INDEXTYPE nParamIndex) {
    OMX_consts::InitOMXParams(format, port);

    OMX_ERRORTYPE rc = OMX_GetParameter(*handle, nParamIndex, format);
    if (rc != OMX_ErrorNone) {
      char buf[255];
      sprintf(buf, "getParameter() returned error: %s", OMX_consts::err2str(rc));
      Nan::ThrowError(buf);
      return;
    }
  }

  template<class T>
  static void SetParameterTemplate(T *format, int port, OMX_HANDLETYPE *handle, OMX_INDEXTYPE nParamIndex) {
    OMX_ERRORTYPE rc = OMX_SetParameter(*handle, nParamIndex, format);
    if (rc != OMX_ErrorNone) {
      char buf[255];
      sprintf(buf, "setParameter() returned error: %s", OMX_consts::err2str(rc));
      Nan::ThrowError(buf);
      return;
    }
  }
};
