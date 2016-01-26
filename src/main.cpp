//https://github.com/fcanas/node-native-boilerplate
//https://github.com/nodejs/nan/blob/master/doc/object_wrappers.md
//https://gist.github.com/bellbind/a68620383e0180b3afc6
//https://n8.io/converting-a-c-library-to-gyp/
//http://nikhilm.github.io/uvbook/threads.html
//https://github.com/justinlatimer/node-midi/blob/master/src/node-midi.cpp

#include <nan.h>
#include <unistd.h>

#include "log.h"
#include "main.h"

#include "init.h"
#include "BUFFERHEADERTYPE.h"
#include "COMPONENTTYPE.h"
#include "CopyAsync.h"

#include "bcm_host.h"

using v8::FunctionTemplate;

NAN_MODULE_INIT(Init) {
  plog("NAN_MODULE_INIT");
  Nan::Set(target, Nan::New("bcm_host_init").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::bcm_host_init)).ToLocalChecked());
  Nan::Set(target, Nan::New("bcm_host_deinit").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::bcm_host_deinit)).ToLocalChecked());
  Nan::Set(target, Nan::New("OMX_Init").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::OMX_Init)).ToLocalChecked());
  Nan::Set(target, Nan::New("OMX_Deinit").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::OMX_Deinit)).ToLocalChecked());

  Nan::Set(target, Nan::New("copyAsync").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(CopyAsync)).ToLocalChecked());

  BUFFERHEADERTYPE::Init(target);
  COMPONENTTYPE::Init(target);
}

NODE_MODULE(Node_OMX, Init)