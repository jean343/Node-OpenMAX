#include "Parameters.h"

v8::Local<v8::Object> Parameters::GetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();

  OMX_VIDEO_PARAM_PORTFORMATTYPE format;
  OMX_consts::InitOMXParams(&format, port);

  OMX_ERRORTYPE rc = OMX_GetParameter(*handle, nParamIndex, &format);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "getParameter() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return ret;
  }

  // Return object
  Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex));
  Nan::Set(ret, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.eCompressionFormat));
  Nan::Set(ret, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.eColorFormat));
  Nan::Set(ret, Nan::New("xFramerate").ToLocalChecked(), Nan::New(format.xFramerate));

  return scope.Escape(ret);
}

void Parameters::SetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex, v8::Local<v8::Object> param) {
  OMX_VIDEO_PARAM_PORTFORMATTYPE format;
  OMX_consts::InitOMXParams(&format, port);

  format.nIndex = (int) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.xFramerate = (int) Nan::To<int>(Nan::Get(param, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();

  OMX_ERRORTYPE rc = OMX_SetParameter(*handle, nParamIndex, &format);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "setParameter() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}