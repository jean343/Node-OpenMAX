#pragma once

#include <nan.h>

#include "GLES2/gl2.h"
#include "EGL/egl.h"
#include "EGL/eglext.h"

#include "Graphics.h"
#include "GfxTexture.h"

class EglImage : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  EglImage(Graphics* graphics, v8::Local<v8::Object> texture);
  ~EglImage();
  
  EGLImageKHR eglImage;
  Nan::Persistent<v8::Object> texture;
private:

  static NAN_METHOD(New);

  static Nan::Persistent<v8::Function> constructor;

  EGLDisplay GDisplay;
};
