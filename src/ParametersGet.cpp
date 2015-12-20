#include "Parameters.h"

v8::Local<v8::Object> GET_OMX_AUDIO_PORTDEFINITIONTYPE(OMX_AUDIO_PORTDEFINITIONTYPE &format);
v8::Local<v8::Object> GET_OMX_PARAM_PORTDEFINITIONTYPE(OMX_PARAM_PORTDEFINITIONTYPE &format);
v8::Local<v8::Object> GET_OMX_IMAGE_PORTDEFINITIONTYPE(OMX_IMAGE_PORTDEFINITIONTYPE &format);
v8::Local<v8::Object> GET_OMX_OTHER_PORTDEFINITIONTYPE(OMX_OTHER_PORTDEFINITIONTYPE &format);
v8::Local<v8::Object> GET_OMX_VIDEO_PORTDEFINITIONTYPE(OMX_VIDEO_PORTDEFINITIONTYPE &format);
v8::Local<v8::Object> GET_OMX_VIDEO_PARAM_PORTFORMATTYPE(OMX_VIDEO_PARAM_PORTFORMATTYPE &format);

v8::Local<v8::Object> GET_OMX_AUDIO_PORTDEFINITIONTYPE(OMX_AUDIO_PORTDEFINITIONTYPE &format) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();
  Nan::Set(ret, Nan::New("pNativeRender").ToLocalChecked(), Nan::New(format.pNativeRender)); // < platform specific reference for an output device, otherwise this field is 0
  Nan::Set(ret, Nan::New("bFlagErrorConcealment").ToLocalChecked(), Nan::New(format.bFlagErrorConcealment)); // Turns on error concealment if it is supported by the OMX component
  Nan::Set(ret, Nan::New("eEncoding").ToLocalChecked(), Nan::New(format.eEncoding)); // Type of data expected for this port (e.g. PCM, AMR, MP3, etc)
  return scope.Escape(ret);
}

v8::Local<v8::Object> GET_OMX_PARAM_PORTDEFINITIONTYPE(OMX_PARAM_PORTDEFINITIONTYPE &format) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();
  Nan::Set(ret, Nan::New("eDir").ToLocalChecked(), Nan::New(format.eDir)); // Direction (input or output) of this port
  Nan::Set(ret, Nan::New("nBufferCountActual").ToLocalChecked(), Nan::New(format.nBufferCountActual)); // The actual number of buffers allocated on this port
  Nan::Set(ret, Nan::New("nBufferCountMin").ToLocalChecked(), Nan::New(format.nBufferCountMin)); // The minimum number of buffers this port requires
  Nan::Set(ret, Nan::New("nBufferSize").ToLocalChecked(), Nan::New(format.nBufferSize)); // Size, in bytes, for buffers to be used for this channel
  Nan::Set(ret, Nan::New("bEnabled").ToLocalChecked(), Nan::New(format.bEnabled)); // Ports default to enabled and are enabled/disabled by OMX_CommandPortEnable/OMX_CommandPortDisable. When disabled a port is unpopulated. A disabled port is not populated with buffers on a transition to IDLE.
  Nan::Set(ret, Nan::New("bPopulated").ToLocalChecked(), Nan::New(format.bPopulated)); // Port is populated with all of its buffers as indicated by nBufferCountActual. A disabled port is always unpopulated. An enabled port is populated on a transition to OMX_StateIdle and unpopulated on a transition to loaded.
  Nan::Set(ret, Nan::New("eDomain").ToLocalChecked(), Nan::New(format.eDomain)); // Domain of the port. Determines the contents of metadata below.
  if (format.eDomain == OMX_PortDomainAudio) {
    Nan::Set(ret, Nan::New("audio").ToLocalChecked(), GET_OMX_AUDIO_PORTDEFINITIONTYPE(format.format.audio));
  }
  if (format.eDomain == OMX_PortDomainVideo) {
    Nan::Set(ret, Nan::New("video").ToLocalChecked(), GET_OMX_VIDEO_PORTDEFINITIONTYPE(format.format.video));
  }
  if (format.eDomain == OMX_PortDomainImage) {
    Nan::Set(ret, Nan::New("image").ToLocalChecked(), GET_OMX_IMAGE_PORTDEFINITIONTYPE(format.format.image));
  }
  if (format.eDomain == OMX_PortDomainOther) {
    Nan::Set(ret, Nan::New("other").ToLocalChecked(), GET_OMX_OTHER_PORTDEFINITIONTYPE(format.format.other));
  }
  return scope.Escape(ret);
}

