//https://github.com/fcanas/node-native-boilerplate
//https://github.com/nodejs/nan/blob/master/doc/object_wrappers.md
//https://gist.github.com/bellbind/a68620383e0180b3afc6

#include <nan.h>
#include <unistd.h>

#include "main.h"

#include "init.h"
#include "ILCLIENT.h"
#include "COMPONENT.h"
#include "TUNNEL.h"
#include "BUFFERHEADERTYPE.h"

#include "Sample.h"

#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

using v8::FunctionTemplate;

NAN_MODULE_INIT(Init) {
  Nan::Set(target, Nan::New("bcm_host_init").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::bcm_host_init)).ToLocalChecked());
  Nan::Set(target, Nan::New("bcm_host_deinit").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(NodeOMX::bcm_host_deinit)).ToLocalChecked());

  ILCLIENT::Init(target);
  COMPONENT::Init(target);
  TUNNEL::Init(target);
  BUFFERHEADERTYPE::Init(target);

  Sample::Init(target);
}

NODE_MODULE(Node_OMX, Init)