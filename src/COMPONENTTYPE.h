#pragma once

#include <nan.h>

#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}
#include <vector>

struct EventHandlerData {
  OMX_EVENTTYPE eEvent;
  OMX_U32 nData1;
  OMX_U32 nData2;
  OMX_PTR pEventData;
};

class COMPONENTTYPE : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  uv_mutex_t lock;
  uv_async_t uvEventHandler;

private:
  explicit COMPONENTTYPE(char const *name);
  ~COMPONENTTYPE();

  static NAN_METHOD(New);

  static NAN_METHOD(changeState);
  static NAN_METHOD(getState);
  static NAN_METHOD(getParameter);
  static NAN_METHOD(setParameter);
  static NAN_METHOD(sendCommand);
  static NAN_METHOD(useBuffer);
  static NAN_METHOD(emptyBuffer);

  static Nan::Persistent<v8::Function> constructor;
  OMX_HANDLETYPE comp;

  char name[32];
  char component_name[128];

  static OMX_ERRORTYPE empty_buffer_done(OMX_IN OMX_HANDLETYPE hComponent, OMX_IN OMX_PTR pAppData, OMX_IN OMX_BUFFERHEADERTYPE* pBuffer);
  static OMX_ERRORTYPE fill_buffer_done(OMX_OUT OMX_HANDLETYPE hComponent, OMX_OUT OMX_PTR pAppData, OMX_OUT OMX_BUFFERHEADERTYPE* pBuffer);

  static OMX_ERRORTYPE event_handler(OMX_IN OMX_HANDLETYPE hComponent, OMX_IN OMX_PTR pAppData, OMX_IN OMX_EVENTTYPE eEvent, OMX_IN OMX_U32 nData1, OMX_IN OMX_U32 nData2, OMX_IN OMX_PTR pEventData) {
    COMPONENTTYPE *obj = (COMPONENTTYPE *) pAppData;
    uv_mutex_lock(&obj->lock);
    EventHandlerData data;
    data.eEvent = eEvent;
    data.nData1 = nData1;
    data.nData2 = nData2;
    data.pEventData = pEventData;
    obj->eventHandlerQueue.push_back(data);
    uv_mutex_unlock(&obj->lock);
    uv_async_send(&obj->uvEventHandler);
    return OMX_ErrorNone;
  }

  std::vector<EventHandlerData> eventHandlerQueue;

  NAN_INLINE static NAUV_WORK_CB(eventHandlerDone) {
    Nan::HandleScope scope;
    COMPONENTTYPE *obj = static_cast<COMPONENTTYPE*> (async->data);

    // Make a copy as we don't want to hold a lock while making callbacks
    uv_mutex_lock(&obj->lock);
    std::vector<EventHandlerData> local(obj->eventHandlerQueue);
    obj->eventHandlerQueue.clear();
    uv_mutex_unlock(&obj->lock);

    for (std::vector<EventHandlerData>::iterator it = local.begin(); it < local.end(); it++) {
      EventHandlerData data = *it;
      int argc = 5;
      v8::Local<v8::Value> argv[argc] = {Nan::New("event_handler").ToLocalChecked(), Nan::New(data.eEvent), Nan::New(data.nData1), Nan::New(data.nData2), Nan::New(data.pEventData)};
      Nan::MakeCallback(obj->handle(), "emit", argc, argv);
    }
  }
};
