#include "Graphics.h"

#include <chrono>
#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <assert.h>
#include <unistd.h>
#include <iostream>
#include "bcm_host.h"
#include "log.h"

#include "EglImage.h"

#define check() assert(glGetError() == 0)

Nan::Persistent<v8::Function> Graphics::constructor;

NAN_MODULE_INIT(Graphics::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Graphics").ToLocalChecked());

  Nan::SetPrototypeMethod(tpl, "beginFrame", beginFrame);
  Nan::SetPrototypeMethod(tpl, "endFrame", endFrame);
  Nan::SetPrototypeMethod(tpl, "drawTextureRect", drawTextureRect);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("Graphics").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

Graphics::Graphics() {
  plog("Graphics");
  bcm_host_init();
  int32_t success = 0;
  EGLBoolean result;
  EGLint num_config;

  static EGL_DISPMANX_WINDOW_T nativewindow;

  DISPMANX_ELEMENT_HANDLE_T dispman_element;
  DISPMANX_DISPLAY_HANDLE_T dispman_display;
  DISPMANX_UPDATE_HANDLE_T dispman_update;
  VC_RECT_T dst_rect;
  VC_RECT_T src_rect;

  static const EGLint attribute_list[] = {
    EGL_RED_SIZE, 8,
    EGL_GREEN_SIZE, 8,
    EGL_BLUE_SIZE, 8,
    EGL_ALPHA_SIZE, 8,
    EGL_SURFACE_TYPE, EGL_WINDOW_BIT,
    EGL_NONE
  };

  static const EGLint context_attributes[] = {
    EGL_CONTEXT_CLIENT_VERSION, 2,
    EGL_NONE
  };
  EGLConfig config;

  // get an EGL display connection
  GDisplay = eglGetDisplay(EGL_DEFAULT_DISPLAY);
  assert(GDisplay != EGL_NO_DISPLAY);
  check();

  // initialize the EGL display connection
  result = eglInitialize(GDisplay, NULL, NULL);
  assert(EGL_FALSE != result);
  check();

  // get an appropriate EGL frame buffer configuration
  result = eglChooseConfig(GDisplay, attribute_list, &config, 1, &num_config);
  assert(EGL_FALSE != result);
  check();

  // get an appropriate EGL frame buffer configuration
  result = eglBindAPI(EGL_OPENGL_ES_API);
  assert(EGL_FALSE != result);
  check();

  // create an EGL rendering context
  GContext = eglCreateContext(GDisplay, config, EGL_NO_CONTEXT, context_attributes);
  assert(GContext != EGL_NO_CONTEXT);
  check();

  // create an EGL window surface
  success = graphics_get_display_size(0 /* LCD */, &GScreenWidth, &GScreenHeight);
  assert(success >= 0);

  dst_rect.x = 0;
  dst_rect.y = 0;
  dst_rect.width = GScreenWidth;
  dst_rect.height = GScreenHeight;

  src_rect.x = 0;
  src_rect.y = 0;
  src_rect.width = GScreenWidth << 16;
  src_rect.height = GScreenHeight << 16;

  dispman_display = vc_dispmanx_display_open(0 /* LCD */);
  dispman_update = vc_dispmanx_update_start(0);

  dispman_element = vc_dispmanx_element_add(dispman_update, dispman_display,
          0/*layer*/, &dst_rect, 0/*src*/,
          &src_rect, DISPMANX_PROTECTION_NONE, 0 /*alpha*/, 0/*clamp*/, (DISPMANX_TRANSFORM_T) 0/*transform*/);

  nativewindow.element = dispman_element;
  nativewindow.width = GScreenWidth;
  nativewindow.height = GScreenHeight;
  vc_dispmanx_update_submit_sync(dispman_update);

  check();

  GSurface = eglCreateWindowSurface(GDisplay, config, &nativewindow, NULL);
  assert(GSurface != EGL_NO_SURFACE);
  check();

  // connect the context to the surface
  result = eglMakeCurrent(GDisplay, GSurface, GSurface, GContext);
  assert(EGL_FALSE != result);
  check();

  // Set background color and clear buffers
  glClearColor(0.15f, 0.25f, 0.35f, 1.0f);
  glClear(GL_COLOR_BUFFER_BIT);

  //load the test shaders
  GSimpleVS.LoadVertexShader(
          "attribute vec4 vertex;\n"
          "uniform vec2 offset;\n"
          "uniform vec2 scale;\n"
          "varying vec2 tcoord;\n"
          "void main(void)\n"
          "{\n"
          "	 vec4 pos = vertex;\n"
          "	 tcoord.xy = pos.xy;\n"
          "	 pos.xy = pos.xy*scale+offset;\n"
          "	 gl_Position = pos;\n"
          "}"
          );
  GSimpleFS.LoadFragmentShader(
          "varying vec2 tcoord;\n"
          "uniform sampler2D tex;\n"
          "void main(void)\n"
          "{\n"
          "  gl_FragColor = texture2D(tex,tcoord);\n"
          "}\n"
          );
  GSimpleProg.Create(&GSimpleVS, &GSimpleFS);
  check();
  glUseProgram(GSimpleProg.GetId());
  check();

  //create an ickle vertex buffer
  static const GLfloat quad_vertex_positions[] = {
    0.0f, 0.0f, 1.0f, 1.0f,
    1.0f, 0.0f, 1.0f, 1.0f,
    0.0f, 1.0f, 1.0f, 1.0f,
    1.0f, 1.0f, 1.0f, 1.0f
  };
  glGenBuffers(1, &GQuadVertexBuffer);
  check();
  glBindBuffer(GL_ARRAY_BUFFER, GQuadVertexBuffer);
  glBufferData(GL_ARRAY_BUFFER, sizeof (quad_vertex_positions), quad_vertex_positions, GL_STATIC_DRAW);
  glBindBuffer(GL_ARRAY_BUFFER, 0);
  check();
}

Graphics::~Graphics() {
  plog("~Graphics");
  // Release OpenGL resources
  eglMakeCurrent(GDisplay, EGL_NO_SURFACE, EGL_NO_SURFACE, EGL_NO_CONTEXT);
  eglDestroySurface(GDisplay, GSurface);
  eglDestroyContext(GDisplay, GContext);
  eglTerminate(GDisplay);
}

NAN_METHOD(Graphics::New) {
  if (info.IsConstructCall()) {
    Graphics *obj = new Graphics();
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(Graphics::beginFrame) {
  Graphics* obj = Nan::ObjectWrap::Unwrap<Graphics>(info.This());

  // Prepare viewport
  glViewport(0, 0, obj->GScreenWidth, obj->GScreenHeight);
  check();

  // Clear the background
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  check();
}

NAN_METHOD(Graphics::endFrame) {
  Graphics* obj = Nan::ObjectWrap::Unwrap<Graphics>(info.This());

  eglSwapBuffers(obj->GDisplay, obj->GSurface);
  check();
}

NAN_METHOD(Graphics::drawTextureRect) {
  using namespace std::chrono;

  Graphics* obj = Nan::ObjectWrap::Unwrap<Graphics>(info.This());

  EglImage* eglImage = Nan::ObjectWrap::Unwrap<EglImage>(Nan::To<v8::Object>(info[0]).ToLocalChecked());
  double x0 = Nan::To<double>(info[1]).FromJust();
  double y0 = Nan::To<double>(info[2]).FromJust();
  double x1 = Nan::To<double>(info[3]).FromJust();
  double y1 = Nan::To<double>(info[4]).FromJust();

  glUseProgram(obj->GSimpleProg.GetId());

  glUniform2f(glGetUniformLocation(obj->GSimpleProg.GetId(), "offset"), x0, y0);
  glUniform2f(glGetUniformLocation(obj->GSimpleProg.GetId(), "scale"), x1 - x0, y1 - y0);
  glUniform1i(glGetUniformLocation(obj->GSimpleProg.GetId(), "tex"), 0);

  glBindBuffer(GL_ARRAY_BUFFER, obj->GQuadVertexBuffer);

  GfxTexture* _texture = Nan::ObjectWrap::Unwrap<GfxTexture>(Nan::New(eglImage->texture));
  glBindTexture(GL_TEXTURE_2D, _texture->GetId());

  GLuint loc = glGetAttribLocation(obj->GSimpleProg.GetId(), "vertex");

  glVertexAttribPointer(loc, 4, GL_FLOAT, 0, 16, 0);

  glEnableVertexAttribArray(loc);

  glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
  check();
}