#pragma once

#include "GLES2/gl2.h"
#include "EGL/egl.h"
#include "EGL/eglext.h"

class GfxShader {
  GLchar* Src;
  GLuint Id;
  GLuint GlShaderType;

public:

  GfxShader() : Src(NULL), Id(0), GlShaderType(0) {
  }

  ~GfxShader() {
    if (Src) delete[] Src;
  }

  bool LoadVertexShader(const char* filename);
  bool LoadFragmentShader(const char* filename);

  GLuint GetId() {
    return Id;
  }
};