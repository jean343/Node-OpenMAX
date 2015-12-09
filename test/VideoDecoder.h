#pragma once

#include <stdio.h>
#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

#include "Component.h"

class VideoDecoder : public Component {
public:

  VideoDecoder(ILCLIENT_T *clientHandle) : Component(130, 131) {
    this->clientHandle = clientHandle;
    port_settings_changed = false;
    first_packet = true;
  }

  int createComponent();
  void setup();
  int newPacket(unsigned char * dest, int bufferSize);
private:

  bool port_settings_changed;
  bool first_packet;
};