v8::Local<v8::Object> GET_OMX_IMAGE_PORTDEFINITIONTYPE(OMX_IMAGE_PORTDEFINITIONTYPE &format) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();
  Nan::Set(ret, Nan::New("pNativeRender").ToLocalChecked(), Nan::New(format.pNativeRender));
  Nan::Set(ret, Nan::New("nFrameWidth").ToLocalChecked(), Nan::New(format.nFrameWidth));
  Nan::Set(ret, Nan::New("nFrameHeight").ToLocalChecked(), Nan::New(format.nFrameHeight));
  Nan::Set(ret, Nan::New("nStride").ToLocalChecked(), Nan::New(format.nStride));
  Nan::Set(ret, Nan::New("nSliceHeight").ToLocalChecked(), Nan::New(format.nSliceHeight));
  Nan::Set(ret, Nan::New("bFlagErrorConcealment").ToLocalChecked(), Nan::New(format.bFlagErrorConcealment));
  Nan::Set(ret, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.eCompressionFormat));
  Nan::Set(ret, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.eColorFormat));
  Nan::Set(ret, Nan::New("pNativeWindow").ToLocalChecked(), Nan::New(format.pNativeWindow));
  return scope.Escape(ret);
}

v8::Local<v8::Object> GET_OMX_OTHER_PORTDEFINITIONTYPE(OMX_OTHER_PORTDEFINITIONTYPE &format) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();
  Nan::Set(ret, Nan::New("eFormat").ToLocalChecked(), Nan::New(format.eFormat)); // Type of data expected for this channel
  return scope.Escape(ret);
}

v8::Local<v8::Object> GET_OMX_VIDEO_PORTDEFINITIONTYPE(OMX_VIDEO_PORTDEFINITIONTYPE &format) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();
  Nan::Set(ret, Nan::New("pNativeRender").ToLocalChecked(), Nan::New(format.pNativeRender));
  Nan::Set(ret, Nan::New("nFrameWidth").ToLocalChecked(), Nan::New(format.nFrameWidth));
  Nan::Set(ret, Nan::New("nFrameHeight").ToLocalChecked(), Nan::New(format.nFrameHeight));
  Nan::Set(ret, Nan::New("nStride").ToLocalChecked(), Nan::New(format.nStride));
  Nan::Set(ret, Nan::New("nSliceHeight").ToLocalChecked(), Nan::New(format.nSliceHeight));
  Nan::Set(ret, Nan::New("nBitrate").ToLocalChecked(), Nan::New(format.nBitrate));
  Nan::Set(ret, Nan::New("xFramerate").ToLocalChecked(), Nan::New(format.xFramerate));
  Nan::Set(ret, Nan::New("bFlagErrorConcealment").ToLocalChecked(), Nan::New(format.bFlagErrorConcealment));
  Nan::Set(ret, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.eCompressionFormat));
  Nan::Set(ret, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.eColorFormat));
  Nan::Set(ret, Nan::New("pNativeWindow").ToLocalChecked(), Nan::New(format.pNativeWindow));
  return scope.Escape(ret);
}

v8::Local<v8::Object> GET_OMX_VIDEO_PARAM_PORTFORMATTYPE(OMX_VIDEO_PARAM_PORTFORMATTYPE &format) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();
  Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex));
  Nan::Set(ret, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.eCompressionFormat));
  Nan::Set(ret, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.eColorFormat));
  Nan::Set(ret, Nan::New("xFramerate").ToLocalChecked(), Nan::New(format.xFramerate));
  return scope.Escape(ret);
}

v8::Local<v8::Object> Parameters::GetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();

  switch (nParamIndex) {
    case OMX_IndexParamPortDefinition:
    {
      OMX_PARAM_PORTDEFINITIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      return scope.Escape(GET_OMX_PARAM_PORTDEFINITIONTYPE(format));
    }
      break;
    case OMX_IndexParamVideoPortFormat:
    {
      OMX_VIDEO_PARAM_PORTFORMATTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      return scope.Escape(GET_OMX_VIDEO_PARAM_PORTFORMATTYPE(format));
    }
      break;
    default:
      break;
  }
  return scope.Escape(ret);
}
