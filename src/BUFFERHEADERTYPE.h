#pragma once

#include <nan.h>

#include "bcm_host.h"
#include "IL/OMX_Broadcom.h"

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
  static NAN_METHOD(get);
  
  static NAN_GETTER(nAllocLenGet);
  static NAN_SETTER(nAllocLenSet);
  
  static NAN_GETTER(nFilledLenGet);
  static NAN_SETTER(nFilledLenSet);
  
  static NAN_GETTER(nOffsetGet);
  static NAN_SETTER(nOffsetSet);
  
  static NAN_GETTER(nFlagsGet);
  static NAN_SETTER(nFlagsSet);
  
  bool first_packet;
};
