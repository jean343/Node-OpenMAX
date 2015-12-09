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

  ILCLIENT_T *clientHandle = ilclient_init();
  if (clientHandle == NULL) {
    fprintf(stderr, "IL client init failed\n");
    exit(1);
  }

  if (OMX_Init() != OMX_ErrorNone) {
    ilclient_destroy(clientHandle);
    fprintf(stderr, "OMX init failed\n");
    exit(1);
  }

  ilclient_set_error_callback(clientHandle, Component::error_callback, NULL);

  VideoDecoder* vd = new VideoDecoder(clientHandle);
  vd->createComponent();

  VideoRender* vr = new VideoRender(clientHandle);
  vr->createComponent();

  TUNNEL_T tunnel;
  memset(&tunnel, 0, sizeof (tunnel));
  set_tunnel(&tunnel, vd->component, vd->out_port, vr->component, vr->in_port);

  vd->changeState(OMX_StateIdle);
  vd->setup();
  vd->enableInputPortBuffer();
  vd->changeState(OMX_StateExecuting);
  //    vd->enableOutputPortBuffer();
  //  

  //  int data_len = 0;
  //  unsigned char dest[1024*8];
  //  do {
  //    data_len = fread(dest, 1, sizeof (dest), in);
  //    vd->newPacket(dest, data_len);
  //    
  //  } while (data_len > 0);


  OMX_BUFFERHEADERTYPE *buf;
  int port_settings_changed = 0;
  int first_packet = 1;
  unsigned int data_len = 0;
  while ((buf = ilclient_get_input_buffer(vd->component, vd->in_port, 1)) != NULL) {
    // feed data and wait until we get port settings changed
    unsigned char *dest = buf->pBuffer;

    data_len += fread(dest, 1, buf->nAllocLen - data_len, in);
    printf("read\n");
    if (port_settings_changed == 0 &&
            ((data_len > 0 && ilclient_remove_event(vd->component, OMX_EventPortSettingsChanged, vd->out_port, 0, 0, 1) == 0) ||
            (data_len == 0 && ilclient_wait_for_event(vd->component, OMX_EventPortSettingsChanged, vd->out_port, 0, 0, 1,
            ILCLIENT_EVENT_ERROR | ILCLIENT_PARAMETER_CHANGED, 10000) == 0))) {
      port_settings_changed = 1;
      printf("port_settings_changed = true\n");

      if (ilclient_setup_tunnel(&tunnel, 0, 0) != 0) {
        return -7;
        break;
      }

      ilclient_change_component_state(vr->component, OMX_StateExecuting);
    }
    if (!data_len)
      break;

    buf->nFilledLen = data_len;
    data_len = 0;

    buf->nOffset = 0;
    if (first_packet) {
      buf->nFlags = OMX_BUFFERFLAG_STARTTIME;
      first_packet = 0;
    } else
      buf->nFlags = OMX_BUFFERFLAG_TIME_UNKNOWN;

    if (OMX_EmptyThisBuffer(vd->handle, buf) != OMX_ErrorNone) {
      return -6;
    }
  }
  delete vd;
  return 0;
}

