#pragma once

#include <stdio.h>
#include <stdarg.h>
#define VERBOSE

static void log(const char * format, ...) {
#ifdef VERBOSE
  va_list args;
  va_start(args, format);
  vprintf(format, args);
  printf("\n");
  va_end(args);
#endif
}