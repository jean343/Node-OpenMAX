#pragma once

#include <nan.h>

#include "GLES2/gl2.h"
#include "EGL/egl.h"
#include "EGL/eglext.h"

class GfxTexture : public Nan::ObjectWrap {
  friend class SetPixelsWorker;
public:
  static NAN_MODULE_INIT(Init);

  GfxTexture(int width, int height);
  ~GfxTexture();

  GLuint GetId() {
    return Id;
  } // tmp
private:

  static NAN_METHOD(New);

  static NAN_METHOD(setPixels);

  static Nan::Persistent<v8::Function> constructor;

  int Width;
  int Height;
  GLuint Id;
};
