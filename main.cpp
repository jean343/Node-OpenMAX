//https://github.com/fcanas/node-native-boilerplate
//https://github.com/nodejs/nan/blob/master/doc/object_wrappers.md

#include <nan.h>
#include <unistd.h>

using v8::Value;
using v8::Local;
using v8::Function;
using v8::FunctionTemplate;

class MyObject : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);

private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static NAN_METHOD(New);
  static NAN_METHOD(PlusOne);
  static NAN_METHOD(SleepSync);
  static NAN_METHOD(Sleep);
  static Nan::Persistent<v8::Function> constructor;
  double value_;
};

Nan::Persistent<v8::Function> MyObject::constructor;

NAN_MODULE_INIT(MyObject::Init) {
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Nan::SetPrototypeMethod(tpl, "plusOne", PlusOne);
  Nan::SetPrototypeMethod(tpl, "sleepSync", SleepSync);
  Nan::SetPrototypeMethod(tpl, "sleep", Sleep);

  constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
  Nan::Set(target, Nan::New("MyObject").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
}

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

NAN_METHOD(MyObject::New) {
  if (info.IsConstructCall()) {
    double value = info[0]->IsUndefined() ? 0 : Nan::To<double>(info[0]).FromJust();
    MyObject *obj = new MyObject(value);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = {info[0]};
    v8::Local<v8::Function> cons = Nan::New(constructor);
    info.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

NAN_METHOD(MyObject::PlusOne) {
  MyObject* obj = Nan::ObjectWrap::Unwrap<MyObject>(info.This());
  obj->value_ += 1;
  info.GetReturnValue().Set(obj->value_);
}

NAN_METHOD(MyObject::SleepSync) {
  int value = info[0]->IsUndefined() ? 0 : Nan::To<int>(info[0]).FromJust();
  sleep(value);
}

class AsyncSleepWorker : public Nan::AsyncWorker {
public:

  AsyncSleepWorker(Nan::Callback *callback, MyObject* obj, int value) : Nan::AsyncWorker(callback), obj(obj), value(value) {
  }

  ~AsyncSleepWorker() {
  }

  void Execute() {
    sleep(value);
  }

private:
  MyObject *obj;
  int value;
};

NAN_METHOD(MyObject::Sleep) {
  MyObject* obj = Nan::ObjectWrap::Unwrap<MyObject>(info.This());

  int value = info[0]->IsUndefined() ? 0 : Nan::To<int>(info[0]).FromJust();

  Local<Function> callbackHandle = info[1].As<Function>();
  Nan::Callback *callback = new Nan::Callback(callbackHandle);

//  Nan::MakeCallback(Nan::GetCurrentContext()->Global(), callbackHandle, 0, 0);
  Nan::AsyncQueueWorker(new AsyncSleepWorker(callback, obj, value));
}

void hello(const Nan::FunctionCallbackInfo<Value>& info) {
  info.GetReturnValue().Set(Nan::New("world").ToLocalChecked());
}

NAN_MODULE_INIT(Init) {
  Nan::Set(target, Nan::New("hello").ToLocalChecked(),
          Nan::GetFunction(Nan::New<FunctionTemplate>(hello)).ToLocalChecked());

  MyObject::Init(target);
}

NODE_MODULE(hello, Init)