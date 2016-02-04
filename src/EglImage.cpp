#include "EglImage.h"
Nan::Persistent<v8::Function> EglImage::constructor;

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

NAN_MODULE_INIT(EglImage::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("EglImage").ToLocalChecked());

  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("EglImage").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

EglImage::EglImage(Graphics* graphics, Local<v8::Object> texture) {
  plog("EglImage");
  this->texture.Reset(texture);
  GDisplay = graphics->GDisplay;

  GfxTexture* _texture = Nan::ObjectWrap::Unwrap<GfxTexture>(texture);

  eglImage = eglCreateImageKHR(
          GDisplay,
          graphics->GContext,
          EGL_GL_TEXTURE_2D_KHR,
          (EGLClientBuffer) _texture->GetId(),
          0);

  if (eglImage == EGL_NO_IMAGE_KHR) {
    printf("eglCreateImageKHR failed.\n");
    exit(1);
  }
}

EglImage::~EglImage() {
  plog("~EglImage");
  eglDestroyImageKHR(GDisplay, eglImage);
  texture.Reset();
}

NAN_METHOD(EglImage::New) {
  if (info.IsConstructCall()) {

    Graphics* graphics = Nan::ObjectWrap::Unwrap<Graphics>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
    Local<v8::Object> texture = Nan::To<v8::Object>(info[1]).ToLocalChecked();
    //    GfxTexture* texture = Nan::ObjectWrap::Unwrap<GfxTexture>(Nan::To<v8::Object>(info[1]).ToLocalChecked());

    EglImage *obj = new EglImage(graphics, texture);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 2;
    v8::Local<v8::Value> argv[argc] = {info[0], info[1]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}