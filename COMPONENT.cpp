#include "COMPONENT.h"
Nan::Persistent<v8::Function> COMPONENT::constructor;

#include "bcm_host.h"

#include "OMX_consts.h"

using v8::String;

NAN_MODULE_INIT(COMPONENT::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("COMPONENT").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "setPorts", setPorts);
  Nan::SetPrototypeMethod(tpl, "changeState", changeState);
  Nan::SetPrototypeMethod(tpl, "getParameter", getParameter);
  Nan::SetPrototypeMethod(tpl, "setParameter", setParameter);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("COMPONENT").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

COMPONENT::COMPONENT(ILCLIENT* _client, char const *name, ILCLIENT_CREATE_FLAGS_T flags) {
  ILCLIENT_T *client = _client->client;

  int rc = ilclient_create_component(client, &component, (char*) name, flags);
  if (rc != 0) {
    char buf[255];
    sprintf(buf, "COMPONENT creation failed with rc: %d for name: %s and flags: %d", rc, name, flags);
    Nan::ThrowError(buf);
    return;
  }

  handle = ilclient_get_handle(component);
}

COMPONENT::~COMPONENT() {
  COMPONENT_T * list[2];

  list[0] = component;
  list[1] = NULL;

  ilclient_state_transition(list, OMX_StateIdle);
  ilclient_state_transition(list, OMX_StateLoaded);

  ilclient_cleanup_components(list);
}

/*
 * ILCLIENT, name, flags
 */
NAN_METHOD(COMPONENT::New) {
  if (info.IsConstructCall()) {
    ILCLIENT* _client = Nan::ObjectWrap::Unwrap<ILCLIENT>(Nan::To<v8::Object>(info[0]).ToLocalChecked());

    String::Utf8Value name(info[1]);

    int flags = info[2]->IsUndefined() ? 0 : Nan::To<int>(info[2]).FromJust();

    COMPONENT *obj = new COMPONENT(_client, *name, (ILCLIENT_CREATE_FLAGS_T) flags);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 3;
    v8::Local<v8::Value> argv[argc] = {info[0], info[1], info[2]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(COMPONENT::setPorts) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());

  if (!info[0]->IsUndefined()) {
    obj->in_port = Nan::To<int>(info[0]).FromJust();
  }
  if (!info[1]->IsUndefined()) {
    obj->out_port = Nan::To<int>(info[1]).FromJust();
  }
}

NAN_METHOD(COMPONENT::changeState) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());

  OMX_STATETYPE state = (OMX_STATETYPE) Nan::To<int>(info[0]).FromJust();

  int rc = ilclient_change_component_state(obj->component, state);
  if (rc != 0) {
    char buf[255];
    sprintf(buf, "changeState failed with rc: %d", rc);
    Nan::ThrowError(buf);
    return;
  }

  OMX_STATETYPE stateOut;
  OMX_ERRORTYPE err;
  err = OMX_GetState(obj->handle, &stateOut);
  if (err != OMX_ErrorNone) {
    info.GetReturnValue().Set((int) stateOut);
  }
}

// port, 
NAN_METHOD(COMPONENT::getParameter) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());

  int port = (OMX_STATETYPE) Nan::To<int>(info[0]).FromJust();
  OMX_INDEXTYPE indexType = (OMX_INDEXTYPE) Nan::To<int>(info[1]).FromJust();
  
  OMX_VIDEO_PARAM_PORTFORMATTYPE format;
  OMX_consts::InitOMXParams(&format, port);

  OMX_ERRORTYPE rc = OMX_GetParameter(obj->handle, indexType, &format);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "getParameter() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }

  // Return object
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();
  Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex));
  Nan::Set(ret, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.eCompressionFormat));
  Nan::Set(ret, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.eColorFormat));
  Nan::Set(ret, Nan::New("xFramerate").ToLocalChecked(), Nan::New(format.xFramerate));
  info.GetReturnValue().Set(ret);
}

NAN_METHOD(COMPONENT::setParameter) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());

  int port = (OMX_STATETYPE) Nan::To<int>(info[0]).FromJust();
  OMX_INDEXTYPE indexType = (OMX_INDEXTYPE) Nan::To<int>(info[1]).FromJust();

  v8::Local<v8::Object> param = Nan::To<v8::Object>(info[2]).ToLocalChecked();
  
  OMX_VIDEO_PARAM_PORTFORMATTYPE format;
  OMX_consts::InitOMXParams(&format, port);
  
  format.nIndex = (int)Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE)Nan::To<int>(Nan::Get(param, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eColorFormat = (OMX_COLOR_FORMATTYPE)Nan::To<int>(Nan::Get(param, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.xFramerate = (int)Nan::To<int>(Nan::Get(param, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();
  
  OMX_ERRORTYPE rc = OMX_SetParameter(obj->handle, indexType, &format);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "setParameter() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}