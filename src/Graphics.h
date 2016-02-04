#pragma once

#include <nan.h>

#include "GLES2/gl2.h"
#include "EGL/egl.h"
#include "EGL/eglext.h"

#include "GfxTexture.h"
#include "GfxShader.h"
#include "GfxProgram.h"

class Graphics : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

  EGLDisplay GDisplay;
  EGLContext GContext;
private:
  explicit Graphics();
  ~Graphics();

  static NAN_METHOD(New);
  
  static NAN_METHOD(beginFrame);
  static NAN_METHOD(endFrame);
  static NAN_METHOD(drawTextureRect);
  
  static Nan::Persistent<v8::Function> constructor;

  uint32_t GScreenWidth;
  uint32_t GScreenHeight;
  EGLSurface GSurface;

  GfxShader GSimpleVS;
  GfxShader GSimpleFS;
  GfxProgram GSimpleProg;
  GLuint GQuadVertexBuffer;
};
