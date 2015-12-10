#pragma once

#include <nan.h>

#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

class BUFFERHEADERTYPE : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  static Nan::Persistent<v8::Function> constructor;
  OMX_BUFFERHEADERTYPE* buf;

private:
  explicit BUFFERHEADERTYPE(OMX_BUFFERHEADERTYPE* buf);
  ~BUFFERHEADERTYPE();

  static NAN_METHOD(New);
  static NAN_METHOD(set);
  static NAN_GETTER(nAllocLenGet);
  
  bool first_packet;
};
