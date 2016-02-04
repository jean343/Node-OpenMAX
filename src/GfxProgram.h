#pragma once

#include "GLES2/gl2.h"
#include "EGL/egl.h"
#include "EGL/eglext.h"

#include "GfxShader.h"

class GfxProgram {
  GfxShader* VertexShader;
  GfxShader* FragmentShader;
  GLuint Id;

public:

  GfxProgram() {
  }

  ~GfxProgram() {
  }

  bool Create(GfxShader* vertex_shader, GfxShader* fragment_shader);

  GLuint GetId() {
    return Id;
  }
};