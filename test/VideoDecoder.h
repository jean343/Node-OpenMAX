#pragma once

#include <stdio.h>
#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

#include "Component.h"

class VideoDecoder : public Component {
public:

  VideoDecoder() : Component(130, 131) {
    port_settings_changed = false;
    first_packet = true;
  }

  int createComponent();
  void setup();
  bool newPacket(unsigned char * dest, int bufferSize);

  static void _fill_done_callback(void *userdata, COMPONENT_T *comp) {
    VideoDecoder* dummySink = (VideoDecoder*) userdata;
    dummySink->fill_done_callback(comp);
  }
  void fill_done_callback(COMPONENT_T *comp);
private:

  bool port_settings_changed;
  bool first_packet;
};