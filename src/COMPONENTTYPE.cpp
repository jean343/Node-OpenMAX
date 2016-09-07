#include "COMPONENTTYPE.h"
#include "BUFFERHEADERTYPE.h"
#include "OMX_consts.h"
#include "Parameters.h"
#include "EglImage.h"
#include "log.h"

#include <stdio.h>

using v8::String;
using v8::Local;
using v8::Value;
using v8::Function;
using v8::Object;
using v8::Number;
using Nan::AsyncQueueWorker;
using Nan::AsyncWorker;
using Nan::Callback;
using Nan::HandleScope;
using Nan::New;
using Nan::Null;
using Nan::To;

Nan::Persistent<v8::Function> COMPONENTTYPE::constructor;

NAN_MODULE_INIT(COMPONENTTYPE::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("COMPONENTTYPE").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "close", close);
  Nan::SetPrototypeMethod(tpl, "changeState", changeState);
  Nan::SetPrototypeMethod(tpl, "getState", getState);
  Nan::SetPrototypeMethod(tpl, "getParameter", getParameter);
  Nan::SetPrototypeMethod(tpl, "setParameter", setParameter);
  Nan::SetPrototypeMethod(tpl, "sendCommand", sendCommand);
  Nan::SetPrototypeMethod(tpl, "useBuffer", useBuffer);
  Nan::SetPrototypeMethod(tpl, "useEGLImage", useEGLImage);

  Nan::SetPrototypeMethod(tpl, "emptyBuffer", emptyBuffer);
  Nan::SetPrototypeMethod(tpl, "fillBuffer", fillBuffer);

  Nan::SetPrototypeMethod(tpl, "emptyBufferAsync", emptyBufferAsync);
  Nan::SetPrototypeMethod(tpl, "fillBufferAsync", fillBufferAsync);

  Nan::SetPrototypeMethod(tpl, "tunnelTo", tunnelTo);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("COMPONENTTYPE").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

COMPONENTTYPE::COMPONENTTYPE(char const *name) {
  plog("COMPONENTTYPE(%s)", name);
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

  uv_mutex_init(&uvEventHandlerLock);
  uv_async_init(uv_default_loop(), &uvEventHandler, eventHandlerDone);
  uv_unref(reinterpret_cast<uv_handle_t*>(&uvEventHandler));
  uvEventHandler.data = this;

  uv_mutex_init(&uvBufferHandlerLock);
  uv_async_init(uv_default_loop(), &uvBufferHandler, eventBufferDone);
  uv_unref(reinterpret_cast<uv_handle_t*>(&uvBufferHandler));
  uvBufferHandler.data = this;
}

COMPONENTTYPE::~COMPONENTTYPE() {
  plog("~COMPONENTTYPE(%s)", this->name);
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

    // Ref() marks the object as being attached to an event loop.
    // Refed objects will not be garbage collected, even if all references are lost.
    obj->Ref();

    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(COMPONENTTYPE::close) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());
  plog("close(%s)", obj->name);
  obj->Unref();
}

NAN_METHOD(COMPONENTTYPE::changeState) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  OMX_STATETYPE state = (OMX_STATETYPE) Nan::To<int>(info[0]).FromJust();

  OMX_ERRORTYPE rc;
  uv_ref((uv_handle_t *)&obj->uvEventHandler);
  rc = OMX_SendCommand(obj->comp, OMX_CommandStateSet, state, NULL);
  if (rc != OMX_ErrorNone) {
    uv_unref((uv_handle_t *)&obj->uvEventHandler);
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
  uv_ref((uv_handle_t *)&obj->uvEventHandler);
  rc = OMX_SendCommand(obj->comp, (OMX_COMMANDTYPE) commandType, portIndex, NULL);
  if (rc != OMX_ErrorNone) {
    uv_unref((uv_handle_t *)&obj->uvEventHandler);
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

  // Keep reference of buffer
  obj->bufferMap[buf].Reset(instance);

  info.GetReturnValue().Set(instance);
}

NAN_METHOD(COMPONENTTYPE::useEGLImage) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  int portIndex = (int) Nan::To<int>(info[0]).FromJust();

  EglImage* _egl = Nan::ObjectWrap::Unwrap<EglImage>(Nan::To<v8::Object>(info[1]).ToLocalChecked());

  OMX_BUFFERHEADERTYPE *buf;

  OMX_ERRORTYPE rc;
  //  rc = OMX_UseBuffer(obj->comp, &buf, portIndex, NULL, bufferLength, (OMX_U8*) bufferData);
  rc = OMX_UseEGLImage(obj->comp, &buf, portIndex, NULL, _egl->eglImage);
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

  // Keep reference of buffer
  obj->bufferMap[buf].Reset(instance);

  info.GetReturnValue().Set(instance);
}

