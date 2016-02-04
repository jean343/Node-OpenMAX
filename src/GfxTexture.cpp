#include "GfxTexture.h"
Nan::Persistent<v8::Function> GfxTexture::constructor;

#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <assert.h>
#include <unistd.h>
#include <iostream>
#include "bcm_host.h"
#include "Graphics.h"
#include "log.h"

using v8::Function;
using v8::Local;
using v8::Number;
using v8::Value;
using Nan::AsyncQueueWorker;
using Nan::AsyncWorker;
using Nan::Callback;
using Nan::HandleScope;
using Nan::New;
using Nan::Null;
using Nan::To;

#define check() assert(glGetError() == 0)

NAN_MODULE_INIT(GfxTexture::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("GfxTexture").ToLocalChecked());

  Nan::SetPrototypeMethod(tpl, "setPixels", setPixels);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("GfxTexture").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

GfxTexture::GfxTexture(int width, int height) {
  plog("GfxTexture");
  Width = width;
  Height = height;

  glGenTextures(1, &Id);
  check();
  glBindTexture(GL_TEXTURE_2D, Id);
  check();

  glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, Width, Height, 0, GL_RGBA, GL_UNSIGNED_BYTE, NULL);
  check();
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST); // GL_LINEAR
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
  check();
//  glBindTexture(GL_TEXTURE_2D, 0);
}

GfxTexture::~GfxTexture() {
  plog("~GfxTexture");
}

NAN_METHOD(GfxTexture::New) {
  if (info.IsConstructCall()) {

    int Width = Nan::To<int>(info[0]).FromJust();
    int Height = Nan::To<int>(info[1]).FromJust();

    GfxTexture *obj = new GfxTexture(Width, Height);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 2;
    v8::Local<v8::Value> argv[argc] = {info[0], info[1]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

// old
NAN_METHOD(GfxTexture::setPixels) {
  GfxTexture* obj = Nan::ObjectWrap::Unwrap<GfxTexture>(info.This());

  v8::Local<v8::Object> bufferObj = info[0]->ToObject();
  char* bufferData = node::Buffer::Data(bufferObj);
  //  size_t bufferLength = node::Buffer::Length(bufferObj);

  bool isColor = false;

  glBindTexture(GL_TEXTURE_2D, obj->Id);
  check();
  glTexSubImage2D(GL_TEXTURE_2D, 0, 0, 0, obj->Width, obj->Height, isColor ? GL_RGBA : GL_LUMINANCE, GL_UNSIGNED_BYTE, bufferData);
  check();
//  glBindTexture(GL_TEXTURE_2D, 0);
  check();
}