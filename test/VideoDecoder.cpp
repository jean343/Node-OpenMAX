#include "VideoDecoder.h"

int VideoDecoder::createComponent() {
  return Component::createComponent("video_decode", (ILCLIENT_CREATE_FLAGS_T) (ILCLIENT_DISABLE_ALL_PORTS | ILCLIENT_ENABLE_INPUT_BUFFERS));
}

void VideoDecoder::setup() {
  printf("setup\n");
  OMX_VIDEO_PARAM_PORTFORMATTYPE format;
  memset(&format, 0, sizeof (OMX_VIDEO_PARAM_PORTFORMATTYPE));
  format.nSize = sizeof (OMX_VIDEO_PARAM_PORTFORMATTYPE);
  format.nVersion.nVersion = OMX_VERSION;
  format.nPortIndex = in_port;
  format.eCompressionFormat = OMX_VIDEO_CodingAVC;

  if (OMX_SetParameter(handle, OMX_IndexParamVideoPortFormat, &format) != OMX_ErrorNone) {
    printf("OMX_SetParameter Failed\n");
  }
}

int VideoDecoder::newPacket(unsigned char * dest, int bufferSize) {
  unsigned char const start_code[4] = {0x00, 0x00, 0x00, 0x01};

  OMX_BUFFERHEADERTYPE* buf;
  printf("getInputBuffer\n");
  if ((buf = getInputBuffer(DO_BLOCK)) != NULL) {
    // feed data and wait until we get port settings changed

    buf->nOffset = 0;
    buf->nFilledLen = bufferSize;
    memcpy(buf->pBuffer, dest, bufferSize);

    //    buf->nFilledLen = bufferSize + sizeof (start_code);
    //    memcpy(buf->pBuffer, start_code, sizeof (start_code));
    //    memcpy(buf->pBuffer + sizeof (start_code), dest, bufferSize);

    printf("port_settings_changed %d %d first_packet:%d %d\n", port_settings_changed, buf->nFilledLen, first_packet, out_port);
    if (port_settings_changed == false &&
            ((buf->nFilledLen > 0 && ilclient_remove_event(component, OMX_EventPortSettingsChanged, out_port, 0, 0, 1) == 0) ||
            (buf->nFilledLen == 0 && ilclient_wait_for_event(component, OMX_EventPortSettingsChanged, out_port, 0, 0, 1, ILCLIENT_EVENT_ERROR | ILCLIENT_PARAMETER_CHANGED, 10000) == 0))) {
      port_settings_changed = true;
      printf("port_settings_changed = true\n");

      //      if (ilclient_setup_tunnel(tunnel, 0, 0) != 0) {
      //        printf("%s ilclient_setup_tunnel 0 failed\n", t1());
      //        status = -7;
      //        return status;
      //      }
      //
      //      ilclient_change_component_state(video_render, OMX_StateExecuting);
    }

    if (first_packet) {
      buf->nFlags = OMX_BUFFERFLAG_STARTTIME;
      first_packet = false;
    } else
      buf->nFlags = OMX_BUFFERFLAG_TIME_UNKNOWN;

    printf("OMX_EmptyThisBuffer\n");
    if (OMX_EmptyThisBuffer(handle, buf) != OMX_ErrorNone) {
      printf("OMX_EmptyThisBuffer 1 failed\n");
      return -6;
    }
  } else {
    return -1;
  }
  return 0;
}