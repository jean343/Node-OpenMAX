#pragma once

#include <stdio.h>
#include "bcm_host.h"
extern "C" {
#include "ilclient.h"
}

#include "Component.h"

class VideoRender : public Component {
public:

  VideoRender() : Component(90, -1) {
  }

  int createComponent() {
    return Component::createComponent("video_render", (ILCLIENT_CREATE_FLAGS_T) (ILCLIENT_DISABLE_ALL_PORTS));
  }
};