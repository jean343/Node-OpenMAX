/*********************************************************************
 * NAN - Native Abstractions for Node.js
 *
 * Copyright (c) 2016 NAN contributors
 *
 * MIT License <https://github.com/nodejs/nan/blob/master/LICENSE.md>
 ********************************************************************/

#include <nan.h>
#include "CopyAsync.h"
#include <algorithm>    // std::min

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

class CopyWorker : public AsyncWorker {
public:

  CopyWorker(Callback *callback, char* source, char* dest, int destnStride, int destnSliceHeight, int offsetX, int offsetY, int nStride, int width, int nSliceHeight, int height)
  : AsyncWorker(callback),
  source(source),
  dest(dest),
  destnStride(destnStride),
  destnSliceHeight(destnSliceHeight),
  offsetX(offsetX),
  offsetY(offsetY),
  nStride(nStride),
  width(width),
  nSliceHeight(nSliceHeight),
  height(height) {
  }

  ~CopyWorker() {
  }

  void copyBlock(char* source, char* dest, int offsetX, int offsetY, int offsetIn, int offsetOut, int nStride, int scale, int w, int h) {
    int nStrideS = nStride / scale;
    int wS = w / scale;
    int offsetYS = offsetY / scale;
    int bufnStrideS = destnStride / scale;
    offsetOut += (offsetX / scale) + (offsetYS * bufnStrideS);

    for (int y = 0; y < h / scale; y++) {
      int sourceStart = offsetIn + (y * nStrideS);

      offsetOut += bufnStrideS;
      memcpy(dest + offsetOut, source + sourceStart, wS);
    }
  }

  // Executed inside the worker-thread.
  // It is not safe to access V8, or V8 data structures
  // here, so everything we need for input and output
  // should go on `this`.

  void Execute() {
    int w = std::min(nStride, width);
    int h = std::min(nSliceHeight, height);

    int bufferFormatSize = destnStride * destnSliceHeight;

    copyBlock(source, dest, offsetX, offsetY, 0, 0, nStride, 1, w, h);
    copyBlock(source, dest, offsetX, offsetY, nStride * nSliceHeight, bufferFormatSize, nStride, 2, w, h);
    copyBlock(source, dest, offsetX, offsetY, ((5 * nStride * nSliceHeight) / 4), ((5 * bufferFormatSize) / 4), nStride, 2, w, h);
  }

  // Executed when the async work is complete
  // this function will be run inside the main event loop
  // so it is safe to use V8 again

  void HandleOKCallback() {
    HandleScope scope;

    Local<Value> argv[] = {
      Null()
    };

    callback->Call(1, argv);
  }

private:
  char* source;
  char* dest;
  int destnStride;
  int destnSliceHeight;
  int offsetX;
  int offsetY;
  int nStride;
  int width;
  int nSliceHeight;
  int height;
};

// Asynchronous access to the `Estimate()` function

NAN_METHOD(CopyAsync) {
  v8::Local<v8::Object> sourceObj = info[0]->ToObject();
  char* source = node::Buffer::Data(sourceObj);

  v8::Local<v8::Object> destObj = info[1]->ToObject();
  char* dest = node::Buffer::Data(destObj);

  int destnStride = To<int>(info[2]).FromJust();
  int destnSliceHeight = To<int>(info[3]).FromJust();
  int offsetX = To<int>(info[4]).FromJust();
  int offsetY = To<int>(info[5]).FromJust();
  int nStride = To<int>(info[6]).FromJust();
  int width = To<int>(info[7]).FromJust();
  int nSliceHeight = To<int>(info[8]).FromJust();
  int height = To<int>(info[9]).FromJust();

  Callback *callback = new Callback(info[10].As<Function>());

  AsyncQueueWorker(new CopyWorker(callback, source, dest, destnStride, destnSliceHeight, offsetX, offsetY, nStride, width, nSliceHeight, height));
}