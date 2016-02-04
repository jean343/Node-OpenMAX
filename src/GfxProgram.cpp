#include "GfxProgram.h"

#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <assert.h>
#include <unistd.h>
#include <iostream>

#define check() assert(glGetError() == 0)

bool GfxProgram::Create(GfxShader* vertex_shader, GfxShader* fragment_shader) {
  VertexShader = vertex_shader;
  FragmentShader = fragment_shader;
  Id = glCreateProgram();
  glAttachShader(Id, VertexShader->GetId());
  glAttachShader(Id, FragmentShader->GetId());
  glLinkProgram(Id);
  check();
  printf("Created program id %d from vs %d and fs %d\n", GetId(), VertexShader->GetId(), FragmentShader->GetId());

  // Prints the information log for a program object
  char log[1024];
  glGetProgramInfoLog(Id, sizeof log, NULL, log);
  printf("%d:program:\n%s\n", Id, log);

  return true;
}