#include "COMPONENTTYPE.h"
#include "BUFFERHEADERTYPE.h"
#include "OMX_consts.h"
#include "Parameters.h"
#include "log.h"

#include <stdio.h>

using v8::String;
using v8::Local;
using v8::Value;
using v8::Function;
using v8::Object;

Nan::Persistent<v8::Function> COMPONENTTYPE::constructor;

NAN_MODULE_INIT(COMPONENTTYPE::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("COMPONENTTYPE").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "changeState", changeState);
  Nan::SetPrototypeMethod(tpl, "getState", getState);
  Nan::SetPrototypeMethod(tpl, "getParameter", getParameter);
  Nan::SetPrototypeMethod(tpl, "setParameter", setParameter);
  Nan::SetPrototypeMethod(tpl, "sendCommand", sendCommand);
  Nan::SetPrototypeMethod(tpl, "useBuffer", useBuffer);
  Nan::SetPrototypeMethod(tpl, "emptyBuffer", emptyBuffer);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("COMPONENTTYPE").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

COMPONENTTYPE::COMPONENTTYPE(char const *name) {
  OMX_ERRORTYPE rc;
  OMX_CALLBACKTYPE callbacks;

#define COMP_PREFIX "OMX.broadcom."

  snprintf(this->name, sizeof (this->name), "%s", name);
  snprintf(component_name, sizeof (component_name), "%s%s", COMP_PREFIX, name);

  callbacks.EventHandler = event_handler;
  callbacks.EmptyBufferDone = empty_buffer_done;
  callbacks.FillBufferDone = fill_buffer_done;

  memset(&comp, 0, sizeof (OMX_HANDLETYPE));
  rc = OMX_GetHandle(&comp, component_name, this, &callbacks);

  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "OMX_GetState() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }

  uv_mutex_init(&lock);
  uv_async_init(uv_default_loop(), &uvEventHandler, eventHandlerDone);
  uvEventHandler.data = this;
}

COMPONENTTYPE::~COMPONENTTYPE() {
  OMX_ERRORTYPE rc;
  rc = OMX_FreeHandle(comp);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "OMX_FreeHandle() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}

NAN_METHOD(COMPONENTTYPE::New) {
  if (info.IsConstructCall()) {
    String::Utf8Value name(info[0]);

    COMPONENTTYPE *obj = new COMPONENTTYPE(*name);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

OMX_ERRORTYPE COMPONENTTYPE::empty_buffer_done(OMX_IN OMX_HANDLETYPE hComponent, OMX_IN OMX_PTR pAppData, OMX_IN OMX_BUFFERHEADERTYPE* pBuffer) {
  plog("empty_buffer_done");
  return OMX_ErrorNone;
}

OMX_ERRORTYPE COMPONENTTYPE::fill_buffer_done(OMX_OUT OMX_HANDLETYPE hComponent, OMX_OUT OMX_PTR pAppData, OMX_OUT OMX_BUFFERHEADERTYPE* pBuffer) {
  plog("fill_buffer_done");
  return OMX_ErrorNone;
}

NAN_METHOD(COMPONENTTYPE::changeState) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  OMX_STATETYPE state = (OMX_STATETYPE) Nan::To<int>(info[0]).FromJust();

  OMX_ERRORTYPE rc;
  rc = OMX_SendCommand(obj->comp, OMX_CommandStateSet, state, NULL);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "OMX_SendCommand() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}

NAN_METHOD(COMPONENTTYPE::getState) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  OMX_STATETYPE stateOut;
  OMX_ERRORTYPE rc;
  rc = OMX_GetState(obj->comp, &stateOut);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "OMX_GetState() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  } else {
    info.GetReturnValue().Set((int) stateOut);
  }
}

NAN_METHOD(COMPONENTTYPE::getParameter) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  int port = (int) Nan::To<int>(info[0]).FromJust();
  OMX_INDEXTYPE nParamIndex = (OMX_INDEXTYPE) Nan::To<int>(info[1]).FromJust();

  v8::Local<v8::Object> ret = Parameters::GetParameter(&obj->comp, port, nParamIndex);

  info.GetReturnValue().Set(ret);
}

NAN_METHOD(COMPONENTTYPE::setParameter) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  int port = (int) Nan::To<int>(info[0]).FromJust();
  OMX_INDEXTYPE nParamIndex = (OMX_INDEXTYPE) Nan::To<int>(info[1]).FromJust();

  v8::Local<v8::Object> param = Nan::To<v8::Object>(info[2]).ToLocalChecked();

  Parameters::SetParameter(&obj->comp, port, nParamIndex, param);
}

NAN_METHOD(COMPONENTTYPE::sendCommand) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  int commandType = (int) Nan::To<int>(info[0]).FromJust();
  int portIndex = (int) Nan::To<int>(info[1]).FromJust();

  OMX_ERRORTYPE rc;
  rc = OMX_SendCommand(obj->comp, (OMX_COMMANDTYPE) commandType, portIndex, NULL);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "OMX_SendCommand() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}

NAN_METHOD(COMPONENTTYPE::useBuffer) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  int portIndex = (int) Nan::To<int>(info[0]).FromJust();

  v8::Local<v8::Object> bufferObj = info[1]->ToObject();
  char* bufferData = node::Buffer::Data(bufferObj);
  size_t bufferLength = node::Buffer::Length(bufferObj);

  OMX_BUFFERHEADERTYPE *buf;

  OMX_ERRORTYPE rc;
  rc = OMX_UseBuffer(obj->comp, &buf, portIndex, NULL, bufferLength, (OMX_U8*) bufferData);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "OMX_UseBuffer() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }

  const unsigned argc = 1;
  Local<Value> argv[argc] = {Nan::New<v8::External>((void*) buf)};
  Local<Function> cons = Nan::New(BUFFERHEADERTYPE::constructor);
  Local<Object> instance = cons->NewInstance(argc, argv);

  info.GetReturnValue().Set(instance);
}

NAN_METHOD(COMPONENTTYPE::emptyBuffer) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  BUFFERHEADERTYPE* _buf = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(Nan::To<v8::Object>(info[0]).ToLocalChecked());

  plog("emptyBuffer info.This() (0x%p)", info.This());

  OMX_BUFFERHEADERTYPE* buf = _buf->buf;

  OMX_ERRORTYPE rc = OMX_EmptyThisBuffer(obj->comp, buf);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "emptyBuffer() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}