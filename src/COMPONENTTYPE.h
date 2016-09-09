#pragma once

#include <nan.h>

#include "bcm_host.h"
#include "IL/OMX_Broadcom.h"
#include <vector>
#include <map>

struct EventHandlerData {
  OMX_EVENTTYPE eEvent;
  OMX_U32 nData1;
  OMX_U32 nData2;
  OMX_PTR pEventData;
};

struct BufferDoneData {
  int direction;
  OMX_BUFFERHEADERTYPE* pBuffer;
};

class COMPONENTTYPE : public Nan::ObjectWrap {
  friend class FillBufferAsyncWorker;
  friend class EmptyBufferAsyncWorker;

public:
  static NAN_MODULE_INIT(Init);

private:
  explicit COMPONENTTYPE(char const *name);
  ~COMPONENTTYPE();

  static NAN_METHOD(New);
  static NAN_METHOD(close);

  static NAN_METHOD(getState);
  static NAN_METHOD(getParameter);
  static NAN_METHOD(setParameter);
  static NAN_METHOD(sendCommand);
  static NAN_METHOD(useBuffer);
  static NAN_METHOD(freeBuffer);
  static NAN_METHOD(useEGLImage);

  static NAN_METHOD(emptyBuffer);
  static NAN_METHOD(fillBuffer);
  static NAN_METHOD(emptyBufferAsync);
  static NAN_METHOD(fillBufferAsync);

  static NAN_METHOD(tunnelTo);

  static Nan::Persistent<v8::Function> constructor;
  OMX_HANDLETYPE comp;

  char name[32];
  char component_name[128];
  Nan::Callback* eventHandlerCallback;
  Nan::Callback* eventBufferCallback;
  bool uvPortSettingsChangedHandlerRef;
  uv_async_t uvPortSettingsChangedHandler;

  uv_mutex_t uvEventHandlerLock;
  uv_async_t uvEventHandler;

  static void uvEventHandlerDestroy(uv_handle_t *async) {
    COMPONENTTYPE *obj = static_cast<COMPONENTTYPE*> (async->data);
    uv_mutex_destroy(&obj->uvEventHandlerLock);
    delete obj->eventHandlerCallback;
  }

  static void uvBufferHandlerDestroy(uv_handle_t *async) {
    COMPONENTTYPE *obj = static_cast<COMPONENTTYPE*> (async->data);
    uv_mutex_destroy(&obj->uvBufferHandlerLock);
    delete obj->eventBufferCallback;
  }

  static OMX_ERRORTYPE event_handler(OMX_IN OMX_HANDLETYPE hComponent, OMX_IN OMX_PTR pAppData, OMX_IN OMX_EVENTTYPE eEvent, OMX_IN OMX_U32 nData1, OMX_IN OMX_U32 nData2, OMX_IN OMX_PTR pEventData) {
    COMPONENTTYPE *obj = (COMPONENTTYPE *) pAppData;
    uv_mutex_lock(&obj->uvEventHandlerLock);
    EventHandlerData data;
    data.eEvent = eEvent;
    data.nData1 = nData1;
    data.nData2 = nData2;
    data.pEventData = pEventData;
    obj->eventHandlerQueue.push_back(data);
    uv_mutex_unlock(&obj->uvEventHandlerLock);
    uv_async_send(&obj->uvEventHandler);
    return OMX_ErrorNone;
  }

  std::vector<EventHandlerData> eventHandlerQueue;

  NAN_INLINE static NAUV_WORK_CB(eventHandlerDone) {
    Nan::HandleScope scope;
    COMPONENTTYPE *obj = static_cast<COMPONENTTYPE*> (async->data);

    // Make a copy as we don't want to hold a lock while making callbacks
    uv_mutex_lock(&obj->uvEventHandlerLock);
    std::vector<EventHandlerData> local(obj->eventHandlerQueue);
    obj->eventHandlerQueue.clear();
    uv_unref((uv_handle_t *) & obj->uvEventHandler);
    uv_mutex_unlock(&obj->uvEventHandlerLock);


    for (std::vector<EventHandlerData>::iterator it = local.begin(); it < local.end(); it++) {
      EventHandlerData data = *it;
      int argc = 4;

      v8::Local<v8::Value> argv[argc] = {Nan::New(data.eEvent), Nan::New(data.nData1), Nan::New(data.nData2), Nan::New(data.pEventData)};
      obj->eventHandlerCallback->Call(argc, argv);

      if (data.eEvent == OMX_EventPortSettingsChanged) {
        uv_unref((uv_handle_t *) & obj->uvPortSettingsChangedHandler);
      }
    }
  }

  std::map<OMX_BUFFERHEADERTYPE*, Nan::Persistent<v8::Object>> bufferMap;

  uv_mutex_t uvBufferHandlerLock;
  uv_async_t uvBufferHandler;

  static OMX_ERRORTYPE empty_buffer_done(OMX_IN OMX_HANDLETYPE hComponent, OMX_IN OMX_PTR pAppData, OMX_IN OMX_BUFFERHEADERTYPE* pBuffer) {
    COMPONENTTYPE *obj = (COMPONENTTYPE *) pAppData;
    uv_mutex_lock(&obj->uvBufferHandlerLock);
    BufferDoneData data;
    data.direction = 0;
    data.pBuffer = pBuffer;
    obj->eventBufferQueue.push_back(data);
    uv_mutex_unlock(&obj->uvBufferHandlerLock);
    uv_async_send(&obj->uvBufferHandler);
    return OMX_ErrorNone;
  }

  static OMX_ERRORTYPE fill_buffer_done(OMX_OUT OMX_HANDLETYPE hComponent, OMX_OUT OMX_PTR pAppData, OMX_OUT OMX_BUFFERHEADERTYPE* pBuffer) {
    COMPONENTTYPE *obj = (COMPONENTTYPE *) pAppData;
    uv_mutex_lock(&obj->uvBufferHandlerLock);
    BufferDoneData data;
    data.direction = 1;
    data.pBuffer = pBuffer;
    obj->eventBufferQueue.push_back(data);
    uv_mutex_unlock(&obj->uvBufferHandlerLock);
    uv_async_send(&obj->uvBufferHandler);
    return OMX_ErrorNone;
  }

  std::vector<BufferDoneData> eventBufferQueue;

  NAN_INLINE static NAUV_WORK_CB(eventBufferDone) {
    Nan::HandleScope scope;
    COMPONENTTYPE *obj = static_cast<COMPONENTTYPE*> (async->data);

    // Make a copy as we don't want to hold a lock while making callbacks
    uv_mutex_lock(&obj->uvBufferHandlerLock);
    std::vector<BufferDoneData> local(obj->eventBufferQueue);
    obj->eventBufferQueue.clear();
    uv_unref((uv_handle_t *) & obj->uvBufferHandler);
    uv_mutex_unlock(&obj->uvBufferHandlerLock);

    for (std::vector<BufferDoneData>::iterator it = local.begin(); it < local.end(); it++) {
      BufferDoneData data = *it;
      int argc = 2;

      v8::Local<v8::Object> pBufferObj = Nan::New<v8::Object>(obj->bufferMap[data.pBuffer]);

      v8::Local<v8::Value> argv[argc] = {Nan::New(data.direction), pBufferObj};
      obj->eventBufferCallback->Call(argc, argv);
    }
  }


};