NAN_METHOD(COMPONENTTYPE::emptyBuffer) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  BUFFERHEADERTYPE* _buf = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(Nan::To<v8::Object>(info[0]).ToLocalChecked());

  OMX_BUFFERHEADERTYPE* buf = _buf->buf;

  uv_ref((uv_handle_t *)&obj->uvBufferHandler);
  OMX_ERRORTYPE rc = OMX_EmptyThisBuffer(obj->comp, buf);
  if (rc != OMX_ErrorNone) {
    uv_unref((uv_handle_t *)&obj->uvBufferHandler);
    char buf[255];
    sprintf(buf, "emptyBuffer() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}

NAN_METHOD(COMPONENTTYPE::fillBuffer) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  BUFFERHEADERTYPE* _buf = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(Nan::To<v8::Object>(info[0]).ToLocalChecked());

  OMX_BUFFERHEADERTYPE* buf = _buf->buf;

  uv_ref((uv_handle_t *)&obj->uvBufferHandler);
  OMX_ERRORTYPE rc = OMX_FillThisBuffer(obj->comp, buf);
  if (rc != OMX_ErrorNone) {
    uv_unref((uv_handle_t *)&obj->uvBufferHandler);
    char buf[255];
    sprintf(buf, "OMX_FillThisBuffer() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}

class EmptyBufferAsyncWorker : public AsyncWorker {
public:

  EmptyBufferAsyncWorker(Callback *callback, COMPONENTTYPE* obj, OMX_BUFFERHEADERTYPE* buf)
  : AsyncWorker(callback), obj(obj), buf(buf) {
    uv_ref((uv_handle_t *)&obj->uvBufferHandler);
  }

  ~EmptyBufferAsyncWorker() {
  }

  void Execute() {
    rc = OMX_EmptyThisBuffer(obj->comp, buf);
  }

  void HandleOKCallback() {
    HandleScope scope;

    if (rc != OMX_ErrorNone) {
      char buf[255];
      sprintf(buf, "OMX_EmptyThisBuffer() returned error: %s", OMX_consts::err2str(rc));
      Nan::ThrowError(buf);
      return;
    }

    Local<Value> argv[] = {
      Null()
    };

    callback->Call(1, argv);
  }

private:
  COMPONENTTYPE* obj;
  OMX_BUFFERHEADERTYPE* buf;
  OMX_ERRORTYPE rc;
};

NAN_METHOD(COMPONENTTYPE::emptyBufferAsync) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  BUFFERHEADERTYPE* _buf = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  OMX_BUFFERHEADERTYPE* buf = _buf->buf;

  Callback *callback = new Callback(info[1].As<Function>());

  AsyncQueueWorker(new EmptyBufferAsyncWorker(callback, obj, buf));
}

class FillBufferAsyncWorker : public AsyncWorker {
public:

  FillBufferAsyncWorker(Callback *callback, COMPONENTTYPE* obj, OMX_BUFFERHEADERTYPE* buf)
  : AsyncWorker(callback), obj(obj), buf(buf) {
    uv_ref((uv_handle_t *)&obj->uvBufferHandler);
  }

  ~FillBufferAsyncWorker() {
  }

  void Execute() {
    rc = OMX_FillThisBuffer(obj->comp, buf);
  }

  void HandleOKCallback() {
    HandleScope scope;

    if (rc != OMX_ErrorNone) {
      char buf[255];
      sprintf(buf, "OMX_FillThisBuffer() returned error: %s", OMX_consts::err2str(rc));
      Nan::ThrowError(buf);
      return;
    }

    Local<Value> argv[] = {
      Null()
    };

    callback->Call(1, argv);
  }

private:
  COMPONENTTYPE* obj;
  OMX_BUFFERHEADERTYPE* buf;
  OMX_ERRORTYPE rc;
};

NAN_METHOD(COMPONENTTYPE::fillBufferAsync) {
  COMPONENTTYPE* obj = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  BUFFERHEADERTYPE* _buf = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  OMX_BUFFERHEADERTYPE* buf = _buf->buf;

  Callback *callback = new Callback(info[1].As<Function>());

  AsyncQueueWorker(new FillBufferAsyncWorker(callback, obj, buf));
}

NAN_METHOD(COMPONENTTYPE::tunnelTo) {
  COMPONENTTYPE* source = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(info.This());

  int sourcePort = (int) Nan::To<int>(info[0]).FromJust();
  COMPONENTTYPE* sink = Nan::ObjectWrap::Unwrap<COMPONENTTYPE>(Nan::To<v8::Object>(info[1]).ToLocalChecked());

  int sinkPort = (int) Nan::To<int>(info[2]).FromJust();

  OMX_ERRORTYPE rc = OMX_SetupTunnel(source->comp, sourcePort, sink->comp, sinkPort);
  if (rc != OMX_ErrorNone) {
    char buf[255];
    sprintf(buf, "OMX_SetupTunnel() returned error: %s", OMX_consts::err2str(rc));
    Nan::ThrowError(buf);
    return;
  }
}