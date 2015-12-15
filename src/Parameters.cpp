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

      if (format.eDomain == OMX_PortDomainVideo) {
        v8::Local<v8::Object> video = Nan::New<v8::Object>();

        //        Nan::Set(video, Nan::New("pNativeRender").ToLocalChecked(), Nan::New(format.format.video.pNativeRender));
        Nan::Set(video, Nan::New("nFrameWidth").ToLocalChecked(), Nan::New(format.format.video.nFrameWidth));
        Nan::Set(video, Nan::New("nFrameHeight").ToLocalChecked(), Nan::New(format.format.video.nFrameHeight));
        Nan::Set(video, Nan::New("nStride").ToLocalChecked(), Nan::New(format.format.video.nStride));
        Nan::Set(video, Nan::New("nSliceHeight").ToLocalChecked(), Nan::New(format.format.video.nSliceHeight));
        Nan::Set(video, Nan::New("nBitrate").ToLocalChecked(), Nan::New(format.format.video.nBitrate));
        Nan::Set(video, Nan::New("xFramerate").ToLocalChecked(), Nan::New(format.format.video.xFramerate));
        Nan::Set(video, Nan::New("bFlagErrorConcealment").ToLocalChecked(), Nan::New(format.format.video.bFlagErrorConcealment));
        Nan::Set(video, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.format.video.eCompressionFormat));
        Nan::Set(video, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.format.video.eColorFormat));
        //        Nan::Set(video, Nan::New("pNativeWindow").ToLocalChecked(), Nan::New(format.format.video.pNativeWindow));

        Nan::Set(ret, Nan::New("video").ToLocalChecked(), video);
      }

      Nan::Set(ret, Nan::New("bBuffersContiguous").ToLocalChecked(), Nan::New(format.bBuffersContiguous));
      Nan::Set(ret, Nan::New("nBufferAlignment").ToLocalChecked(), Nan::New(format.nBufferAlignment));
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
    default:
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

      if (format.eDomain == OMX_PortDomainVideo) {
        v8::Local<v8::Object> video = Nan::To<v8::Object>(Nan::Get(param, Nan::New("video").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();

        format.format.video.nFrameWidth = (int) Nan::To<int>(Nan::Get(video, Nan::New("nFrameWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nFrameHeight = (int) Nan::To<int>(Nan::Get(video, Nan::New("nFrameHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nStride = (int) Nan::To<int>(Nan::Get(video, Nan::New("nStride").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nSliceHeight = (int) Nan::To<int>(Nan::Get(video, Nan::New("nSliceHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nBitrate = (int) Nan::To<int>(Nan::Get(video, Nan::New("nBitrate").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.xFramerate = (int) Nan::To<int>(Nan::Get(video, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.bFlagErrorConcealment = (OMX_BOOL) Nan::To<int>(Nan::Get(video, Nan::New("bFlagErrorConcealment").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(video, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(video, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      }

      format.bBuffersContiguous = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bBuffersContiguous").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferAlignment = (int) Nan::To<int>(Nan::Get(param, Nan::New("nBufferAlignment").ToLocalChecked()).ToLocalChecked()).FromJust();

//      printf("format.eDir: %d\n", format.eDir);
//      printf("format.nBufferCountActual: %d\n", format.nBufferCountActual);
//      printf("format.nBufferCountMin: %d\n", format.nBufferCountMin);
//      printf("format.nBufferSize: %d\n", format.nBufferSize);
//      printf("format.bEnabled: %d\n", format.bEnabled);
//      printf("format.bPopulated: %d\n", format.bPopulated);
//      printf("format.eDomain: %d\n", format.eDomain);
//      printf("format.bBuffersContiguous: %d\n", format.bBuffersContiguous);
//      printf("format.nBufferAlignment: %d\n", format.nBufferAlignment);

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
    default:
      break;
  }
}