#include "COMPONENT.h"
#include "BUFFERHEADERTYPE.h"
Nan::Persistent<v8::Function> COMPONENT::constructor;

#include "log.h"
#include "bcm_host.h"

#include "OMX_consts.h"

using v8::String;
using v8::Local;
using v8::Value;
using v8::Function;
using v8::Object;

NAN_MODULE_INIT(COMPONENT::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("COMPONENT").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "setPorts", setPorts);
  Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("in_port").ToLocalChecked(), _in_port);
  Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("out_port").ToLocalChecked(), _out_port);
  
  Nan::SetPrototypeMethod(tpl, "changeState", changeState);
  Nan::SetPrototypeMethod(tpl, "getParameter", getParameter);
  Nan::SetPrototypeMethod(tpl, "setParameter", setParameter);

  Nan::SetPrototypeMethod(tpl, "enableInputPort", enableInputPort);
  Nan::SetPrototypeMethod(tpl, "enableOutputPort", enableOutputPort);
  Nan::SetPrototypeMethod(tpl, "enableInputPortBuffer", enableInputPortBuffer);
  Nan::SetPrototypeMethod(tpl, "enableOutputPortBuffer", enableOutputPortBuffer);
  Nan::SetPrototypeMethod(tpl, "disableInputPort", disableInputPort);
  Nan::SetPrototypeMethod(tpl, "disableOutputPort", disableOutputPort);
  Nan::SetPrototypeMethod(tpl, "disableInputPortBuffer", disableInputPortBuffer);
  Nan::SetPrototypeMethod(tpl, "disableOutputPortBuffer", disableOutputPortBuffer);

  Nan::SetPrototypeMethod(tpl, "getInputBuffer", getInputBuffer);
  Nan::SetPrototypeMethod(tpl, "emptyBuffer", emptyBuffer);
  Nan::SetPrototypeMethod(tpl, "waitForEvent", waitForEvent);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("COMPONENT").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

COMPONENT::COMPONENT(ILCLIENT* _client, char const *name, ILCLIENT_CREATE_FLAGS_T flags) : lastEmptyBufferCallback(NULL) {
  log("COMPONENT()");
  ILCLIENT_T *client = _client->client;

  int rc = ilclient_create_component(client, &component, (char*) name, flags);
  if (rc != 0) {
    char buf[255];
    sprintf(buf, "COMPONENT creation failed with rc: %d for name: %s and flags: %d", rc, name, flags);
    Nan::ThrowError(buf);
    return;
  }

  handle = ilclient_get_handle(component);

  if (flags & ILCLIENT_ENABLE_INPUT_BUFFERS) {
    ilclient_set_empty_buffer_done_callback(client, emptyBufferDoneCallback, this);
  }

  async = new uv_async_t;
  uv_async_init(uv_default_loop(), async, asyncEmptyBufferDone);
  async->data = this;
}

void COMPONENT::emptyBufferDoneCallback(void *userdata, COMPONENT_T *comp) {
  COMPONENT *component = (COMPONENT*) userdata;
  uv_async_send(component->async);
}

COMPONENT::~COMPONENT() {
  log("~COMPONENT()");
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
NAN_GETTER(COMPONENT::_in_port) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  info.GetReturnValue().Set(obj->in_port);
}
NAN_GETTER(COMPONENT::_out_port) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  info.GetReturnValue().Set(obj->out_port);
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

  format.nIndex = (int) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
  format.xFramerate = (int) Nan::To<int>(Nan::Get(param, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();

  OMX_ERRORTYPE rc = OMX_SetParameter(obj->handle, indexType, &format);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "setParameter() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}

NAN_METHOD(COMPONENT::enableInputPort) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  obj->enablePort(obj->in_port);
}

NAN_METHOD(COMPONENT::enableOutputPort) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  obj->enablePort(obj->out_port);
}

NAN_METHOD(COMPONENT::enableInputPortBuffer) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  obj->enablePortBuffer(obj->in_port);
}

NAN_METHOD(COMPONENT::enableOutputPortBuffer) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  obj->enablePortBuffer(obj->out_port);
}

NAN_METHOD(COMPONENT::disableInputPort) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  obj->disablePort(obj->in_port);
}

NAN_METHOD(COMPONENT::disableOutputPort) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  obj->disablePort(obj->out_port);
}

NAN_METHOD(COMPONENT::disableInputPortBuffer) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  obj->disablePortBuffer(obj->in_port);
}

NAN_METHOD(COMPONENT::disableOutputPortBuffer) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());
  obj->disablePortBuffer(obj->out_port);
}

void COMPONENT::enablePort(int port) {
  ilclient_enable_port(component, port);
}

void COMPONENT::enablePortBuffer(int port) {
  //  printf("enablePortBuffer: %d\n", port);
  int rc = ilclient_enable_port_buffers(component, port, NULL, NULL, NULL);
  if (rc != 0) {
    char buf[255];
    sprintf(buf, "enablePortBuffer failed with rc: %d on port: %d", rc, port);
    Nan::ThrowError(buf);
    return;
  }
}

void COMPONENT::disablePort(int port) {
  //  printf("disablePort: %d\n", port);
  ilclient_disable_port(component, port);
}

void COMPONENT::disablePortBuffer(int port) {
  //  printf("disablePortBuffer: %d\n", port);
  ilclient_disable_port_buffers(component, port, NULL, NULL, NULL);
}

NAN_METHOD(COMPONENT::getInputBuffer) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());

  int block = info[0]->IsUndefined() ? 0 : Nan::To<int>(info[0]).FromJust();

  OMX_BUFFERHEADERTYPE *buf = ilclient_get_input_buffer(obj->component, obj->in_port, block);

  const unsigned argc = 1;
  Local<Value> argv[argc] = {Nan::New<v8::External>((void*) buf)};
  Local<Function> cons = Nan::New(BUFFERHEADERTYPE::constructor);
  Local<Object> instance = cons->NewInstance(argc, argv);

  info.GetReturnValue().Set(instance);
}

NAN_METHOD(COMPONENT::emptyBuffer) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());

  OMX_BUFFERHEADERTYPE* buf;
  if (info[0]->IsUndefined()) {
    // Flush last buffer
    buf = ilclient_get_input_buffer(obj->component, obj->in_port, 1);
    buf->nFilledLen = 0;
    buf->nFlags = OMX_BUFFERFLAG_TIME_UNKNOWN | OMX_BUFFERFLAG_EOS;
  } else {
    BUFFERHEADERTYPE* _buf = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(Nan::To<v8::Object>(info[0]).ToLocalChecked());

    if (ilclient_remove_event(obj->component, OMX_EventPortSettingsChanged, obj->out_port, 0, 0, 1) == 0) {
      int argc = 1;
      v8::Local<v8::Value> argv[argc] = {Nan::New("eventPortSettingsChanged").ToLocalChecked()};
      Nan::MakeCallback(info.This(), "emit", argc, argv);
    }
    buf = _buf->buf;
  }

  obj->lastEmptyBufferCallback = new Nan::Callback(info[1].As<Function>());

  OMX_ERRORTYPE rc = OMX_EmptyThisBuffer(obj->handle, buf);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "emptyBuffer() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}

NAN_METHOD(COMPONENT::waitForEvent) {
  COMPONENT* obj = Nan::ObjectWrap::Unwrap<COMPONENT>(info.This());

  ilclient_wait_for_event(obj->component, OMX_EventBufferFlag, obj->in_port, 0, OMX_BUFFERFLAG_EOS, 0, ILCLIENT_BUFFER_FLAG_EOS, 100);
}