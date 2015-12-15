#include "Parameters.h"

v8::Local<v8::Object> Parameters::GetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();

  switch (nParamIndex) {
    case OMX_IndexParamPortDefinition:
    {
      OMX_PARAM_PORTDEFINITIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);

      Nan::Set(ret, Nan::New("eDir").ToLocalChecked(), Nan::New(format.eDir));
      Nan::Set(ret, Nan::New("nBufferCountActual").ToLocalChecked(), Nan::New(format.nBufferCountActual));
      Nan::Set(ret, Nan::New("nBufferCountMin").ToLocalChecked(), Nan::New(format.nBufferCountMin));
      Nan::Set(ret, Nan::New("nBufferSize").ToLocalChecked(), Nan::New(format.nBufferSize));
      Nan::Set(ret, Nan::New("bEnabled").ToLocalChecked(), Nan::New(format.bEnabled));
      Nan::Set(ret, Nan::New("bPopulated").ToLocalChecked(), Nan::New(format.bPopulated));
      Nan::Set(ret, Nan::New("eDomain").ToLocalChecked(), Nan::New(format.eDomain));
    }
      break;
    case OMX_IndexParamVideoPortFormat:
    {
      OMX_VIDEO_PARAM_PORTFORMATTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);

      Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex));
      Nan::Set(ret, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.eCompressionFormat));
      Nan::Set(ret, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.eColorFormat));
      Nan::Set(ret, Nan::New("xFramerate").ToLocalChecked(), Nan::New(format.xFramerate));
    }
      break;
  }

  return scope.Escape(ret);
}

void Parameters::SetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex, v8::Local<v8::Object> param) {

  switch (nParamIndex) {
    case OMX_IndexParamPortDefinition:
    {
      OMX_PARAM_PORTDEFINITIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      format.eDir = (OMX_DIRTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDir").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferCountActual = (int) Nan::To<int>(Nan::Get(param, Nan::New("nBufferCountActual").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferCountMin = (int) Nan::To<int>(Nan::Get(param, Nan::New("nBufferCountMin").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferSize = (int) Nan::To<int>(Nan::Get(param, Nan::New("nBufferSize").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bPopulated = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bPopulated").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eDomain = (OMX_PORTDOMAINTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDomain").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoPortFormat:
    {
      OMX_VIDEO_PARAM_PORTFORMATTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      format.nIndex = (int) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.xFramerate = (int) Nan::To<int>(Nan::Get(param, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();
      
      SetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
  }
}