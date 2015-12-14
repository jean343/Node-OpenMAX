#include "BUFFERHEADERTYPE.h"
Nan::Persistent<v8::Function> BUFFERHEADERTYPE::constructor;

NAN_MODULE_INIT(BUFFERHEADERTYPE::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("BUFFERHEADERTYPE").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("nAllocLen").ToLocalChecked(), nAllocLenGet);
  Nan::SetPrototypeMethod(tpl, "set", set);
  Nan::SetPrototypeMethod(tpl, "get", get);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("BUFFERHEADERTYPE").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

BUFFERHEADERTYPE::BUFFERHEADERTYPE(OMX_BUFFERHEADERTYPE* buf) : buf(buf), first_packet(true) {
}

BUFFERHEADERTYPE::~BUFFERHEADERTYPE() {
}

NAN_METHOD(BUFFERHEADERTYPE::New) {
  if (info.IsConstructCall()) {
    OMX_BUFFERHEADERTYPE* buf = (OMX_BUFFERHEADERTYPE*) (v8::Local<v8::External>::Cast(info[0])->Value());

    BUFFERHEADERTYPE *obj = new BUFFERHEADERTYPE(buf);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_GETTER(BUFFERHEADERTYPE::nAllocLenGet) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  info.GetReturnValue().Set(obj->buf->nAllocLen);
}

NAN_METHOD(BUFFERHEADERTYPE::set) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());
  OMX_BUFFERHEADERTYPE* buf = obj->buf;

  v8::Local<v8::Object> bufferObj = info[0]->ToObject();
  char* bufferData = node::Buffer::Data(bufferObj);
  size_t bufferLength = node::Buffer::Length(bufferObj);

  if (bufferLength > buf->nAllocLen) { // bound check
    bufferLength = buf->nAllocLen;
  }

  memcpy(buf->pBuffer, bufferData, bufferLength);

  buf->nFilledLen = bufferLength;

  if (obj->first_packet) {
    buf->nFlags = OMX_BUFFERFLAG_STARTTIME;
    obj->first_packet = false;
  } else {
    buf->nFlags = OMX_BUFFERFLAG_TIME_UNKNOWN;
  }
  info.GetReturnValue().Set(info.This());
}

NAN_METHOD(BUFFERHEADERTYPE::get) {
  BUFFERHEADERTYPE* obj = Nan::ObjectWrap::Unwrap<BUFFERHEADERTYPE>(info.This());

  // This is Buffer that actually makes heap-allocated raw binary available
  // to userland code.
  node::Buffer *slowBuffer = node::Buffer::New(obj->buf->nFilledLen);

  // Buffer:Data gives us a yummy void* pointer to play with to our hearts
  // content.
  memcpy(node::Buffer::Data(slowBuffer), obj->buf->pBuffer, obj->buf->nFilledLen);

  // Now we need to create the JS version of the Buffer I was telling you about.
  // To do that we need to actually pull it from the execution context.
  // First step is to get a handle to the global object.
  v8::Local<v8::Object> globalObj = v8::Context::GetCurrent()->Global();

  // Now we need to grab the Buffer constructor function.
  v8::Local<v8::Function> bufferConstructor = v8::Local<v8::Function>::Cast(globalObj->Get(v8::String::New("Buffer")));

  // Great. We can use this constructor function to allocate new Buffers.
  // Let's do that now. First we need to provide the correct arguments.
  // First argument is the JS object Handle for the SlowBuffer.
  // Second arg is the length of the SlowBuffer.
  // Third arg is the offset in the SlowBuffer we want the .. "Fast"Buffer to start at.
  v8::Handle<v8::Value> constructorArgs[3] = {slowBuffer->handle_, v8::Integer::New(obj->buf->nFilledLen), v8::Integer::New(0)};

  // Now we have our constructor, and our constructor args. Let's create the 
  // damn Buffer already!
  v8::Local<v8::Object> actualBuffer = bufferConstructor->NewInstance(3, constructorArgs);

  obj->buf->nFilledLen = 0;

  info.GetReturnValue().Set(actualBuffer);
}