#pragma once

#include <nan.h>

#include "ILCLIENT.h"
extern "C" {
#include "ilclient.h"
}

class COMPONENT : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  COMPONENT_T *component;
  OMX_HANDLETYPE handle;
  int in_port;
  int out_port;
private:
  explicit COMPONENT(ILCLIENT* _client, char const *name, ILCLIENT_CREATE_FLAGS_T flags);
  ~COMPONENT();

  static NAN_METHOD(New);
  static NAN_METHOD(setPorts);
  static NAN_METHOD(changeState);
  static NAN_METHOD(getParameter);
  static NAN_METHOD(setParameter);
  
  static NAN_METHOD(enableInputPort);
  static NAN_METHOD(enableOutputPort);
  static NAN_METHOD(enableInputPortBuffer);
  static NAN_METHOD(enableOutputPortBuffer);
  static NAN_METHOD(disableInputPort);
  static NAN_METHOD(disableOutputPort);
  static NAN_METHOD(disableInputPortBuffer);
  static NAN_METHOD(disableOutputPortBuffer);
  
  void enablePort(int port);
  void enablePortBuffer(int port);
  void disablePort(int port);
  void disablePortBuffer(int port);
  
  static Nan::Persistent<v8::Function> constructor;
};
