//This file is auto-generated from 'node headerGeneration/generateComponents.js' 

import util = require('util')
import omx = require('../../')

export class VideoSplitter extends omx.Component {
  constructor() {
    super('video_splitter');
    var self = this;
    this.init(omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS | omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS | omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS);
    this.component.setPorts(250, 251);
  }
  
  
}