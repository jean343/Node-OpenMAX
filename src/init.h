#pragma once

#include <nan.h>

namespace NodeOMX {

  NAN_METHOD(bcm_host_init);
  NAN_METHOD(bcm_host_deinit);
  NAN_METHOD(OMX_Init);
  NAN_METHOD(OMX_Deinit);
  
}