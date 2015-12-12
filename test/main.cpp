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

  TUNNEL_T tunnel[2];
  memset(tunnel, 0, sizeof (tunnel));
  set_tunnel(tunnel, vd->component, vd->out_port, vr->component, vr->in_port);

  vd->setup();
  vd->enableInputPortBuffer();
  vd->changeState(OMX_StateExecuting);
  //  vd->enableOutputPortBuffer();

  int data_len = 0;
  unsigned char dest[1024 * 10];
  do {
    data_len = fread(dest, 1, sizeof (dest), in);
    if (vd->newPacket(dest, data_len)) {
      if (ilclient_setup_tunnel(tunnel, 0, 0) != 0) {
        return -7;
      }
      vr->changeState(OMX_StateExecuting);
    }


  } while (data_len > 0);

//  OMX_BUFFERHEADERTYPE *buf = ilclient_get_input_buffer(vd->component, 130, 1);
//  buf->nFilledLen = 0;
//  buf->nFlags = OMX_BUFFERFLAG_TIME_UNKNOWN | OMX_BUFFERFLAG_EOS;
//
//  if (OMX_EmptyThisBuffer(vd->handle, buf) != OMX_ErrorNone) {
//    printf("OMX_EmptyThisBuffer 2 failed\n");
//  }
//  printf("OMX_EmptyThisBuffer\n");

  // wait for EOS from render
//  ilclient_wait_for_event(vr->component, OMX_EventBufferFlag, 90, 0, OMX_BUFFERFLAG_EOS, 0, ILCLIENT_BUFFER_FLAG_EOS, 100);

  printf("wait_for_event\n");

  // need to flush the renderer to allow vd->component to disable its input port
  ilclient_flush_tunnels(tunnel, 0);
  printf("flush_tunnels\n");

  ilclient_disable_port_buffers(vd->component, 130, NULL, NULL, NULL);
  printf("disable_port_buffers\n");

  ilclient_disable_tunnel(tunnel);
  ilclient_teardown_tunnels(tunnel);
  printf("teardown_tunnels\n");

//  ilclient_state_transition(list, OMX_StateIdle);
//  ilclient_state_transition(list, OMX_StateLoaded);
  printf("transition_tunnels\n");

//  ilclient_cleanup_components(list);
  printf("cleanup_components\n");

  OMX_Deinit();
  printf("OMX_Deinit\n");

  delete vd;
  printf("ilclient_destroy\n");

  return 0;
}

