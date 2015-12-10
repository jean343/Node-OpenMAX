#include "VideoDecoder.h"
#include "VideoRender.h"

using namespace std;

int main(int argc, char** argv) {
  bcm_host_init();

  FILE *in;
  if ((in = fopen("../test.h264", "rb")) == NULL) {
    printf("../test.h264 not found \n");
    return -2;
  }

  VideoDecoder* vd = new VideoDecoder();
  vd->createComponent();
  vd->changeState(OMX_StateIdle);

  VideoRender* vr = new VideoRender();
  vr->createComponent();
  vr->changeState(OMX_StateIdle);

  TUNNEL_T tunnel;
  memset(&tunnel, 0, sizeof (tunnel));
  set_tunnel(&tunnel, vd->component, vd->out_port, vr->component, vr->in_port);

  vd->setup();
  vd->enableInputPortBuffer();
  vd->changeState(OMX_StateExecuting);
  //  vd->enableOutputPortBuffer();

  int data_len = 0;
  unsigned char dest[1024 * 10];
  do {
    data_len = fread(dest, 1, sizeof (dest), in);
    if (vd->newPacket(dest, data_len)) {
      if (ilclient_setup_tunnel(&tunnel, 0, 0) != 0) {
        return -7;
      }
      vr->changeState(OMX_StateExecuting);
    }


  } while (data_len > 0);

  delete vd;
  return 0;
}

