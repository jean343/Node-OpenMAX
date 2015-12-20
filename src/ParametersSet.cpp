#include "Parameters.h"

void SET_OMX_AUDIO_PORTDEFINITIONTYPE(OMX_AUDIO_PORTDEFINITIONTYPE &format, v8::Local<v8::Object> obj) {
  format.pNativeRender = (OMX_NATIVE_DEVICETYPE) Nan::To<int>(Nan::Get(obj, Nan::New("pNativeRender").ToLocalChecked()).ToLocalChecked()).FromJust(); // < platform specific reference for an output device, otherwise this field is 0
  format.bFlagErrorConcealment = (OMX_BOOL) Nan::To<int>(Nan::Get(obj, Nan::New("bFlagErrorConcealment").ToLocalChecked()).ToLocalChecked()).FromJust(); // Turns on error concealment if it is supported by the OMX component
  format.eEncoding = (OMX_AUDIO_CODINGTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eEncoding").ToLocalChecked()).ToLocalChecked()).FromJust(); // Type of data expected for this port (e.g. PCM, AMR, MP3, etc)
}

void SET_OMX_PARAM_PORTDEFINITIONTYPE(OMX_PARAM_PORTDEFINITIONTYPE &format, v8::Local<v8::Object> obj) {
  format.eDir = (OMX_DIRTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eDir").ToLocalChecked()).ToLocalChecked()).FromJust(); // Direction (input or output) of this port
  format.nBufferCountActual = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nBufferCountActual").ToLocalChecked()).ToLocalChecked()).FromJust(); // The actual number of buffers allocated on this port
  format.nBufferCountMin = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nBufferCountMin").ToLocalChecked()).ToLocalChecked()).FromJust(); // The minimum number of buffers this port requires
  format.nBufferSize = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nBufferSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // Size, in bytes, for buffers to be used for this channel
  format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(obj, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust(); // Ports default to enabled and are enabled/disabled by OMX_CommandPortEnable/OMX_CommandPortDisable. When disabled a port is unpopulated. A disabled port is not populated with buffers on a transition to IDLE.
  format.bPopulated = (OMX_BOOL) Nan::To<int>(Nan::Get(obj, Nan::New("bPopulated").ToLocalChecked()).ToLocalChecked()).FromJust(); // Port is populated with all of its buffers as indicated by nBufferCountActual. A disabled port is always unpopulated. An enabled port is populated on a transition to OMX_StateIdle and unpopulated on a transition to loaded.
  format.eDomain = (OMX_PORTDOMAINTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eDomain").ToLocalChecked()).ToLocalChecked()).FromJust(); // Domain of the port. Determines the contents of metadata below.
}

void SET_OMX_IMAGE_PORTDEFINITIONTYPE(OMX_IMAGE_PORTDEFINITIONTYPE &format, v8::Local<v8::Object> obj) {
  format.pNativeRender = (OMX_NATIVE_DEVICETYPE) Nan::To<int>(Nan::Get(obj, Nan::New("pNativeRender").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nFrameWidth = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nFrameWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nFrameHeight = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nFrameHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nStride = (OMX_S32) Nan::To<int>(Nan::Get(obj, Nan::New("nStride").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nSliceHeight = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nSliceHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.bFlagErrorConcealment = (OMX_BOOL) Nan::To<int>(Nan::Get(obj, Nan::New("bFlagErrorConcealment").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eCompressionFormat = (OMX_IMAGE_CODINGTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.pNativeWindow = (OMX_NATIVE_WINDOWTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("pNativeWindow").ToLocalChecked()).ToLocalChecked()).FromJust();
}

void SET_OMX_OTHER_PORTDEFINITIONTYPE(OMX_OTHER_PORTDEFINITIONTYPE &format, v8::Local<v8::Object> obj) {
  format.eFormat = (OMX_OTHER_FORMATTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eFormat").ToLocalChecked()).ToLocalChecked()).FromJust(); // Type of data expected for this channel
}

void SET_OMX_VIDEO_PORTDEFINITIONTYPE(OMX_VIDEO_PORTDEFINITIONTYPE &format, v8::Local<v8::Object> obj) {
  format.pNativeRender = (OMX_NATIVE_DEVICETYPE) Nan::To<int>(Nan::Get(obj, Nan::New("pNativeRender").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nFrameWidth = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nFrameWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nFrameHeight = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nFrameHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nStride = (OMX_S32) Nan::To<int>(Nan::Get(obj, Nan::New("nStride").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nSliceHeight = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nSliceHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.nBitrate = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nBitrate").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.xFramerate = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.bFlagErrorConcealment = (OMX_BOOL) Nan::To<int>(Nan::Get(obj, Nan::New("bFlagErrorConcealment").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.pNativeWindow = (OMX_NATIVE_WINDOWTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("pNativeWindow").ToLocalChecked()).ToLocalChecked()).FromJust();
}

void SET_OMX_VIDEO_PARAM_PORTFORMATTYPE(OMX_VIDEO_PARAM_PORTFORMATTYPE &format, v8::Local<v8::Object> obj) {
  format.nIndex = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(obj, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.xFramerate = (OMX_U32) Nan::To<int>(Nan::Get(obj, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();
}

void Parameters::SetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex, v8::Local<v8::Object> param) {
  switch (nParamIndex) {
    case OMX_IndexParamPortDefinition:
    {
      OMX_PARAM_PORTDEFINITIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eDir = (OMX_DIRTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDir").ToLocalChecked()).ToLocalChecked()).FromJust(); // Direction (input or output) of this port
      format.nBufferCountActual = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBufferCountActual").ToLocalChecked()).ToLocalChecked()).FromJust(); // The actual number of buffers allocated on this port
      format.nBufferCountMin = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBufferCountMin").ToLocalChecked()).ToLocalChecked()).FromJust(); // The minimum number of buffers this port requires
      format.nBufferSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBufferSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // Size, in bytes, for buffers to be used for this channel
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust(); // Ports default to enabled and are enabled/disabled by OMX_CommandPortEnable/OMX_CommandPortDisable. When disabled a port is unpopulated. A disabled port is not populated with buffers on a transition to IDLE.
      format.bPopulated = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bPopulated").ToLocalChecked()).ToLocalChecked()).FromJust(); // Port is populated with all of its buffers as indicated by nBufferCountActual. A disabled port is always unpopulated. An enabled port is populated on a transition to OMX_StateIdle and unpopulated on a transition to loaded.
      format.eDomain = (OMX_PORTDOMAINTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDomain").ToLocalChecked()).ToLocalChecked()).FromJust(); // Domain of the port. Determines the contents of metadata below.
      if (format.eDomain == OMX_PortDomainAudio) {
        v8::Local<v8::Object> obj = Nan::To<v8::Object>(Nan::Get(param, Nan::New("audio").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();
        SET_OMX_AUDIO_PORTDEFINITIONTYPE(format.format.audio, obj);
      }
      if (format.eDomain == OMX_PortDomainVideo) {
        v8::Local<v8::Object> obj = Nan::To<v8::Object>(Nan::Get(param, Nan::New("video").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();
        SET_OMX_VIDEO_PORTDEFINITIONTYPE(format.format.video, obj);
      }
      if (format.eDomain == OMX_PortDomainImage) {
        v8::Local<v8::Object> obj = Nan::To<v8::Object>(Nan::Get(param, Nan::New("image").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();
        SET_OMX_IMAGE_PORTDEFINITIONTYPE(format.format.image, obj);
      }
      if (format.eDomain == OMX_PortDomainOther) {
        v8::Local<v8::Object> obj = Nan::To<v8::Object>(Nan::Get(param, Nan::New("other").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();
        SET_OMX_OTHER_PORTDEFINITIONTYPE(format.format.other, obj);
      }

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoPortFormat:
    {
      OMX_VIDEO_PARAM_PORTFORMATTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.xFramerate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    default:
      break;
  }
}
