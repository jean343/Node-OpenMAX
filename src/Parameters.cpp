#include "Parameters.h"

v8::Local<v8::Object> Parameters::GetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();

  switch (nParamIndex) {
    case OMX_IndexParamPriorityMgmt:
    {
      OMX_PRIORITYMGMTTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nGroupPriority").ToLocalChecked(), Nan::New(format.nGroupPriority)); // Priority of the component group
      Nan::Set(ret, Nan::New("nGroupID").ToLocalChecked(), Nan::New(format.nGroupID)); // ID of the component group
    }
      break;
    case OMX_IndexParamAudioInit:
    {
      OMX_PORT_PARAM_TYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nPorts").ToLocalChecked(), Nan::New(format.nPorts)); // The number of ports for this component
      Nan::Set(ret, Nan::New("nStartPortNumber").ToLocalChecked(), Nan::New(format.nStartPortNumber)); // first port number for this type of port
    }
      break;
    case OMX_IndexParamImageInit:
    {
      OMX_PORT_PARAM_TYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nPorts").ToLocalChecked(), Nan::New(format.nPorts)); // The number of ports for this component
      Nan::Set(ret, Nan::New("nStartPortNumber").ToLocalChecked(), Nan::New(format.nStartPortNumber)); // first port number for this type of port
    }
      break;
    case OMX_IndexParamVideoInit:
    {
      OMX_PORT_PARAM_TYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nPorts").ToLocalChecked(), Nan::New(format.nPorts)); // The number of ports for this component
      Nan::Set(ret, Nan::New("nStartPortNumber").ToLocalChecked(), Nan::New(format.nStartPortNumber)); // first port number for this type of port
    }
      break;
    case OMX_IndexParamOtherInit:
    {
      OMX_PORT_PARAM_TYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nPorts").ToLocalChecked(), Nan::New(format.nPorts)); // The number of ports for this component
      Nan::Set(ret, Nan::New("nStartPortNumber").ToLocalChecked(), Nan::New(format.nStartPortNumber)); // first port number for this type of port
    }
      break;
    case OMX_IndexParamNumAvailableStreams:
    {
      OMX_PARAM_U32TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nU32").ToLocalChecked(), Nan::New(format.nU32)); // U32 value
    }
      break;
    case OMX_IndexParamActiveStream:
    {
      OMX_PARAM_U32TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nU32").ToLocalChecked(), Nan::New(format.nU32)); // U32 value
    }
      break;
    case OMX_IndexParamSuspensionPolicy:
    {
      OMX_PARAM_SUSPENSIONPOLICYTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("ePolicy").ToLocalChecked(), Nan::New(format.ePolicy));
    }
      break;
    case OMX_IndexParamComponentSuspended:
    {
      OMX_PARAM_SUSPENSIONTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eType").ToLocalChecked(), Nan::New(format.eType));
    }
      break;
    case OMX_IndexConfigCapturing:
    {
      OMX_CONFIG_BOOLEANTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnabled").ToLocalChecked(), Nan::New(format.bEnabled));
    }
      break;
    case OMX_IndexConfigCaptureMode:
    {
      OMX_CONFIG_CAPTUREMODETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bContinuous").ToLocalChecked(), Nan::New(format.bContinuous)); // If true then ignore frame rate and emit capture data as fast as possible (otherwise obey port's frame rate).
      Nan::Set(ret, Nan::New("bFrameLimited").ToLocalChecked(), Nan::New(format.bFrameLimited)); // If true then terminate capture after the port emits the specified number of frames (otherwise the port does not terminate the capture until instructed to do so by the client). Even if set, the client may manually terminate the capture prior to reaching the limit.
      Nan::Set(ret, Nan::New("nFrameLimit").ToLocalChecked(), Nan::New(format.nFrameLimit)); // Limit on number of frames emitted during a capture (only valid if bFrameLimited is set).
    }
      break;
    case OMX_IndexAutoPauseAfterCapture:
    {
      OMX_CONFIG_BOOLEANTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnabled").ToLocalChecked(), Nan::New(format.bEnabled));
    }
      break;
    case OMX_IndexParamContentURI:
    {
      OMX_PARAM_CONTENTURITYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("contentURI").ToLocalChecked(), Nan::New(format.contentURI)); // The URI name
    }
      break;
    case OMX_IndexParamCustomContentPipe:
    {
      OMX_PARAM_CONTENTPIPETYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("hPipe").ToLocalChecked(), Nan::New(format.hPipe)); // The pipe handle
    }
      break;
    case OMX_IndexParamDisableResourceConcealment:
    {
      OMX_RESOURCECONCEALMENTTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bResourceConcealmentForbidden").ToLocalChecked(), Nan::New(format.bResourceConcealmentForbidden)); // disallow the use of resource concealment methods (like degrading algorithm quality to lower resource consumption or functional bypass) on a component as a resolution to resource conflicts.
    }
      break;
    case OMX_IndexConfigMetadataItemCount:
    {
      OMX_CONFIG_METADATAITEMCOUNTTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eScopeMode").ToLocalChecked(), Nan::New(format.eScopeMode));
      Nan::Set(ret, Nan::New("nScopeSpecifier").ToLocalChecked(), Nan::New(format.nScopeSpecifier));
      Nan::Set(ret, Nan::New("nMetadataItemCount").ToLocalChecked(), Nan::New(format.nMetadataItemCount));
    }
      break;
    case OMX_IndexConfigContainerNodeCount:
    {
      OMX_CONFIG_CONTAINERNODECOUNTTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bAllKeys").ToLocalChecked(), Nan::New(format.bAllKeys));
      Nan::Set(ret, Nan::New("nParentNodeID").ToLocalChecked(), Nan::New(format.nParentNodeID));
      Nan::Set(ret, Nan::New("nNumNodes").ToLocalChecked(), Nan::New(format.nNumNodes));
    }
      break;
    case OMX_IndexConfigMetadataItem:
    {
      OMX_CONFIG_METADATAITEMTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eScopeMode").ToLocalChecked(), Nan::New(format.eScopeMode));
      Nan::Set(ret, Nan::New("nScopeSpecifier").ToLocalChecked(), Nan::New(format.nScopeSpecifier));
      Nan::Set(ret, Nan::New("nMetadataItemIndex").ToLocalChecked(), Nan::New(format.nMetadataItemIndex));
      Nan::Set(ret, Nan::New("eSearchMode").ToLocalChecked(), Nan::New(format.eSearchMode));
      Nan::Set(ret, Nan::New("eKeyCharset").ToLocalChecked(), Nan::New(format.eKeyCharset));
      Nan::Set(ret, Nan::New("nKeySizeUsed").ToLocalChecked(), Nan::New(format.nKeySizeUsed));
      Nan::Set(ret, Nan::New("nKey").ToLocalChecked(), Nan::New(format.nKey));
      Nan::Set(ret, Nan::New("eValueCharset").ToLocalChecked(), Nan::New(format.eValueCharset));
      Nan::Set(ret, Nan::New("nValueMaxSize").ToLocalChecked(), Nan::New(format.nValueMaxSize));
      Nan::Set(ret, Nan::New("nValueSizeUsed").ToLocalChecked(), Nan::New(format.nValueSizeUsed));
      Nan::Set(ret, Nan::New("nValue").ToLocalChecked(), Nan::New(format.nValue));
    }
      break;
    case OMX_IndexConfigCounterNodeID:
    {
      OMX_CONFIG_CONTAINERNODEIDTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bAllKeys").ToLocalChecked(), Nan::New(format.bAllKeys));
      Nan::Set(ret, Nan::New("nParentNodeID").ToLocalChecked(), Nan::New(format.nParentNodeID));
      Nan::Set(ret, Nan::New("nNodeIndex").ToLocalChecked(), Nan::New(format.nNodeIndex));
      Nan::Set(ret, Nan::New("nNodeID").ToLocalChecked(), Nan::New(format.nNodeID));
      Nan::Set(ret, Nan::New("bIsLeafType").ToLocalChecked(), Nan::New(format.bIsLeafType));
    }
      break;
    case OMX_IndexParamMetadataFilterType:
    {
      OMX_PARAM_METADATAFILTERTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bAllKeys").ToLocalChecked(), Nan::New(format.bAllKeys)); // if true then this structure refers to all keys and the three key fields below are ignored
      Nan::Set(ret, Nan::New("eKeyCharset").ToLocalChecked(), Nan::New(format.eKeyCharset));
      Nan::Set(ret, Nan::New("nKeySizeUsed").ToLocalChecked(), Nan::New(format.nKeySizeUsed));
      Nan::Set(ret, Nan::New("nKey ").ToLocalChecked(), Nan::New(format.nKey ));
      Nan::Set(ret, Nan::New("nLanguageCountrySizeUsed").ToLocalChecked(), Nan::New(format.nLanguageCountrySizeUsed));
      Nan::Set(ret, Nan::New("nLanguageCountry").ToLocalChecked(), Nan::New(format.nLanguageCountry));
      Nan::Set(ret, Nan::New("bEnabled").ToLocalChecked(), Nan::New(format.bEnabled)); // if true then key is part of filter (e.g. retained for query later). If false then key is not part of filter
    }
      break;
    case OMX_IndexParamMetadataKeyFilter:
    {
      OMX_PARAM_METADATAFILTERTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bAllKeys").ToLocalChecked(), Nan::New(format.bAllKeys)); // if true then this structure refers to all keys and the three key fields below are ignored
      Nan::Set(ret, Nan::New("eKeyCharset").ToLocalChecked(), Nan::New(format.eKeyCharset));
      Nan::Set(ret, Nan::New("nKeySizeUsed").ToLocalChecked(), Nan::New(format.nKeySizeUsed));
      Nan::Set(ret, Nan::New("nKey ").ToLocalChecked(), Nan::New(format.nKey ));
      Nan::Set(ret, Nan::New("nLanguageCountrySizeUsed").ToLocalChecked(), Nan::New(format.nLanguageCountrySizeUsed));
      Nan::Set(ret, Nan::New("nLanguageCountry").ToLocalChecked(), Nan::New(format.nLanguageCountry));
      Nan::Set(ret, Nan::New("bEnabled").ToLocalChecked(), Nan::New(format.bEnabled)); // if true then key is part of filter (e.g. retained for query later). If false then key is not part of filter
    }
      break;
    case OMX_IndexConfigPriorityMgmt:
    {
      OMX_PRIORITYMGMTTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nGroupPriority").ToLocalChecked(), Nan::New(format.nGroupPriority)); // Priority of the component group
      Nan::Set(ret, Nan::New("nGroupID").ToLocalChecked(), Nan::New(format.nGroupID)); // ID of the component group
    }
      break;
    case OMX_IndexParamStandardComponentRole:
    {
      OMX_PARAM_COMPONENTROLETYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("cRole").ToLocalChecked(), Nan::New(format.cRole)); // name of standard component which defines component role
    }
      break;
    case OMX_IndexParamPortDefinition:
    {
      OMX_PARAM_PORTDEFINITIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eDir").ToLocalChecked(), Nan::New(format.eDir)); // Direction (input or output) of this port
      Nan::Set(ret, Nan::New("nBufferCountActual").ToLocalChecked(), Nan::New(format.nBufferCountActual)); // The actual number of buffers allocated on this port
      Nan::Set(ret, Nan::New("nBufferCountMin").ToLocalChecked(), Nan::New(format.nBufferCountMin)); // The minimum number of buffers this port requires
      Nan::Set(ret, Nan::New("nBufferSize").ToLocalChecked(), Nan::New(format.nBufferSize)); // Size, in bytes, for buffers to be used for this channel
      Nan::Set(ret, Nan::New("bEnabled").ToLocalChecked(), Nan::New(format.bEnabled)); // Ports default to enabled and are enabled/disabled by OMX_CommandPortEnable/OMX_CommandPortDisable. When disabled a port is unpopulated. A disabled port is not populated with buffers on a transition to IDLE.
      Nan::Set(ret, Nan::New("bPopulated").ToLocalChecked(), Nan::New(format.bPopulated)); // Port is populated with all of its buffers as indicated by nBufferCountActual. A disabled port is always unpopulated. An enabled port is populated on a transition to OMX_StateIdle and unpopulated on a transition to loaded.
      Nan::Set(ret, Nan::New("eDomain").ToLocalChecked(), Nan::New(format.eDomain)); // Domain of the port. Determines the contents of metadata below.
    }
      break;
    case OMX_IndexParamCompBufferSupplier:
    {
      OMX_PARAM_BUFFERSUPPLIERTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eBufferSupplier").ToLocalChecked(), Nan::New(format.eBufferSupplier)); // buffer supplier
    }
      break;
    case OMX_IndexParamAudioPortFormat:
    {
      OMX_AUDIO_PARAM_PORTFORMATTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex)); // Indicates the enumeration index for the format from 0x0 to N-1
      Nan::Set(ret, Nan::New("eEncoding").ToLocalChecked(), Nan::New(format.eEncoding)); // Type of data expected for this port (e.g. PCM, AMR, MP3, etc)
    }
      break;
    case OMX_IndexParamAudioPcm:
    {
      OMX_AUDIO_PARAM_PCMMODETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels (e.g. 2 for stereo)
      Nan::Set(ret, Nan::New("eNumData").ToLocalChecked(), Nan::New(format.eNumData)); // indicates PCM data as signed or unsigned
      Nan::Set(ret, Nan::New("eEndian").ToLocalChecked(), Nan::New(format.eEndian)); // indicates PCM data as little or big endian
      Nan::Set(ret, Nan::New("bInterleaved").ToLocalChecked(), Nan::New(format.bInterleaved)); // True for normal interleaved data; false for non-interleaved data (e.g. block data)
      Nan::Set(ret, Nan::New("nBitPerSample").ToLocalChecked(), Nan::New(format.nBitPerSample)); // Bit per sample
      Nan::Set(ret, Nan::New("nSamplingRate").ToLocalChecked(), Nan::New(format.nSamplingRate)); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      Nan::Set(ret, Nan::New("ePCMMode").ToLocalChecked(), Nan::New(format.ePCMMode)); // PCM mode enumeration
      Nan::Set(ret, Nan::New("eChannelMapping").ToLocalChecked(), Nan::New(format.eChannelMapping)); // Slot i contains channel defined by eChannelMap[i]
    }
      break;
    case OMX_IndexParamAudioAac:
    {
      OMX_AUDIO_PARAM_AACPROFILETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels
      Nan::Set(ret, Nan::New("nSampleRate").ToLocalChecked(), Nan::New(format.nSampleRate)); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      Nan::Set(ret, Nan::New("nBitRate").ToLocalChecked(), Nan::New(format.nBitRate)); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      Nan::Set(ret, Nan::New("nAudioBandWidth").ToLocalChecked(), Nan::New(format.nAudioBandWidth)); // Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
      Nan::Set(ret, Nan::New("nFrameLength").ToLocalChecked(), Nan::New(format.nFrameLength)); // Frame length (in audio samples per channel) of the codec. Can be 1024 or 960 (AAC-LC), 2048 (HE-AAC), 480 or 512 (AAC-LD). Use 0 to let encoder decide
      Nan::Set(ret, Nan::New("nAACtools").ToLocalChecked(), Nan::New(format.nAACtools)); // AAC tool usage
      Nan::Set(ret, Nan::New("nAACERtools").ToLocalChecked(), Nan::New(format.nAACERtools)); // MPEG-4 AAC error resilience tool usage
      Nan::Set(ret, Nan::New("eAACProfile").ToLocalChecked(), Nan::New(format.eAACProfile)); // AAC profile enumeration
      Nan::Set(ret, Nan::New("eAACStreamFormat").ToLocalChecked(), Nan::New(format.eAACStreamFormat)); // AAC stream format enumeration
      Nan::Set(ret, Nan::New("eChannelMode").ToLocalChecked(), Nan::New(format.eChannelMode)); // Channel mode enumeration
    }
      break;
    case OMX_IndexParamAudioRa:
    {
      OMX_AUDIO_PARAM_RATYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels
      Nan::Set(ret, Nan::New("nSamplingRate").ToLocalChecked(), Nan::New(format.nSamplingRate)); // is the sampling rate of the source data
      Nan::Set(ret, Nan::New("nBitsPerFrame").ToLocalChecked(), Nan::New(format.nBitsPerFrame)); // is the value for bits per frame
      Nan::Set(ret, Nan::New("nSamplePerFrame").ToLocalChecked(), Nan::New(format.nSamplePerFrame)); // is the value for samples per frame
      Nan::Set(ret, Nan::New("nCouplingQuantBits").ToLocalChecked(), Nan::New(format.nCouplingQuantBits)); // is the number of coupling quantization bits in the stream
      Nan::Set(ret, Nan::New("nCouplingStartRegion").ToLocalChecked(), Nan::New(format.nCouplingStartRegion)); // is the coupling start region in the stream
      Nan::Set(ret, Nan::New("nNumRegions").ToLocalChecked(), Nan::New(format.nNumRegions)); // is the number of regions value
      Nan::Set(ret, Nan::New("eFormat").ToLocalChecked(), Nan::New(format.eFormat)); // is the RealAudio audio format
    }
      break;
    case OMX_IndexParamAudioMp3:
    {
      OMX_AUDIO_PARAM_MP3TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels
      Nan::Set(ret, Nan::New("nBitRate").ToLocalChecked(), Nan::New(format.nBitRate)); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      Nan::Set(ret, Nan::New("nSampleRate").ToLocalChecked(), Nan::New(format.nSampleRate)); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      Nan::Set(ret, Nan::New("nAudioBandWidth").ToLocalChecked(), Nan::New(format.nAudioBandWidth)); // Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
      Nan::Set(ret, Nan::New("eChannelMode").ToLocalChecked(), Nan::New(format.eChannelMode)); // Channel mode enumeration
      Nan::Set(ret, Nan::New("eFormat").ToLocalChecked(), Nan::New(format.eFormat)); // MP3 stream format
    }
      break;
    case OMX_IndexParamAudioAdpcm:
    {
      OMX_AUDIO_PARAM_ADPCMTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("nBitsPerSample").ToLocalChecked(), Nan::New(format.nBitsPerSample)); // Number of bits in each sample
      Nan::Set(ret, Nan::New("nSampleRate").ToLocalChecked(), Nan::New(format.nSampleRate)); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
    }
      break;
    case OMX_IndexParamAudioG723:
    {
      OMX_AUDIO_PARAM_G723TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("eBitRate").ToLocalChecked(), Nan::New(format.eBitRate)); // todo: Should this be moved to a config?
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
      Nan::Set(ret, Nan::New("bPostFilter").ToLocalChecked(), Nan::New(format.bPostFilter)); // Enable Post Filter
    }
      break;
    case OMX_IndexParamAudioG729:
    {
      OMX_AUDIO_PARAM_G729TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("eBitType").ToLocalChecked(), Nan::New(format.eBitType));
    }
      break;
    case OMX_IndexParamAudioAmr:
    {
      OMX_AUDIO_PARAM_AMRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels
      Nan::Set(ret, Nan::New("nBitRate").ToLocalChecked(), Nan::New(format.nBitRate)); // Bit rate read only field
      Nan::Set(ret, Nan::New("eAMRBandMode").ToLocalChecked(), Nan::New(format.eAMRBandMode)); // AMR Band Mode enumeration
      Nan::Set(ret, Nan::New("eAMRDTXMode").ToLocalChecked(), Nan::New(format.eAMRDTXMode)); // AMR DTX Mode enumeration
      Nan::Set(ret, Nan::New("eAMRFrameFormat").ToLocalChecked(), Nan::New(format.eAMRFrameFormat)); // AMR frame format enumeration
    }
      break;
    case OMX_IndexParamAudioWma:
    {
      OMX_AUDIO_PARAM_WMATYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels
      Nan::Set(ret, Nan::New("nBitRate").ToLocalChecked(), Nan::New(format.nBitRate)); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      Nan::Set(ret, Nan::New("eFormat").ToLocalChecked(), Nan::New(format.eFormat)); // Version of WMA stream / data
      Nan::Set(ret, Nan::New("eProfile").ToLocalChecked(), Nan::New(format.eProfile)); // Profile of WMA stream / data
      Nan::Set(ret, Nan::New("nSamplingRate").ToLocalChecked(), Nan::New(format.nSamplingRate)); // Sampling rate of the source data
      Nan::Set(ret, Nan::New("nBlockAlign").ToLocalChecked(), Nan::New(format.nBlockAlign)); // is the block alignment, or block size, in bytes of the audio codec
      Nan::Set(ret, Nan::New("nEncodeOptions").ToLocalChecked(), Nan::New(format.nEncodeOptions)); // WMA Type-specific data
      Nan::Set(ret, Nan::New("nSuperBlockAlign").ToLocalChecked(), Nan::New(format.nSuperBlockAlign)); // WMA Type-specific data
    }
      break;
    case OMX_IndexParamAudioSbc:
    {
      OMX_AUDIO_PARAM_SBCTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels
      Nan::Set(ret, Nan::New("nBitRate").ToLocalChecked(), Nan::New(format.nBitRate)); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      Nan::Set(ret, Nan::New("nSampleRate").ToLocalChecked(), Nan::New(format.nSampleRate)); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      Nan::Set(ret, Nan::New("nBlocks").ToLocalChecked(), Nan::New(format.nBlocks)); // Number of blocks
      Nan::Set(ret, Nan::New("nSubbands").ToLocalChecked(), Nan::New(format.nSubbands)); // Number of subbands
      Nan::Set(ret, Nan::New("nBitPool").ToLocalChecked(), Nan::New(format.nBitPool)); // Bitpool value
      Nan::Set(ret, Nan::New("bEnableBitrate").ToLocalChecked(), Nan::New(format.bEnableBitrate)); // Use bitrate value instead of bitpool
      Nan::Set(ret, Nan::New("eChannelMode").ToLocalChecked(), Nan::New(format.eChannelMode)); // Channel mode enumeration
      Nan::Set(ret, Nan::New("eSBCAllocType").ToLocalChecked(), Nan::New(format.eSBCAllocType)); // SBC Allocation method type
    }
      break;
    case OMX_IndexParamAudioMidi:
    {
      OMX_AUDIO_PARAM_MIDITYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nFileSize").ToLocalChecked(), Nan::New(format.nFileSize)); // size of the MIDI file in bytes, where the entire MIDI file passed in, otherwise if 0x0, the MIDI data is merged and streamed (instead of passed as an entire MIDI file)
      Nan::Set(ret, Nan::New("bLoadDefaultSound").ToLocalChecked(), Nan::New(format.bLoadDefaultSound)); // Whether to load default sound bank at initialization
      Nan::Set(ret, Nan::New("eMidiFormat").ToLocalChecked(), Nan::New(format.eMidiFormat)); // Version of the MIDI file
    }
      break;
    case OMX_IndexParamAudioGsm_FR:
    {
      OMX_AUDIO_PARAM_GSMFRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
    }
      break;
    case OMX_IndexParamAudioMidiLoadUserSound:
    {
      OMX_AUDIO_PARAM_MIDILOADUSERSOUNDTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nDLSIndex").ToLocalChecked(), Nan::New(format.nDLSIndex)); // DLS file index to be loaded
      Nan::Set(ret, Nan::New("nDLSSize").ToLocalChecked(), Nan::New(format.nDLSSize)); // Size in bytes
      Nan::Set(ret, Nan::New("pDLSData").ToLocalChecked(), Nan::New(format.pDLSData)); // Pointer to DLS file data
      Nan::Set(ret, Nan::New("eMidiSoundBank").ToLocalChecked(), Nan::New(format.eMidiSoundBank)); // Midi sound bank type enumeration
      Nan::Set(ret, Nan::New("eMidiSoundBankLayout").ToLocalChecked(), Nan::New(format.eMidiSoundBankLayout)); // Midi sound bank layout enumeration
    }
      break;
    case OMX_IndexParamAudioG726:
    {
      OMX_AUDIO_PARAM_G726TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("eG726Mode").ToLocalChecked(), Nan::New(format.eG726Mode));
    }
      break;
    case OMX_IndexParamAudioGsm_EFR:
    {
      OMX_AUDIO_PARAM_GSMEFRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
    }
      break;
    case OMX_IndexParamAudioGsm_HR:
    {
      OMX_AUDIO_PARAM_GSMHRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
    }
      break;
    case OMX_IndexParamAudioPdc_FR:
    {
      OMX_AUDIO_PARAM_PDCFRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
    }
      break;
    case OMX_IndexParamAudioPdc_EFR:
    {
      OMX_AUDIO_PARAM_PDCEFRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
    }
      break;
    case OMX_IndexParamAudioPdc_HR:
    {
      OMX_AUDIO_PARAM_PDCHRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
    }
      break;
    case OMX_IndexParamAudioTdma_FR:
    {
      OMX_AUDIO_PARAM_TDMAFRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
    }
      break;
    case OMX_IndexParamAudioTdma_EFR:
    {
      OMX_AUDIO_PARAM_TDMAEFRTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("bDTX").ToLocalChecked(), Nan::New(format.bDTX)); // Enable Discontinuous Transmisssion
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable High Pass Filter
    }
      break;
    case OMX_IndexParamAudioQcelp8:
    {
      OMX_AUDIO_PARAM_QCELP8TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("nBitRate").ToLocalChecked(), Nan::New(format.nBitRate)); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      Nan::Set(ret, Nan::New("eCDMARate").ToLocalChecked(), Nan::New(format.eCDMARate)); // Frame rate
      Nan::Set(ret, Nan::New("nMinBitRate").ToLocalChecked(), Nan::New(format.nMinBitRate)); // minmal rate for the encoder = 1,2,3,4, default = 1
      Nan::Set(ret, Nan::New("nMaxBitRate").ToLocalChecked(), Nan::New(format.nMaxBitRate)); // maximal rate for the encoder = 1,2,3,4, default = 4
    }
      break;
    case OMX_IndexParamAudioQcelp13:
    {
      OMX_AUDIO_PARAM_QCELP13TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("eCDMARate").ToLocalChecked(), Nan::New(format.eCDMARate)); // Frame rate
      Nan::Set(ret, Nan::New("nMinBitRate").ToLocalChecked(), Nan::New(format.nMinBitRate)); // minmal rate for the encoder = 1,2,3,4, default = 1
      Nan::Set(ret, Nan::New("nMaxBitRate").ToLocalChecked(), Nan::New(format.nMaxBitRate)); // maximal rate for the encoder = 1,2,3,4, default = 4
    }
      break;
    case OMX_IndexParamAudioEvrc:
    {
      OMX_AUDIO_PARAM_EVRCTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("eCDMARate").ToLocalChecked(), Nan::New(format.eCDMARate)); // actual Frame rate
      Nan::Set(ret, Nan::New("bRATE_REDUCon").ToLocalChecked(), Nan::New(format.bRATE_REDUCon)); // RATE_REDUCtion is requested for this frame
      Nan::Set(ret, Nan::New("nMinBitRate").ToLocalChecked(), Nan::New(format.nMinBitRate)); // minmal rate for the encoder = 1,2,3,4, default = 1
      Nan::Set(ret, Nan::New("nMaxBitRate").ToLocalChecked(), Nan::New(format.nMaxBitRate)); // maximal rate for the encoder = 1,2,3,4, default = 4
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable encoder's High Pass Filter
      Nan::Set(ret, Nan::New("bNoiseSuppressor").ToLocalChecked(), Nan::New(format.bNoiseSuppressor)); // Enable encoder's noise suppressor pre-processing
      Nan::Set(ret, Nan::New("bPostFilter").ToLocalChecked(), Nan::New(format.bPostFilter)); // Enable decoder's post Filter
    }
      break;
    case OMX_IndexParamAudioSmv:
    {
      OMX_AUDIO_PARAM_SMVTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      Nan::Set(ret, Nan::New("eCDMARate").ToLocalChecked(), Nan::New(format.eCDMARate)); // Frame rate
      Nan::Set(ret, Nan::New("bRATE_REDUCon").ToLocalChecked(), Nan::New(format.bRATE_REDUCon)); // RATE_REDUCtion is requested for this frame
      Nan::Set(ret, Nan::New("nMinBitRate").ToLocalChecked(), Nan::New(format.nMinBitRate)); // minmal rate for the encoder = 1,2,3,4, default = 1 ??
      Nan::Set(ret, Nan::New("nMaxBitRate").ToLocalChecked(), Nan::New(format.nMaxBitRate)); // maximal rate for the encoder = 1,2,3,4, default = 4 ??
      Nan::Set(ret, Nan::New("bHiPassFilter").ToLocalChecked(), Nan::New(format.bHiPassFilter)); // Enable encoder's High Pass Filter ??
      Nan::Set(ret, Nan::New("bNoiseSuppressor").ToLocalChecked(), Nan::New(format.bNoiseSuppressor)); // Enable encoder's noise suppressor pre-processing
      Nan::Set(ret, Nan::New("bPostFilter").ToLocalChecked(), Nan::New(format.bPostFilter)); // Enable decoder's post Filter ??
    }
      break;
    case OMX_IndexParamAudioVorbis:
    {
      OMX_AUDIO_PARAM_VORBISTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannels").ToLocalChecked(), Nan::New(format.nChannels)); // Number of channels
      Nan::Set(ret, Nan::New("nBitRate").ToLocalChecked(), Nan::New(format.nBitRate)); // Bit rate of the encoded data data. Use 0 for variable rate or unknown bit rates. Encoding is set to the bitrate closest to specified value (in bps)
      Nan::Set(ret, Nan::New("nMinBitRate").ToLocalChecked(), Nan::New(format.nMinBitRate)); // Sets minimum bitrate (in bps).
      Nan::Set(ret, Nan::New("nMaxBitRate").ToLocalChecked(), Nan::New(format.nMaxBitRate)); // Sets maximum bitrate (in bps).
      Nan::Set(ret, Nan::New("nSampleRate").ToLocalChecked(), Nan::New(format.nSampleRate)); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      Nan::Set(ret, Nan::New("nAudioBandWidth").ToLocalChecked(), Nan::New(format.nAudioBandWidth)); // Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
      Nan::Set(ret, Nan::New("nQuality").ToLocalChecked(), Nan::New(format.nQuality)); // Sets encoding quality to n, between -1 (low) and 10 (high). In the default mode of operation, teh quality level is 3. Normal quality range is 0 - 10.
      Nan::Set(ret, Nan::New("bManaged").ToLocalChecked(), Nan::New(format.bManaged)); // Set bitrate management mode. This turns off the normal VBR encoding, but allows hard or soft bitrate constraints to be enforced by the encoder. This mode can be slower, and may also be lower quality. It is primarily useful for streaming.
      Nan::Set(ret, Nan::New("bDownmix").ToLocalChecked(), Nan::New(format.bDownmix)); // Downmix input from stereo to mono (has no effect on non-stereo streams). Useful for lower-bitrate encoding.
    }
      break;
    case OMX_IndexConfigAudioMidiImmediateEvent:
    {
      OMX_AUDIO_CONFIG_MIDIIMMEDIATEEVENTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nMidiEventSize").ToLocalChecked(), Nan::New(format.nMidiEventSize)); // Size of immediate MIDI events or MIP message in bytes
      Nan::Set(ret, Nan::New("nMidiEvents").ToLocalChecked(), Nan::New(format.nMidiEvents)); // MIDI event array to be rendered immediately, or an array for the MIP message buffer, where the size is indicated by nMidiEventSize
    }
      break;
    case OMX_IndexConfigAudioMidiControl:
    {
      OMX_AUDIO_CONFIG_MIDICONTROLTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nMaxPolyphony").ToLocalChecked(), Nan::New(format.nMaxPolyphony)); // Specifies the maximum simultaneous polyphonic voices. A value of zero indicates that the default polyphony of the device is used
      Nan::Set(ret, Nan::New("nNumRepeat").ToLocalChecked(), Nan::New(format.nNumRepeat)); // Number of times to repeat playback
      Nan::Set(ret, Nan::New("nStopTime").ToLocalChecked(), Nan::New(format.nStopTime)); // Time in milliseconds to indicate when playback will stop automatically. Set to zero if not used
      Nan::Set(ret, Nan::New("nChannelMuteMask").ToLocalChecked(), Nan::New(format.nChannelMuteMask)); // 16 bit mask for channel mute status
      Nan::Set(ret, Nan::New("nChannelSoloMask").ToLocalChecked(), Nan::New(format.nChannelSoloMask)); // 16 bit mask for channel solo status
      Nan::Set(ret, Nan::New("nTrack0031MuteMask").ToLocalChecked(), Nan::New(format.nTrack0031MuteMask)); // 32 bit mask for track mute status. Note: This is for tracks 0-31
      Nan::Set(ret, Nan::New("nTrack3263MuteMask").ToLocalChecked(), Nan::New(format.nTrack3263MuteMask)); // 32 bit mask for track mute status. Note: This is for tracks 32-63
      Nan::Set(ret, Nan::New("nTrack0031SoloMask").ToLocalChecked(), Nan::New(format.nTrack0031SoloMask)); // 32 bit mask for track solo status. Note: This is for tracks 0-31
      Nan::Set(ret, Nan::New("nTrack3263SoloMask").ToLocalChecked(), Nan::New(format.nTrack3263SoloMask)); // 32 bit mask for track solo status. Note: This is for tracks 32-63
    }
      break;
    case OMX_IndexConfigAudioMidiSoundBankProgram:
    {
      OMX_AUDIO_CONFIG_MIDISOUNDBANKPROGRAMTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannel").ToLocalChecked(), Nan::New(format.nChannel)); // Valid channel values range from 1 to 16
      Nan::Set(ret, Nan::New("nIDProgram").ToLocalChecked(), Nan::New(format.nIDProgram)); // Valid program ID range is 1 to 128
      Nan::Set(ret, Nan::New("nIDSoundBank").ToLocalChecked(), Nan::New(format.nIDSoundBank)); // Sound bank ID
      Nan::Set(ret, Nan::New("nUserSoundBankIndex").ToLocalChecked(), Nan::New(format.nUserSoundBankIndex)); // User soundbank index, easier to access soundbanks by index if multiple banks are present
    }
      break;
    case OMX_IndexConfigAudioMidiStatus:
    {
      OMX_AUDIO_CONFIG_MIDISTATUSTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nNumTracks").ToLocalChecked(), Nan::New(format.nNumTracks)); // Number of MIDI tracks in the file, read only field. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      Nan::Set(ret, Nan::New("nDuration").ToLocalChecked(), Nan::New(format.nDuration)); // The length of the currently open MIDI resource in milliseconds. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      Nan::Set(ret, Nan::New("nPosition").ToLocalChecked(), Nan::New(format.nPosition)); // Current Position of the MIDI resource being played in milliseconds
      Nan::Set(ret, Nan::New("bVibra").ToLocalChecked(), Nan::New(format.bVibra)); // Does Vibra track exist? NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      Nan::Set(ret, Nan::New("nNumMetaEvents").ToLocalChecked(), Nan::New(format.nNumMetaEvents)); // Total number of MIDI Meta Events in the currently open MIDI resource. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      Nan::Set(ret, Nan::New("nNumActiveVoices").ToLocalChecked(), Nan::New(format.nNumActiveVoices)); // Number of active voices in the currently playing MIDI resource. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      Nan::Set(ret, Nan::New("eMIDIPlayBackState").ToLocalChecked(), Nan::New(format.eMIDIPlayBackState)); // MIDI playback state enumeration, read only field
    }
      break;
    case OMX_IndexConfigAudioMidiMetaEvent:
    {
      OMX_AUDIO_CONFIG_MIDIMETAEVENTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex)); // Index of Meta Event
      Nan::Set(ret, Nan::New("nMetaEventType").ToLocalChecked(), Nan::New(format.nMetaEventType)); // Meta Event Type, 7bits (i.e. 0 - 127)
      Nan::Set(ret, Nan::New("nMetaEventSize").ToLocalChecked(), Nan::New(format.nMetaEventSize)); // size of the Meta Event in bytes
      Nan::Set(ret, Nan::New("nTrack").ToLocalChecked(), Nan::New(format.nTrack)); // track number for the meta event
      Nan::Set(ret, Nan::New("nPosition").ToLocalChecked(), Nan::New(format.nPosition)); // Position of the meta-event in milliseconds
    }
      break;
    case OMX_IndexConfigAudioMidiMetaEventData:
    {
      OMX_AUDIO_CONFIG_MIDIMETAEVENTDATATYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex)); // Index of Meta Event
      Nan::Set(ret, Nan::New("nMetaEventSize").ToLocalChecked(), Nan::New(format.nMetaEventSize)); // size of the Meta Event in bytes
      Nan::Set(ret, Nan::New("nData").ToLocalChecked(), Nan::New(format.nData)); // array of one or more bytes of meta data as indicated by the nMetaEventSize field
    }
      break;
    case OMX_IndexConfigAudioVolume:
    {
      OMX_AUDIO_CONFIG_VOLUMETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bLinear").ToLocalChecked(), Nan::New(format.bLinear)); // Is the volume to be set in linear (0.100) or logarithmic scale (mB)
    }
      break;
    case OMX_IndexConfigAudioBalance:
    {
      OMX_AUDIO_CONFIG_BALANCETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nBalance").ToLocalChecked(), Nan::New(format.nBalance)); // balance setting for this port (-100 to 100, where -100 indicates all left, and no right
    }
      break;
    case OMX_IndexConfigAudioChannelMute:
    {
      OMX_AUDIO_CONFIG_CHANNELMUTETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannel").ToLocalChecked(), Nan::New(format.nChannel)); // channel to select from 0 to N-1, using OMX_ALL to apply mute settings to all channels
      Nan::Set(ret, Nan::New("bMute").ToLocalChecked(), Nan::New(format.bMute)); // Mute setting for this channel
      Nan::Set(ret, Nan::New("bIsMIDI").ToLocalChecked(), Nan::New(format.bIsMIDI)); // TRUE if nChannel refers to a MIDI channel, FALSE otherwise
    }
      break;
    case OMX_IndexConfigAudioMute:
    {
      OMX_AUDIO_CONFIG_MUTETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bMute").ToLocalChecked(), Nan::New(format.bMute)); // Mute setting for this port
    }
      break;
    case OMX_IndexConfigAudioLoudness:
    {
      OMX_AUDIO_CONFIG_LOUDNESSTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bLoudness").ToLocalChecked(), Nan::New(format.bLoudness)); // Enable/disable for loudness
    }
      break;
    case OMX_IndexConfigAudioEchoCancelation:
    {
      OMX_AUDIO_CONFIG_ECHOCANCELATIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eEchoCancelation").ToLocalChecked(), Nan::New(format.eEchoCancelation)); // Echo cancelation settings
    }
      break;
    case OMX_IndexConfigAudioNoiseReduction:
    {
      OMX_AUDIO_CONFIG_NOISEREDUCTIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bNoiseReduction").ToLocalChecked(), Nan::New(format.bNoiseReduction)); // Enable/disable for noise reduction
    }
      break;
    case OMX_IndexConfigAudioBass:
    {
      OMX_AUDIO_CONFIG_BASSTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnable").ToLocalChecked(), Nan::New(format.bEnable)); // Enable/disable for bass control
      Nan::Set(ret, Nan::New("nBass").ToLocalChecked(), Nan::New(format.nBass)); // bass setting for the port, as a continuous value from -100 to 100 (0 means no change in bass level)
    }
      break;
    case OMX_IndexConfigAudioTreble:
    {
      OMX_AUDIO_CONFIG_TREBLETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnable").ToLocalChecked(), Nan::New(format.bEnable)); // Enable/disable for treble control
      Nan::Set(ret, Nan::New("nTreble").ToLocalChecked(), Nan::New(format.nTreble)); // treble setting for the port, as a continuous value from -100 to 100 (0 means no change in treble level)
    }
      break;
    case OMX_IndexConfigAudioStereoWidening:
    {
      OMX_AUDIO_CONFIG_STEREOWIDENINGTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnable").ToLocalChecked(), Nan::New(format.bEnable)); // Enable/disable for stereo widening control
      Nan::Set(ret, Nan::New("eWideningType").ToLocalChecked(), Nan::New(format.eWideningType)); // Stereo widening algorithm type
      Nan::Set(ret, Nan::New("nStereoWidening").ToLocalChecked(), Nan::New(format.nStereoWidening)); // stereo widening setting for the port, as a continuous value from 0 to 100
    }
      break;
    case OMX_IndexConfigAudioChorus:
    {
      OMX_AUDIO_CONFIG_CHORUSTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnable").ToLocalChecked(), Nan::New(format.bEnable)); // Enable/disable for chorus
      Nan::Set(ret, Nan::New("nModulationDepth").ToLocalChecked(), Nan::New(format.nModulationDepth)); // depth of modulation as a percentage of delay (i.e. 0 to 100)
    }
      break;
    case OMX_IndexConfigAudioEqualizer:
    {
      OMX_AUDIO_CONFIG_EQUALIZERTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnable").ToLocalChecked(), Nan::New(format.bEnable)); // Enable/disable for equalizer
    }
      break;
    case OMX_IndexConfigAudioReverberation:
    {
      OMX_AUDIO_CONFIG_REVERBERATIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnable").ToLocalChecked(), Nan::New(format.bEnable)); // Enable/disable for reverberation control
      Nan::Set(ret, Nan::New("nDensity").ToLocalChecked(), Nan::New(format.nDensity)); // Modal density in the late reverberation decay, in percent (i.e. 0 - 100)
      Nan::Set(ret, Nan::New("nDiffusion").ToLocalChecked(), Nan::New(format.nDiffusion)); // Echo density in the late reverberation decay, in percent (i.e. 0 - 100)
    }
      break;
    case OMX_IndexConfigAudioChannelVolume:
    {
      OMX_AUDIO_CONFIG_CHANNELVOLUMETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nChannel").ToLocalChecked(), Nan::New(format.nChannel)); // channel to select from 0 to N-1, using OMX_ALL to apply volume settings to all channels
      Nan::Set(ret, Nan::New("bLinear").ToLocalChecked(), Nan::New(format.bLinear)); // Is the volume to be set in linear (0.100) or logarithmic scale (mB)
      Nan::Set(ret, Nan::New("bIsMIDI").ToLocalChecked(), Nan::New(format.bIsMIDI)); // TRUE if nChannel refers to a MIDI channel, FALSE otherwise
    }
      break;
    case OMX_IndexParamImagePortFormat:
    {
      OMX_IMAGE_PARAM_PORTFORMATTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex));
      Nan::Set(ret, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.eCompressionFormat));
      Nan::Set(ret, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.eColorFormat));
    }
      break;
    case OMX_IndexParamFlashControl:
    {
      OMX_IMAGE_PARAM_FLASHCONTROLTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eFlashControl").ToLocalChecked(), Nan::New(format.eFlashControl));
    }
      break;
    case OMX_IndexConfigFocusControl:
    {
      OMX_IMAGE_CONFIG_FOCUSCONTROLTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eFocusControl").ToLocalChecked(), Nan::New(format.eFocusControl));
      Nan::Set(ret, Nan::New("nFocusSteps").ToLocalChecked(), Nan::New(format.nFocusSteps));
      Nan::Set(ret, Nan::New("nFocusStepIndex").ToLocalChecked(), Nan::New(format.nFocusStepIndex));
    }
      break;
    case OMX_IndexParamQFactor:
    {
      OMX_IMAGE_PARAM_QFACTORTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nQFactor").ToLocalChecked(), Nan::New(format.nQFactor));
    }
      break;
    case OMX_IndexParamQuantizationTable:
    {
      OMX_IMAGE_PARAM_QUANTIZATIONTABLETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eQuantizationTable").ToLocalChecked(), Nan::New(format.eQuantizationTable));
      Nan::Set(ret, Nan::New("nQuantizationMatrix").ToLocalChecked(), Nan::New(format.nQuantizationMatrix));
    }
      break;
    case OMX_IndexParamHuffmanTable:
    {
      OMX_IMAGE_PARAM_HUFFMANTTABLETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eHuffmanTable").ToLocalChecked(), Nan::New(format.eHuffmanTable));
      Nan::Set(ret, Nan::New("nNumberOfHuffmanCodeOfLength").ToLocalChecked(), Nan::New(format.nNumberOfHuffmanCodeOfLength));
      Nan::Set(ret, Nan::New("nHuffmanTable").ToLocalChecked(), Nan::New(format.nHuffmanTable));
    }
      break;
    case OMX_IndexConfigFlashControl:
    {
      OMX_IMAGE_PARAM_FLASHCONTROLTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eFlashControl").ToLocalChecked(), Nan::New(format.eFlashControl));
    }
      break;
    case OMX_IndexParamVideoPortFormat:
    {
      OMX_VIDEO_PARAM_PORTFORMATTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex));
      Nan::Set(ret, Nan::New("eCompressionFormat").ToLocalChecked(), Nan::New(format.eCompressionFormat));
      Nan::Set(ret, Nan::New("eColorFormat").ToLocalChecked(), Nan::New(format.eColorFormat));
      Nan::Set(ret, Nan::New("xFramerate").ToLocalChecked(), Nan::New(format.xFramerate));
    }
      break;
    case OMX_IndexParamVideoQuantization:
    {
      OMX_VIDEO_PARAM_QUANTIZATIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nQpI").ToLocalChecked(), Nan::New(format.nQpI));
      Nan::Set(ret, Nan::New("nQpP").ToLocalChecked(), Nan::New(format.nQpP));
      Nan::Set(ret, Nan::New("nQpB").ToLocalChecked(), Nan::New(format.nQpB));
    }
      break;
    case OMX_IndexParamVideoFastUpdate:
    {
      OMX_VIDEO_PARAM_VIDEOFASTUPDATETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnableVFU").ToLocalChecked(), Nan::New(format.bEnableVFU));
      Nan::Set(ret, Nan::New("nFirstGOB").ToLocalChecked(), Nan::New(format.nFirstGOB));
      Nan::Set(ret, Nan::New("nFirstMB").ToLocalChecked(), Nan::New(format.nFirstMB));
      Nan::Set(ret, Nan::New("nNumMBs").ToLocalChecked(), Nan::New(format.nNumMBs));
    }
      break;
    case OMX_IndexParamVideoBitrate:
    {
      OMX_VIDEO_PARAM_BITRATETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eControlRate").ToLocalChecked(), Nan::New(format.eControlRate));
      Nan::Set(ret, Nan::New("nTargetBitrate").ToLocalChecked(), Nan::New(format.nTargetBitrate));
    }
      break;
    case OMX_IndexParamVideoMotionVector:
    {
      OMX_VIDEO_PARAM_MOTIONVECTORTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eAccuracy").ToLocalChecked(), Nan::New(format.eAccuracy));
      Nan::Set(ret, Nan::New("bUnrestrictedMVs").ToLocalChecked(), Nan::New(format.bUnrestrictedMVs));
      Nan::Set(ret, Nan::New("bFourMV").ToLocalChecked(), Nan::New(format.bFourMV));
      Nan::Set(ret, Nan::New("sXSearchRange").ToLocalChecked(), Nan::New(format.sXSearchRange));
      Nan::Set(ret, Nan::New("sYSearchRange").ToLocalChecked(), Nan::New(format.sYSearchRange));
    }
      break;
    case OMX_IndexParamVideoIntraRefresh:
    {
      OMX_VIDEO_PARAM_INTRAREFRESHTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eRefreshMode").ToLocalChecked(), Nan::New(format.eRefreshMode));
      Nan::Set(ret, Nan::New("nAirMBs").ToLocalChecked(), Nan::New(format.nAirMBs));
      Nan::Set(ret, Nan::New("nAirRef").ToLocalChecked(), Nan::New(format.nAirRef));
      Nan::Set(ret, Nan::New("nCirMBs").ToLocalChecked(), Nan::New(format.nCirMBs));
    }
      break;
    case OMX_IndexParamVideoErrorCorrection:
    {
      OMX_VIDEO_PARAM_ERRORCORRECTIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnableHEC").ToLocalChecked(), Nan::New(format.bEnableHEC));
      Nan::Set(ret, Nan::New("bEnableResync").ToLocalChecked(), Nan::New(format.bEnableResync));
      Nan::Set(ret, Nan::New("nResynchMarkerSpacing").ToLocalChecked(), Nan::New(format.nResynchMarkerSpacing));
      Nan::Set(ret, Nan::New("bEnableDataPartitioning").ToLocalChecked(), Nan::New(format.bEnableDataPartitioning));
      Nan::Set(ret, Nan::New("bEnableRVLC").ToLocalChecked(), Nan::New(format.bEnableRVLC));
    }
      break;
    case OMX_IndexParamVideoVBSMC:
    {
      OMX_VIDEO_PARAM_VBSMCTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("b16x16").ToLocalChecked(), Nan::New(format.b16x16));
      Nan::Set(ret, Nan::New("b16x8").ToLocalChecked(), Nan::New(format.b16x8));
      Nan::Set(ret, Nan::New("b8x16").ToLocalChecked(), Nan::New(format.b8x16));
      Nan::Set(ret, Nan::New("b8x8").ToLocalChecked(), Nan::New(format.b8x8));
      Nan::Set(ret, Nan::New("b8x4").ToLocalChecked(), Nan::New(format.b8x4));
      Nan::Set(ret, Nan::New("b4x8").ToLocalChecked(), Nan::New(format.b4x8));
      Nan::Set(ret, Nan::New("b4x4").ToLocalChecked(), Nan::New(format.b4x4));
    }
      break;
    case OMX_IndexParamVideoMpeg2:
    {
      OMX_VIDEO_PARAM_MPEG2TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nPFrames").ToLocalChecked(), Nan::New(format.nPFrames));
      Nan::Set(ret, Nan::New("nBFrames").ToLocalChecked(), Nan::New(format.nBFrames));
      Nan::Set(ret, Nan::New("eProfile").ToLocalChecked(), Nan::New(format.eProfile));
      Nan::Set(ret, Nan::New("eLevel").ToLocalChecked(), Nan::New(format.eLevel));
    }
      break;
    case OMX_IndexParamVideoMpeg4:
    {
      OMX_VIDEO_PARAM_MPEG4TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nSliceHeaderSpacing").ToLocalChecked(), Nan::New(format.nSliceHeaderSpacing));
      Nan::Set(ret, Nan::New("bSVH").ToLocalChecked(), Nan::New(format.bSVH));
      Nan::Set(ret, Nan::New("bGov").ToLocalChecked(), Nan::New(format.bGov));
      Nan::Set(ret, Nan::New("nPFrames").ToLocalChecked(), Nan::New(format.nPFrames));
      Nan::Set(ret, Nan::New("nBFrames").ToLocalChecked(), Nan::New(format.nBFrames));
      Nan::Set(ret, Nan::New("nIDCVLCThreshold").ToLocalChecked(), Nan::New(format.nIDCVLCThreshold));
      Nan::Set(ret, Nan::New("bACPred").ToLocalChecked(), Nan::New(format.bACPred));
      Nan::Set(ret, Nan::New("nMaxPacketSize").ToLocalChecked(), Nan::New(format.nMaxPacketSize));
      Nan::Set(ret, Nan::New("nTimeIncRes").ToLocalChecked(), Nan::New(format.nTimeIncRes));
      Nan::Set(ret, Nan::New("eProfile").ToLocalChecked(), Nan::New(format.eProfile));
      Nan::Set(ret, Nan::New("eLevel").ToLocalChecked(), Nan::New(format.eLevel));
      Nan::Set(ret, Nan::New("nAllowedPictureTypes").ToLocalChecked(), Nan::New(format.nAllowedPictureTypes));
      Nan::Set(ret, Nan::New("nHeaderExtension").ToLocalChecked(), Nan::New(format.nHeaderExtension));
      Nan::Set(ret, Nan::New("bReversibleVLC").ToLocalChecked(), Nan::New(format.bReversibleVLC));
    }
      break;
    case OMX_IndexParamVideoWmv:
    {
      OMX_VIDEO_PARAM_WMVTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eFormat").ToLocalChecked(), Nan::New(format.eFormat));
    }
      break;
    case OMX_IndexParamVideoRv:
    {
      OMX_VIDEO_PARAM_RVTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eFormat").ToLocalChecked(), Nan::New(format.eFormat));
      Nan::Set(ret, Nan::New("nBitsPerPixel").ToLocalChecked(), Nan::New(format.nBitsPerPixel));
      Nan::Set(ret, Nan::New("nPaddedWidth").ToLocalChecked(), Nan::New(format.nPaddedWidth));
      Nan::Set(ret, Nan::New("nPaddedHeight").ToLocalChecked(), Nan::New(format.nPaddedHeight));
      Nan::Set(ret, Nan::New("nFrameRate").ToLocalChecked(), Nan::New(format.nFrameRate));
      Nan::Set(ret, Nan::New("nBitstreamFlags").ToLocalChecked(), Nan::New(format.nBitstreamFlags));
      Nan::Set(ret, Nan::New("nBitstreamVersion").ToLocalChecked(), Nan::New(format.nBitstreamVersion));
      Nan::Set(ret, Nan::New("nMaxEncodeFrameSize").ToLocalChecked(), Nan::New(format.nMaxEncodeFrameSize));
      Nan::Set(ret, Nan::New("bEnablePostFilter").ToLocalChecked(), Nan::New(format.bEnablePostFilter));
      Nan::Set(ret, Nan::New("bEnableTemporalInterpolation").ToLocalChecked(), Nan::New(format.bEnableTemporalInterpolation));
      Nan::Set(ret, Nan::New("bEnableLatencyMode").ToLocalChecked(), Nan::New(format.bEnableLatencyMode));
    }
      break;
    case OMX_IndexParamVideoAvc:
    {
      OMX_VIDEO_PARAM_AVCTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nSliceHeaderSpacing").ToLocalChecked(), Nan::New(format.nSliceHeaderSpacing));
      Nan::Set(ret, Nan::New("nPFrames").ToLocalChecked(), Nan::New(format.nPFrames));
      Nan::Set(ret, Nan::New("nBFrames").ToLocalChecked(), Nan::New(format.nBFrames));
      Nan::Set(ret, Nan::New("bUseHadamard").ToLocalChecked(), Nan::New(format.bUseHadamard));
      Nan::Set(ret, Nan::New("nRefFrames").ToLocalChecked(), Nan::New(format.nRefFrames));
      Nan::Set(ret, Nan::New("nRefIdx10ActiveMinus1").ToLocalChecked(), Nan::New(format.nRefIdx10ActiveMinus1));
      Nan::Set(ret, Nan::New("nRefIdx11ActiveMinus1").ToLocalChecked(), Nan::New(format.nRefIdx11ActiveMinus1));
      Nan::Set(ret, Nan::New("bEnableUEP").ToLocalChecked(), Nan::New(format.bEnableUEP));
      Nan::Set(ret, Nan::New("bEnableFMO").ToLocalChecked(), Nan::New(format.bEnableFMO));
      Nan::Set(ret, Nan::New("bEnableASO").ToLocalChecked(), Nan::New(format.bEnableASO));
      Nan::Set(ret, Nan::New("bEnableRS").ToLocalChecked(), Nan::New(format.bEnableRS));
      Nan::Set(ret, Nan::New("eProfile").ToLocalChecked(), Nan::New(format.eProfile));
      Nan::Set(ret, Nan::New("eLevel").ToLocalChecked(), Nan::New(format.eLevel));
      Nan::Set(ret, Nan::New("nAllowedPictureTypes").ToLocalChecked(), Nan::New(format.nAllowedPictureTypes));
      Nan::Set(ret, Nan::New("bFrameMBsOnly").ToLocalChecked(), Nan::New(format.bFrameMBsOnly));
      Nan::Set(ret, Nan::New("bMBAFF").ToLocalChecked(), Nan::New(format.bMBAFF));
      Nan::Set(ret, Nan::New("bEntropyCodingCABAC").ToLocalChecked(), Nan::New(format.bEntropyCodingCABAC));
      Nan::Set(ret, Nan::New("bWeightedPPrediction").ToLocalChecked(), Nan::New(format.bWeightedPPrediction));
      Nan::Set(ret, Nan::New("nWeightedBipredicitonMode").ToLocalChecked(), Nan::New(format.nWeightedBipredicitonMode));
      Nan::Set(ret, Nan::New("bconstIpred").ToLocalChecked(), Nan::New(format.bconstIpred));
      Nan::Set(ret, Nan::New("bDirect8x8Inference").ToLocalChecked(), Nan::New(format.bDirect8x8Inference));
      Nan::Set(ret, Nan::New("bDirectSpatialTemporal").ToLocalChecked(), Nan::New(format.bDirectSpatialTemporal));
      Nan::Set(ret, Nan::New("nCabacInitIdc").ToLocalChecked(), Nan::New(format.nCabacInitIdc));
      Nan::Set(ret, Nan::New("eLoopFilterMode").ToLocalChecked(), Nan::New(format.eLoopFilterMode));
    }
      break;
    case OMX_IndexParamVideoH263:
    {
      OMX_VIDEO_PARAM_H263TYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nPFrames").ToLocalChecked(), Nan::New(format.nPFrames));
      Nan::Set(ret, Nan::New("nBFrames").ToLocalChecked(), Nan::New(format.nBFrames));
      Nan::Set(ret, Nan::New("eProfile").ToLocalChecked(), Nan::New(format.eProfile));
      Nan::Set(ret, Nan::New("eLevel").ToLocalChecked(), Nan::New(format.eLevel));
      Nan::Set(ret, Nan::New("bPLUSPTYPEAllowed").ToLocalChecked(), Nan::New(format.bPLUSPTYPEAllowed));
      Nan::Set(ret, Nan::New("nAllowedPictureTypes").ToLocalChecked(), Nan::New(format.nAllowedPictureTypes));
      Nan::Set(ret, Nan::New("bForceRoundingTypeToZero").ToLocalChecked(), Nan::New(format.bForceRoundingTypeToZero));
      Nan::Set(ret, Nan::New("nPictureHeaderRepetition").ToLocalChecked(), Nan::New(format.nPictureHeaderRepetition));
      Nan::Set(ret, Nan::New("nGOBHeaderInterval").ToLocalChecked(), Nan::New(format.nGOBHeaderInterval));
    }
      break;
    case OMX_IndexParamVideoProfileLevelQuerySupported:
    {
      OMX_VIDEO_PARAM_PROFILELEVELTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eProfile").ToLocalChecked(), Nan::New(format.eProfile)); // type is OMX_VIDEO_AVCPROFILETYPE, OMX_VIDEO_H263PROFILETYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
      Nan::Set(ret, Nan::New("eLevel").ToLocalChecked(), Nan::New(format.eLevel)); // type is OMX_VIDEO_AVCLEVELTYPE, OMX_VIDEO_H263LEVELTYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
      Nan::Set(ret, Nan::New("nProfileIndex").ToLocalChecked(), Nan::New(format.nProfileIndex)); // Used to query for individual profile support information, This parameter is valid only for OMX_IndexParamVideoProfileLevelQuerySupported index, For all other indices this parameter is to be ignored.
    }
      break;
    case OMX_IndexParamVideoProfileLevelCurrent:
    {
      OMX_VIDEO_PARAM_PROFILELEVELTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eProfile").ToLocalChecked(), Nan::New(format.eProfile)); // type is OMX_VIDEO_AVCPROFILETYPE, OMX_VIDEO_H263PROFILETYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
      Nan::Set(ret, Nan::New("eLevel").ToLocalChecked(), Nan::New(format.eLevel)); // type is OMX_VIDEO_AVCLEVELTYPE, OMX_VIDEO_H263LEVELTYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
      Nan::Set(ret, Nan::New("nProfileIndex").ToLocalChecked(), Nan::New(format.nProfileIndex)); // Used to query for individual profile support information, This parameter is valid only for OMX_IndexParamVideoProfileLevelQuerySupported index, For all other indices this parameter is to be ignored.
    }
      break;
    case OMX_IndexConfigVideoBitrate:
    {
      OMX_VIDEO_CONFIG_BITRATETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nEncodeBitrate").ToLocalChecked(), Nan::New(format.nEncodeBitrate));
    }
      break;
    case OMX_IndexConfigVideoFramerate:
    {
      OMX_CONFIG_FRAMERATETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("xEncodeFramerate").ToLocalChecked(), Nan::New(format.xEncodeFramerate)); // Q16 format
    }
      break;
    case OMX_IndexConfigVideoIntraVOPRefresh:
    {
      OMX_CONFIG_INTRAREFRESHVOPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("IntraRefreshVOP").ToLocalChecked(), Nan::New(format.IntraRefreshVOP));
    }
      break;
    case OMX_IndexConfigVideoIntraMBRefresh:
    {
      OMX_CONFIG_MACROBLOCKERRORMAPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nErrMapSize").ToLocalChecked(), Nan::New(format.nErrMapSize)); // Size of the Error Map in bytes
      Nan::Set(ret, Nan::New("ErrMap").ToLocalChecked(), Nan::New(format.ErrMap)); // Error map hint
    }
      break;
    case OMX_IndexConfigVideoMBErrorReporting:
    {
      OMX_CONFIG_MBERRORREPORTINGTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnabled").ToLocalChecked(), Nan::New(format.bEnabled));
    }
      break;
    case OMX_IndexParamVideoMacroblocksPerFrame:
    {
      OMX_PARAM_MACROBLOCKSTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nMacroblocks").ToLocalChecked(), Nan::New(format.nMacroblocks));
    }
      break;
    case OMX_IndexConfigVideoMacroBlockErrorMap:
    {
      OMX_CONFIG_MACROBLOCKERRORMAPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nErrMapSize").ToLocalChecked(), Nan::New(format.nErrMapSize)); // Size of the Error Map in bytes
      Nan::Set(ret, Nan::New("ErrMap").ToLocalChecked(), Nan::New(format.ErrMap)); // Error map hint
    }
      break;
    case OMX_IndexParamVideoSliceFMO:
    {
      OMX_VIDEO_PARAM_AVCSLICEFMO format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nNumSliceGroups").ToLocalChecked(), Nan::New(format.nNumSliceGroups));
      Nan::Set(ret, Nan::New("nSliceGroupMapType").ToLocalChecked(), Nan::New(format.nSliceGroupMapType));
      Nan::Set(ret, Nan::New("eSliceMode").ToLocalChecked(), Nan::New(format.eSliceMode));
    }
      break;
    case OMX_IndexConfigVideoAVCIntraPeriod:
    {
      OMX_VIDEO_CONFIG_AVCINTRAPERIOD format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nIDRPeriod").ToLocalChecked(), Nan::New(format.nIDRPeriod));
      Nan::Set(ret, Nan::New("nPFrames").ToLocalChecked(), Nan::New(format.nPFrames));
    }
      break;
    case OMX_IndexConfigVideoNalSize:
    {
      OMX_VIDEO_CONFIG_NALSIZE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nNaluBytes").ToLocalChecked(), Nan::New(format.nNaluBytes));
    }
      break;
    case OMX_IndexParamCommonDeblocking:
    {
      OMX_PARAM_DEBLOCKINGTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bDeblocking").ToLocalChecked(), Nan::New(format.bDeblocking));
    }
      break;
    case OMX_IndexParamCommonSensorMode:
    {
      OMX_PARAM_SENSORMODETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nFrameRate").ToLocalChecked(), Nan::New(format.nFrameRate));
      Nan::Set(ret, Nan::New("bOneShot").ToLocalChecked(), Nan::New(format.bOneShot));
    }
      break;
    case OMX_IndexParamCommonInterleave:
    {
      OMX_PARAM_INTERLEAVETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnable").ToLocalChecked(), Nan::New(format.bEnable));
      Nan::Set(ret, Nan::New("nInterleavePortIndex").ToLocalChecked(), Nan::New(format.nInterleavePortIndex));
    }
      break;
    case OMX_IndexConfigCommonColorFormatConversion:
    {
      OMX_CONFIG_COLORCONVERSIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("xColorMatrix").ToLocalChecked(), Nan::New(format.xColorMatrix)); // Stored in signed Q16 format
      Nan::Set(ret, Nan::New("xColorOffset").ToLocalChecked(), Nan::New(format.xColorOffset)); // Stored in signed Q16 format
    }
      break;
    case OMX_IndexConfigCommonScale:
    {
      OMX_CONFIG_SCALEFACTORTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("xWidth").ToLocalChecked(), Nan::New(format.xWidth)); // Fixed point value stored as Q16
      Nan::Set(ret, Nan::New("xHeight").ToLocalChecked(), Nan::New(format.xHeight)); // Fixed point value stored as Q16
    }
      break;
    case OMX_IndexConfigCommonImageFilter:
    {
      OMX_CONFIG_IMAGEFILTERTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eImageFilter").ToLocalChecked(), Nan::New(format.eImageFilter));
    }
      break;
    case OMX_IndexConfigCommonColorEnhancement:
    {
      OMX_CONFIG_COLORENHANCEMENTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bColorEnhancement").ToLocalChecked(), Nan::New(format.bColorEnhancement));
      Nan::Set(ret, Nan::New("nCustomizedU").ToLocalChecked(), Nan::New(format.nCustomizedU));
      Nan::Set(ret, Nan::New("nCustomizedV").ToLocalChecked(), Nan::New(format.nCustomizedV));
    }
      break;
    case OMX_IndexConfigCommonColorKey:
    {
      OMX_CONFIG_COLORKEYTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nARGBColor").ToLocalChecked(), Nan::New(format.nARGBColor));
      Nan::Set(ret, Nan::New("nARGBMask").ToLocalChecked(), Nan::New(format.nARGBMask));
    }
      break;
    case OMX_IndexConfigCommonColorBlend:
    {
      OMX_CONFIG_COLORBLENDTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nRGBAlphaConstant").ToLocalChecked(), Nan::New(format.nRGBAlphaConstant));
      Nan::Set(ret, Nan::New("eColorBlend").ToLocalChecked(), Nan::New(format.eColorBlend));
    }
      break;
    case OMX_IndexConfigCommonFrameStabilisation:
    {
      OMX_CONFIG_FRAMESTABTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bStab").ToLocalChecked(), Nan::New(format.bStab));
    }
      break;
    case OMX_IndexConfigCommonRotate:
    {
      OMX_CONFIG_ROTATIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nRotation").ToLocalChecked(), Nan::New(format.nRotation));
    }
      break;
    case OMX_IndexConfigCommonMirror:
    {
      OMX_CONFIG_MIRRORTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eMirror").ToLocalChecked(), Nan::New(format.eMirror));
    }
      break;
    case OMX_IndexConfigCommonOutputPosition:
    {
      OMX_CONFIG_POINTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nX").ToLocalChecked(), Nan::New(format.nX));
      Nan::Set(ret, Nan::New("nY").ToLocalChecked(), Nan::New(format.nY));
    }
      break;
    case OMX_IndexConfigCommonInputCrop:
    {
      OMX_CONFIG_RECTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nLeft").ToLocalChecked(), Nan::New(format.nLeft));
      Nan::Set(ret, Nan::New("nTop").ToLocalChecked(), Nan::New(format.nTop));
      Nan::Set(ret, Nan::New("nWidth").ToLocalChecked(), Nan::New(format.nWidth));
      Nan::Set(ret, Nan::New("nHeight").ToLocalChecked(), Nan::New(format.nHeight));
    }
      break;
    case OMX_IndexConfigCommonOutputCrop:
    {
      OMX_CONFIG_RECTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nLeft").ToLocalChecked(), Nan::New(format.nLeft));
      Nan::Set(ret, Nan::New("nTop").ToLocalChecked(), Nan::New(format.nTop));
      Nan::Set(ret, Nan::New("nWidth").ToLocalChecked(), Nan::New(format.nWidth));
      Nan::Set(ret, Nan::New("nHeight").ToLocalChecked(), Nan::New(format.nHeight));
    }
      break;
    case OMX_IndexConfigCommonDigitalZoom:
    {
      OMX_CONFIG_SCALEFACTORTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("xWidth").ToLocalChecked(), Nan::New(format.xWidth)); // Fixed point value stored as Q16
      Nan::Set(ret, Nan::New("xHeight").ToLocalChecked(), Nan::New(format.xHeight)); // Fixed point value stored as Q16
    }
      break;
    case OMX_IndexConfigCommonOpticalZoom:
    {
      OMX_CONFIG_SCALEFACTORTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("xWidth").ToLocalChecked(), Nan::New(format.xWidth)); // Fixed point value stored as Q16
      Nan::Set(ret, Nan::New("xHeight").ToLocalChecked(), Nan::New(format.xHeight)); // Fixed point value stored as Q16
    }
      break;
    case OMX_IndexConfigCommonWhiteBalance:
    {
      OMX_CONFIG_WHITEBALCONTROLTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eWhiteBalControl").ToLocalChecked(), Nan::New(format.eWhiteBalControl));
    }
      break;
    case OMX_IndexConfigCommonExposure:
    {
      OMX_CONFIG_EXPOSURECONTROLTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eExposureControl").ToLocalChecked(), Nan::New(format.eExposureControl));
    }
      break;
    case OMX_IndexConfigCommonContrast:
    {
      OMX_CONFIG_CONTRASTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nContrast").ToLocalChecked(), Nan::New(format.nContrast));
    }
      break;
    case OMX_IndexConfigCommonBrightness:
    {
      OMX_CONFIG_BRIGHTNESSTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nBrightness").ToLocalChecked(), Nan::New(format.nBrightness));
    }
      break;
    case OMX_IndexConfigCommonBacklight:
    {
      OMX_CONFIG_BACKLIGHTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nBacklight").ToLocalChecked(), Nan::New(format.nBacklight));
      Nan::Set(ret, Nan::New("nTimeout").ToLocalChecked(), Nan::New(format.nTimeout));
    }
      break;
    case OMX_IndexConfigCommonGamma:
    {
      OMX_CONFIG_GAMMATYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nGamma").ToLocalChecked(), Nan::New(format.nGamma));
    }
      break;
    case OMX_IndexConfigCommonSaturation:
    {
      OMX_CONFIG_SATURATIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nSaturation").ToLocalChecked(), Nan::New(format.nSaturation));
    }
      break;
    case OMX_IndexConfigCommonLightness:
    {
      OMX_CONFIG_LIGHTNESSTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nLightness").ToLocalChecked(), Nan::New(format.nLightness));
    }
      break;
    case OMX_IndexConfigCommonExclusionRect:
    {
      OMX_CONFIG_RECTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nLeft").ToLocalChecked(), Nan::New(format.nLeft));
      Nan::Set(ret, Nan::New("nTop").ToLocalChecked(), Nan::New(format.nTop));
      Nan::Set(ret, Nan::New("nWidth").ToLocalChecked(), Nan::New(format.nWidth));
      Nan::Set(ret, Nan::New("nHeight").ToLocalChecked(), Nan::New(format.nHeight));
    }
      break;
    case OMX_IndexConfigCommonDithering:
    {
      OMX_CONFIG_DITHERTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eDither").ToLocalChecked(), Nan::New(format.eDither)); // Type of dithering to use
    }
      break;
    case OMX_IndexConfigCommonPlaneBlend:
    {
      OMX_CONFIG_PLANEBLENDTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nDepth").ToLocalChecked(), Nan::New(format.nDepth));
      Nan::Set(ret, Nan::New("nAlpha").ToLocalChecked(), Nan::New(format.nAlpha));
    }
      break;
    case OMX_IndexConfigCommonExposureValue:
    {
      OMX_CONFIG_EXPOSUREVALUETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eMetering").ToLocalChecked(), Nan::New(format.eMetering));
      Nan::Set(ret, Nan::New("xEVCompensation").ToLocalChecked(), Nan::New(format.xEVCompensation)); // Fixed point value stored as Q16
      Nan::Set(ret, Nan::New("nApertureFNumber").ToLocalChecked(), Nan::New(format.nApertureFNumber)); // e.g. nApertureFNumber = 2 implies "f/2" - Q16 format
      Nan::Set(ret, Nan::New("bAutoAperture").ToLocalChecked(), Nan::New(format.bAutoAperture)); // Whether aperture number is defined automatically
      Nan::Set(ret, Nan::New("nShutterSpeedMsec").ToLocalChecked(), Nan::New(format.nShutterSpeedMsec)); // Shutterspeed in milliseconds
      Nan::Set(ret, Nan::New("bAutoShutterSpeed").ToLocalChecked(), Nan::New(format.bAutoShutterSpeed)); // Whether shutter speed is defined automatically
      Nan::Set(ret, Nan::New("nSensitivity").ToLocalChecked(), Nan::New(format.nSensitivity)); // e.g. nSensitivity = 100 implies "ISO 100"
      Nan::Set(ret, Nan::New("bAutoSensitivity").ToLocalChecked(), Nan::New(format.bAutoSensitivity)); // Whether sensitivity is defined automatically
    }
      break;
    case OMX_IndexConfigCommonOutputSize:
    {
      OMX_FRAMESIZETYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nWidth").ToLocalChecked(), Nan::New(format.nWidth));
      Nan::Set(ret, Nan::New("nHeight").ToLocalChecked(), Nan::New(format.nHeight));
    }
      break;
    case OMX_IndexParamCommonExtraQuantData:
    {
      OMX_OTHER_EXTRADATATYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eType").ToLocalChecked(), Nan::New(format.eType)); // Extra Data type
      Nan::Set(ret, Nan::New("nDataSize").ToLocalChecked(), Nan::New(format.nDataSize)); // Size of the supporting data to follow
      Nan::Set(ret, Nan::New("data").ToLocalChecked(), Nan::New(format.data)); // Supporting data hint
    }
      break;
    case OMX_IndexConfigCommonFocusRegion:
    {
      OMX_CONFIG_FOCUSREGIONTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bCenter").ToLocalChecked(), Nan::New(format.bCenter));
      Nan::Set(ret, Nan::New("bLeft").ToLocalChecked(), Nan::New(format.bLeft));
      Nan::Set(ret, Nan::New("bRight").ToLocalChecked(), Nan::New(format.bRight));
      Nan::Set(ret, Nan::New("bTop").ToLocalChecked(), Nan::New(format.bTop));
      Nan::Set(ret, Nan::New("bBottom").ToLocalChecked(), Nan::New(format.bBottom));
      Nan::Set(ret, Nan::New("bTopLeft").ToLocalChecked(), Nan::New(format.bTopLeft));
      Nan::Set(ret, Nan::New("bTopRight").ToLocalChecked(), Nan::New(format.bTopRight));
      Nan::Set(ret, Nan::New("bBottomLeft").ToLocalChecked(), Nan::New(format.bBottomLeft));
      Nan::Set(ret, Nan::New("bBottomRight").ToLocalChecked(), Nan::New(format.bBottomRight));
    }
      break;
    case OMX_IndexConfigCommonFocusStatus:
    {
      OMX_PARAM_FOCUSSTATUSTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eFocusStatus").ToLocalChecked(), Nan::New(format.eFocusStatus));
      Nan::Set(ret, Nan::New("bCenterStatus").ToLocalChecked(), Nan::New(format.bCenterStatus));
      Nan::Set(ret, Nan::New("bLeftStatus").ToLocalChecked(), Nan::New(format.bLeftStatus));
      Nan::Set(ret, Nan::New("bRightStatus").ToLocalChecked(), Nan::New(format.bRightStatus));
      Nan::Set(ret, Nan::New("bTopStatus").ToLocalChecked(), Nan::New(format.bTopStatus));
      Nan::Set(ret, Nan::New("bBottomStatus").ToLocalChecked(), Nan::New(format.bBottomStatus));
      Nan::Set(ret, Nan::New("bTopLeftStatus").ToLocalChecked(), Nan::New(format.bTopLeftStatus));
      Nan::Set(ret, Nan::New("bTopRightStatus").ToLocalChecked(), Nan::New(format.bTopRightStatus));
      Nan::Set(ret, Nan::New("bBottomLeftStatus").ToLocalChecked(), Nan::New(format.bBottomLeftStatus));
      Nan::Set(ret, Nan::New("bBottomRightStatus").ToLocalChecked(), Nan::New(format.bBottomRightStatus));
    }
      break;
    case OMX_IndexConfigCommonTransitionEffect:
    {
      OMX_CONFIG_TRANSITIONEFFECTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eEffect").ToLocalChecked(), Nan::New(format.eEffect));
    }
      break;
    case OMX_IndexParamOtherPortFormat:
    {
      OMX_OTHER_PARAM_PORTFORMATTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("nIndex").ToLocalChecked(), Nan::New(format.nIndex)); // Indicates the enumeration index for the format from 0x0 to N-1
      Nan::Set(ret, Nan::New("eFormat").ToLocalChecked(), Nan::New(format.eFormat)); // Type of data expected for this channel
    }
      break;
    case OMX_IndexConfigOtherPower:
    {
      OMX_OTHER_CONFIG_POWERTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("bEnablePM").ToLocalChecked(), Nan::New(format.bEnablePM)); // Flag to enable Power Management
    }
      break;
    case OMX_IndexConfigOtherStats:
    {
      OMX_OTHER_CONFIG_STATSTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeScale:
    {
      OMX_TIME_CONFIG_SCALETYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("xScale").ToLocalChecked(), Nan::New(format.xScale)); // This is a value in Q16 format which is used for scaling the media time
    }
      break;
    case OMX_IndexConfigTimeClockState:
    {
      OMX_TIME_CONFIG_CLOCKSTATETYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eState").ToLocalChecked(), Nan::New(format.eState)); // State of the media time.
      Nan::Set(ret, Nan::New("nWaitMask").ToLocalChecked(), Nan::New(format.nWaitMask)); // Mask of OMX_CLOCKPORT values.
    }
      break;
    case OMX_IndexConfigTimeActiveRefClock:
    {
      OMX_TIME_CONFIG_ACTIVEREFCLOCKTYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eClock").ToLocalChecked(), Nan::New(format.eClock)); // Reference clock used to compute media time
    }
      break;
    case OMX_IndexConfigTimeCurrentMediaTime:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeCurrentWallTime:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeCurrentAudioReference:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeCurrentVideoReference:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeMediaTimeRequest:
    {
      OMX_TIME_CONFIG_MEDIATIMEREQUESTTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
      Nan::Set(ret, Nan::New("pClientPrivate").ToLocalChecked(), Nan::New(format.pClientPrivate)); // Client private data to disabiguate this media time from others (e.g. the number of the frame to deliver). Duplicated in the media time structure that fulfills this request. A value of zero is reserved for time scale updates.
    }
      break;
    case OMX_IndexConfigTimeClientStartTime:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimePosition:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      GetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeSeekMode:
    {
      OMX_TIME_CONFIG_SEEKMODETYPE format;
      GetParameterTemplate(&format, handle, nParamIndex);
      Nan::Set(ret, Nan::New("eType").ToLocalChecked(), Nan::New(format.eType)); // The seek mode
    }
      break;
    default:
    break;
  }
  return scope.Escape(ret);
}
void Parameters::SetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex, v8::Local<v8::Object> param) {

  switch (nParamIndex) {
    case OMX_IndexParamPriorityMgmt:
    {
      OMX_PRIORITYMGMTTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.nGroupPriority = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nGroupPriority").ToLocalChecked()).ToLocalChecked()).FromJust(); // Priority of the component group
      format.nGroupID = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nGroupID").ToLocalChecked()).ToLocalChecked()).FromJust(); // ID of the component group

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioInit:
    {
      OMX_PORT_PARAM_TYPE format;
      OMX_consts::InitOMXParams(&format);
      format.nPorts = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPorts").ToLocalChecked()).ToLocalChecked()).FromJust(); // The number of ports for this component
      format.nStartPortNumber = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nStartPortNumber").ToLocalChecked()).ToLocalChecked()).FromJust(); // first port number for this type of port

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamImageInit:
    {
      OMX_PORT_PARAM_TYPE format;
      OMX_consts::InitOMXParams(&format);
      format.nPorts = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPorts").ToLocalChecked()).ToLocalChecked()).FromJust(); // The number of ports for this component
      format.nStartPortNumber = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nStartPortNumber").ToLocalChecked()).ToLocalChecked()).FromJust(); // first port number for this type of port

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoInit:
    {
      OMX_PORT_PARAM_TYPE format;
      OMX_consts::InitOMXParams(&format);
      format.nPorts = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPorts").ToLocalChecked()).ToLocalChecked()).FromJust(); // The number of ports for this component
      format.nStartPortNumber = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nStartPortNumber").ToLocalChecked()).ToLocalChecked()).FromJust(); // first port number for this type of port

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamOtherInit:
    {
      OMX_PORT_PARAM_TYPE format;
      OMX_consts::InitOMXParams(&format);
      format.nPorts = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPorts").ToLocalChecked()).ToLocalChecked()).FromJust(); // The number of ports for this component
      format.nStartPortNumber = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nStartPortNumber").ToLocalChecked()).ToLocalChecked()).FromJust(); // first port number for this type of port

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamNumAvailableStreams:
    {
      OMX_PARAM_U32TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nU32 = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nU32").ToLocalChecked()).ToLocalChecked()).FromJust(); // U32 value

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamActiveStream:
    {
      OMX_PARAM_U32TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nU32 = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nU32").ToLocalChecked()).ToLocalChecked()).FromJust(); // U32 value

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamSuspensionPolicy:
    {
      OMX_PARAM_SUSPENSIONPOLICYTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.ePolicy = (OMX_SUSPENSIONPOLICYTYPE) Nan::To<int>(Nan::Get(param, Nan::New("ePolicy").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamComponentSuspended:
    {
      OMX_PARAM_SUSPENSIONTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.eType = (OMX_SUSPENSIONTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eType").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCapturing:
    {
      OMX_CONFIG_BOOLEANTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCaptureMode:
    {
      OMX_CONFIG_CAPTUREMODETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bContinuous = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bContinuous").ToLocalChecked()).ToLocalChecked()).FromJust(); // If true then ignore frame rate and emit capture data as fast as possible (otherwise obey port's frame rate).
      format.bFrameLimited = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bFrameLimited").ToLocalChecked()).ToLocalChecked()).FromJust(); // If true then terminate capture after the port emits the specified number of frames (otherwise the port does not terminate the capture until instructed to do so by the client). Even if set, the client may manually terminate the capture prior to reaching the limit.
      format.nFrameLimit = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFrameLimit").ToLocalChecked()).ToLocalChecked()).FromJust(); // Limit on number of frames emitted during a capture (only valid if bFrameLimited is set).

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexAutoPauseAfterCapture:
    {
      OMX_CONFIG_BOOLEANTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamContentURI:
    {
      OMX_PARAM_CONTENTURITYPE format;
      OMX_consts::InitOMXParams(&format);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamCustomContentPipe:
    {
      OMX_PARAM_CONTENTPIPETYPE format;
      OMX_consts::InitOMXParams(&format);
      format.hPipe = (OMX_HANDLETYPE) Nan::To<int>(Nan::Get(param, Nan::New("hPipe").ToLocalChecked()).ToLocalChecked()).FromJust(); // The pipe handle

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamDisableResourceConcealment:
    {
      OMX_RESOURCECONCEALMENTTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.bResourceConcealmentForbidden = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bResourceConcealmentForbidden").ToLocalChecked()).ToLocalChecked()).FromJust(); // disallow the use of resource concealment methods (like degrading algorithm quality to lower resource consumption or functional bypass) on a component as a resolution to resource conflicts.

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigMetadataItemCount:
    {
      OMX_CONFIG_METADATAITEMCOUNTTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.eScopeMode = (OMX_METADATASCOPETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eScopeMode").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nScopeSpecifier = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nScopeSpecifier").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nMetadataItemCount = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMetadataItemCount").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigContainerNodeCount:
    {
      OMX_CONFIG_CONTAINERNODECOUNTTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.bAllKeys = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bAllKeys").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nParentNodeID = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nParentNodeID").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nNumNodes = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNumNodes").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigMetadataItem:
    {
      OMX_CONFIG_METADATAITEMTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.eScopeMode = (OMX_METADATASCOPETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eScopeMode").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nScopeSpecifier = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nScopeSpecifier").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nMetadataItemIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMetadataItemIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eSearchMode = (OMX_METADATASEARCHMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eSearchMode").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eKeyCharset = (OMX_METADATACHARSETTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eKeyCharset").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nKeySizeUsed = (OMX_U8) Nan::To<int>(Nan::Get(param, Nan::New("nKeySizeUsed").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eValueCharset = (OMX_METADATACHARSETTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eValueCharset").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nValueMaxSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nValueMaxSize").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nValueSizeUsed = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nValueSizeUsed").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCounterNodeID:
    {
      OMX_CONFIG_CONTAINERNODEIDTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.bAllKeys = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bAllKeys").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nParentNodeID = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nParentNodeID").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nNodeIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNodeIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nNodeID = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNodeID").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bIsLeafType = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bIsLeafType").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamMetadataFilterType:
    {
      OMX_PARAM_METADATAFILTERTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.bAllKeys = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bAllKeys").ToLocalChecked()).ToLocalChecked()).FromJust(); // if true then this structure refers to all keys and the three key fields below are ignored
      format.eKeyCharset = (OMX_METADATACHARSETTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eKeyCharset").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nKeySizeUsed = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nKeySizeUsed").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nLanguageCountrySizeUsed = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nLanguageCountrySizeUsed").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust(); // if true then key is part of filter (e.g. retained for query later). If false then key is not part of filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamMetadataKeyFilter:
    {
      OMX_PARAM_METADATAFILTERTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.bAllKeys = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bAllKeys").ToLocalChecked()).ToLocalChecked()).FromJust(); // if true then this structure refers to all keys and the three key fields below are ignored
      format.eKeyCharset = (OMX_METADATACHARSETTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eKeyCharset").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nKeySizeUsed = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nKeySizeUsed").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nLanguageCountrySizeUsed = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nLanguageCountrySizeUsed").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust(); // if true then key is part of filter (e.g. retained for query later). If false then key is not part of filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigPriorityMgmt:
    {
      OMX_PRIORITYMGMTTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.nGroupPriority = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nGroupPriority").ToLocalChecked()).ToLocalChecked()).FromJust(); // Priority of the component group
      format.nGroupID = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nGroupID").ToLocalChecked()).ToLocalChecked()).FromJust(); // ID of the component group

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamStandardComponentRole:
    {
      OMX_PARAM_COMPONENTROLETYPE format;
      OMX_consts::InitOMXParams(&format);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamPortDefinition:
    {
      OMX_PARAM_PORTDEFINITIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eDir = (OMX_DIRTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDir").ToLocalChecked()).ToLocalChecked()).FromJust(); // Direction (input or output) of this port
      format.nBufferCountActual = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBufferCountActual").ToLocalChecked()).ToLocalChecked()).FromJust(); // The actual number of buffers allocated on this port
      format.nBufferCountMin = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBufferCountMin").ToLocalChecked()).ToLocalChecked()).FromJust(); // The minimum number of buffers this port requires
      format.nBufferSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBufferSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // Size, in bytes, for buffers to be used for this channel
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust(); // Ports default to enabled and are enabled/disabled by OMX_CommandPortEnable/OMX_CommandPortDisable. When disabled a port is unpopulated. A disabled port is not populated with buffers on a transition to IDLE.
      format.bPopulated = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bPopulated").ToLocalChecked()).ToLocalChecked()).FromJust(); // Port is populated with all of its buffers as indicated by nBufferCountActual. A disabled port is always unpopulated. An enabled port is populated on a transition to OMX_StateIdle and unpopulated on a transition to loaded.
      format.eDomain = (OMX_PORTDOMAINTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDomain").ToLocalChecked()).ToLocalChecked()).FromJust(); // Domain of the port. Determines the contents of metadata below.

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamCompBufferSupplier:
    {
      OMX_PARAM_BUFFERSUPPLIERTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eBufferSupplier = (OMX_BUFFERSUPPLIERTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eBufferSupplier").ToLocalChecked()).ToLocalChecked()).FromJust(); // buffer supplier

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioPortFormat:
    {
      OMX_AUDIO_PARAM_PORTFORMATTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust(); // Indicates the enumeration index for the format from 0x0 to N-1
      format.eEncoding = (OMX_AUDIO_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eEncoding").ToLocalChecked()).ToLocalChecked()).FromJust(); // Type of data expected for this port (e.g. PCM, AMR, MP3, etc)

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioPcm:
    {
      OMX_AUDIO_PARAM_PCMMODETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels (e.g. 2 for stereo)
      format.eNumData = (OMX_NUMERICALDATATYPE) Nan::To<int>(Nan::Get(param, Nan::New("eNumData").ToLocalChecked()).ToLocalChecked()).FromJust(); // indicates PCM data as signed or unsigned
      format.eEndian = (OMX_ENDIANTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eEndian").ToLocalChecked()).ToLocalChecked()).FromJust(); // indicates PCM data as little or big endian
      format.bInterleaved = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bInterleaved").ToLocalChecked()).ToLocalChecked()).FromJust(); // True for normal interleaved data; false for non-interleaved data (e.g. block data)
      format.nBitPerSample = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitPerSample").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bit per sample
      format.nSamplingRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSamplingRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      format.ePCMMode = (OMX_AUDIO_PCMMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("ePCMMode").ToLocalChecked()).ToLocalChecked()).FromJust(); // PCM mode enumeration

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioAac:
    {
      OMX_AUDIO_PARAM_AACPROFILETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels
      format.nSampleRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSampleRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      format.nBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      format.nAudioBandWidth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAudioBandWidth").ToLocalChecked()).ToLocalChecked()).FromJust(); // Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
      format.nFrameLength = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFrameLength").ToLocalChecked()).ToLocalChecked()).FromJust(); // Frame length (in audio samples per channel) of the codec. Can be 1024 or 960 (AAC-LC), 2048 (HE-AAC), 480 or 512 (AAC-LD). Use 0 to let encoder decide
      format.nAACtools = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAACtools").ToLocalChecked()).ToLocalChecked()).FromJust(); // AAC tool usage
      format.nAACERtools = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAACERtools").ToLocalChecked()).ToLocalChecked()).FromJust(); // MPEG-4 AAC error resilience tool usage
      format.eAACProfile = (OMX_AUDIO_AACPROFILETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eAACProfile").ToLocalChecked()).ToLocalChecked()).FromJust(); // AAC profile enumeration
      format.eAACStreamFormat = (OMX_AUDIO_AACSTREAMFORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eAACStreamFormat").ToLocalChecked()).ToLocalChecked()).FromJust(); // AAC stream format enumeration
      format.eChannelMode = (OMX_AUDIO_CHANNELMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eChannelMode").ToLocalChecked()).ToLocalChecked()).FromJust(); // Channel mode enumeration

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioRa:
    {
      OMX_AUDIO_PARAM_RATYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels
      format.nSamplingRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSamplingRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // is the sampling rate of the source data
      format.nBitsPerFrame = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitsPerFrame").ToLocalChecked()).ToLocalChecked()).FromJust(); // is the value for bits per frame
      format.nSamplePerFrame = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSamplePerFrame").ToLocalChecked()).ToLocalChecked()).FromJust(); // is the value for samples per frame
      format.nCouplingQuantBits = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nCouplingQuantBits").ToLocalChecked()).ToLocalChecked()).FromJust(); // is the number of coupling quantization bits in the stream
      format.nCouplingStartRegion = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nCouplingStartRegion").ToLocalChecked()).ToLocalChecked()).FromJust(); // is the coupling start region in the stream
      format.nNumRegions = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNumRegions").ToLocalChecked()).ToLocalChecked()).FromJust(); // is the number of regions value
      format.eFormat = (OMX_AUDIO_RAFORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFormat").ToLocalChecked()).ToLocalChecked()).FromJust(); // is the RealAudio audio format

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioMp3:
    {
      OMX_AUDIO_PARAM_MP3TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels
      format.nBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      format.nSampleRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSampleRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      format.nAudioBandWidth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAudioBandWidth").ToLocalChecked()).ToLocalChecked()).FromJust(); // Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
      format.eChannelMode = (OMX_AUDIO_CHANNELMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eChannelMode").ToLocalChecked()).ToLocalChecked()).FromJust(); // Channel mode enumeration
      format.eFormat = (OMX_AUDIO_MP3STREAMFORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFormat").ToLocalChecked()).ToLocalChecked()).FromJust(); // MP3 stream format

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioAdpcm:
    {
      OMX_AUDIO_PARAM_ADPCMTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.nBitsPerSample = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitsPerSample").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of bits in each sample
      format.nSampleRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSampleRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioG723:
    {
      OMX_AUDIO_PARAM_G723TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.eBitRate = (OMX_AUDIO_G723RATE) Nan::To<int>(Nan::Get(param, Nan::New("eBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // todo: Should this be moved to a config?
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter
      format.bPostFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bPostFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Post Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioG729:
    {
      OMX_AUDIO_PARAM_G729TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.eBitType = (OMX_AUDIO_G729TYPE) Nan::To<int>(Nan::Get(param, Nan::New("eBitType").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioAmr:
    {
      OMX_AUDIO_PARAM_AMRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels
      format.nBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bit rate read only field
      format.eAMRBandMode = (OMX_AUDIO_AMRBANDMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eAMRBandMode").ToLocalChecked()).ToLocalChecked()).FromJust(); // AMR Band Mode enumeration
      format.eAMRDTXMode = (OMX_AUDIO_AMRDTXMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eAMRDTXMode").ToLocalChecked()).ToLocalChecked()).FromJust(); // AMR DTX Mode enumeration
      format.eAMRFrameFormat = (OMX_AUDIO_AMRFRAMEFORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eAMRFrameFormat").ToLocalChecked()).ToLocalChecked()).FromJust(); // AMR frame format enumeration

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioWma:
    {
      OMX_AUDIO_PARAM_WMATYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels
      format.nBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      format.eFormat = (OMX_AUDIO_WMAFORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFormat").ToLocalChecked()).ToLocalChecked()).FromJust(); // Version of WMA stream / data
      format.eProfile = (OMX_AUDIO_WMAPROFILETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eProfile").ToLocalChecked()).ToLocalChecked()).FromJust(); // Profile of WMA stream / data
      format.nSamplingRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSamplingRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sampling rate of the source data
      format.nBlockAlign = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nBlockAlign").ToLocalChecked()).ToLocalChecked()).FromJust(); // is the block alignment, or block size, in bytes of the audio codec
      format.nEncodeOptions = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nEncodeOptions").ToLocalChecked()).ToLocalChecked()).FromJust(); // WMA Type-specific data
      format.nSuperBlockAlign = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSuperBlockAlign").ToLocalChecked()).ToLocalChecked()).FromJust(); // WMA Type-specific data

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioSbc:
    {
      OMX_AUDIO_PARAM_SBCTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels
      format.nBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      format.nSampleRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSampleRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      format.nBlocks = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBlocks").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of blocks
      format.nSubbands = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSubbands").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of subbands
      format.nBitPool = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitPool").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bitpool value
      format.bEnableBitrate = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableBitrate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Use bitrate value instead of bitpool
      format.eChannelMode = (OMX_AUDIO_CHANNELMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eChannelMode").ToLocalChecked()).ToLocalChecked()).FromJust(); // Channel mode enumeration
      format.eSBCAllocType = (OMX_AUDIO_SBCALLOCMETHODTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eSBCAllocType").ToLocalChecked()).ToLocalChecked()).FromJust(); // SBC Allocation method type

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioMidi:
    {
      OMX_AUDIO_PARAM_MIDITYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nFileSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFileSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // size of the MIDI file in bytes, where the entire MIDI file passed in, otherwise if 0x0, the MIDI data is merged and streamed (instead of passed as an entire MIDI file)
      format.bLoadDefaultSound = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bLoadDefaultSound").ToLocalChecked()).ToLocalChecked()).FromJust(); // Whether to load default sound bank at initialization
      format.eMidiFormat = (OMX_AUDIO_MIDIFORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eMidiFormat").ToLocalChecked()).ToLocalChecked()).FromJust(); // Version of the MIDI file

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioGsm_FR:
    {
      OMX_AUDIO_PARAM_GSMFRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioMidiLoadUserSound:
    {
      OMX_AUDIO_PARAM_MIDILOADUSERSOUNDTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nDLSIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nDLSIndex").ToLocalChecked()).ToLocalChecked()).FromJust(); // DLS file index to be loaded
      format.nDLSSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nDLSSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // Size in bytes
      format.pDLSData = (OMX_PTR) Nan::To<int>(Nan::Get(param, Nan::New("pDLSData").ToLocalChecked()).ToLocalChecked()).FromJust(); // Pointer to DLS file data
      format.eMidiSoundBank = (OMX_AUDIO_MIDISOUNDBANKTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eMidiSoundBank").ToLocalChecked()).ToLocalChecked()).FromJust(); // Midi sound bank type enumeration
      format.eMidiSoundBankLayout = (OMX_AUDIO_MIDISOUNDBANKLAYOUTTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eMidiSoundBankLayout").ToLocalChecked()).ToLocalChecked()).FromJust(); // Midi sound bank layout enumeration

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioG726:
    {
      OMX_AUDIO_PARAM_G726TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.eG726Mode = (OMX_AUDIO_G726MODE) Nan::To<int>(Nan::Get(param, Nan::New("eG726Mode").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioGsm_EFR:
    {
      OMX_AUDIO_PARAM_GSMEFRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioGsm_HR:
    {
      OMX_AUDIO_PARAM_GSMHRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioPdc_FR:
    {
      OMX_AUDIO_PARAM_PDCFRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioPdc_EFR:
    {
      OMX_AUDIO_PARAM_PDCEFRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioPdc_HR:
    {
      OMX_AUDIO_PARAM_PDCHRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioTdma_FR:
    {
      OMX_AUDIO_PARAM_TDMAFRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioTdma_EFR:
    {
      OMX_AUDIO_PARAM_TDMAEFRTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.bDTX = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDTX").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable Discontinuous Transmisssion
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable High Pass Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioQcelp8:
    {
      OMX_AUDIO_PARAM_QCELP8TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.nBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bit rate of the input data. Use 0 for variable rate or unknown bit rates
      format.eCDMARate = (OMX_AUDIO_CDMARATETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCDMARate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Frame rate
      format.nMinBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMinBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // minmal rate for the encoder = 1,2,3,4, default = 1
      format.nMaxBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMaxBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // maximal rate for the encoder = 1,2,3,4, default = 4

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioQcelp13:
    {
      OMX_AUDIO_PARAM_QCELP13TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.eCDMARate = (OMX_AUDIO_CDMARATETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCDMARate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Frame rate
      format.nMinBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMinBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // minmal rate for the encoder = 1,2,3,4, default = 1
      format.nMaxBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMaxBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // maximal rate for the encoder = 1,2,3,4, default = 4

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioEvrc:
    {
      OMX_AUDIO_PARAM_EVRCTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.eCDMARate = (OMX_AUDIO_CDMARATETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCDMARate").ToLocalChecked()).ToLocalChecked()).FromJust(); // actual Frame rate
      format.bRATE_REDUCon = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bRATE_REDUCon").ToLocalChecked()).ToLocalChecked()).FromJust(); // RATE_REDUCtion is requested for this frame
      format.nMinBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMinBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // minmal rate for the encoder = 1,2,3,4, default = 1
      format.nMaxBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMaxBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // maximal rate for the encoder = 1,2,3,4, default = 4
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable encoder's High Pass Filter
      format.bNoiseSuppressor = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bNoiseSuppressor").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable encoder's noise suppressor pre-processing
      format.bPostFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bPostFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable decoder's post Filter

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioSmv:
    {
      OMX_AUDIO_PARAM_SMVTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
      format.eCDMARate = (OMX_AUDIO_CDMARATETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCDMARate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Frame rate
      format.bRATE_REDUCon = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bRATE_REDUCon").ToLocalChecked()).ToLocalChecked()).FromJust(); // RATE_REDUCtion is requested for this frame
      format.nMinBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMinBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // minmal rate for the encoder = 1,2,3,4, default = 1 ??
      format.nMaxBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMaxBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // maximal rate for the encoder = 1,2,3,4, default = 4 ??
      format.bHiPassFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bHiPassFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable encoder's High Pass Filter ??
      format.bNoiseSuppressor = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bNoiseSuppressor").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable encoder's noise suppressor pre-processing
      format.bPostFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bPostFilter").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable decoder's post Filter ??

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamAudioVorbis:
    {
      OMX_AUDIO_PARAM_VORBISTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannels = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannels").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of channels
      format.nBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Bit rate of the encoded data data. Use 0 for variable rate or unknown bit rates. Encoding is set to the bitrate closest to specified value (in bps)
      format.nMinBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMinBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sets minimum bitrate (in bps).
      format.nMaxBitRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMaxBitRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sets maximum bitrate (in bps).
      format.nSampleRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSampleRate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
      format.nAudioBandWidth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAudioBandWidth").ToLocalChecked()).ToLocalChecked()).FromJust(); // Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
      format.nQuality = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nQuality").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sets encoding quality to n, between -1 (low) and 10 (high). In the default mode of operation, teh quality level is 3. Normal quality range is 0 - 10.
      format.bManaged = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bManaged").ToLocalChecked()).ToLocalChecked()).FromJust(); // Set bitrate management mode. This turns off the normal VBR encoding, but allows hard or soft bitrate constraints to be enforced by the encoder. This mode can be slower, and may also be lower quality. It is primarily useful for streaming.
      format.bDownmix = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDownmix").ToLocalChecked()).ToLocalChecked()).FromJust(); // Downmix input from stereo to mono (has no effect on non-stereo streams). Useful for lower-bitrate encoding.

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioMidiImmediateEvent:
    {
      OMX_AUDIO_CONFIG_MIDIIMMEDIATEEVENTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nMidiEventSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMidiEventSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // Size of immediate MIDI events or MIP message in bytes

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioMidiControl:
    {
      OMX_AUDIO_CONFIG_MIDICONTROLTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nMaxPolyphony = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMaxPolyphony").ToLocalChecked()).ToLocalChecked()).FromJust(); // Specifies the maximum simultaneous polyphonic voices. A value of zero indicates that the default polyphony of the device is used
      format.nNumRepeat = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNumRepeat").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of times to repeat playback
      format.nStopTime = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nStopTime").ToLocalChecked()).ToLocalChecked()).FromJust(); // Time in milliseconds to indicate when playback will stop automatically. Set to zero if not used
      format.nChannelMuteMask = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nChannelMuteMask").ToLocalChecked()).ToLocalChecked()).FromJust(); // 16 bit mask for channel mute status
      format.nChannelSoloMask = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nChannelSoloMask").ToLocalChecked()).ToLocalChecked()).FromJust(); // 16 bit mask for channel solo status
      format.nTrack0031MuteMask = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nTrack0031MuteMask").ToLocalChecked()).ToLocalChecked()).FromJust(); // 32 bit mask for track mute status. Note: This is for tracks 0-31
      format.nTrack3263MuteMask = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nTrack3263MuteMask").ToLocalChecked()).ToLocalChecked()).FromJust(); // 32 bit mask for track mute status. Note: This is for tracks 32-63
      format.nTrack0031SoloMask = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nTrack0031SoloMask").ToLocalChecked()).ToLocalChecked()).FromJust(); // 32 bit mask for track solo status. Note: This is for tracks 0-31
      format.nTrack3263SoloMask = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nTrack3263SoloMask").ToLocalChecked()).ToLocalChecked()).FromJust(); // 32 bit mask for track solo status. Note: This is for tracks 32-63

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioMidiSoundBankProgram:
    {
      OMX_AUDIO_CONFIG_MIDISOUNDBANKPROGRAMTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannel = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannel").ToLocalChecked()).ToLocalChecked()).FromJust(); // Valid channel values range from 1 to 16
      format.nIDProgram = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nIDProgram").ToLocalChecked()).ToLocalChecked()).FromJust(); // Valid program ID range is 1 to 128
      format.nIDSoundBank = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nIDSoundBank").ToLocalChecked()).ToLocalChecked()).FromJust(); // Sound bank ID
      format.nUserSoundBankIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nUserSoundBankIndex").ToLocalChecked()).ToLocalChecked()).FromJust(); // User soundbank index, easier to access soundbanks by index if multiple banks are present

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioMidiStatus:
    {
      OMX_AUDIO_CONFIG_MIDISTATUSTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nNumTracks = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nNumTracks").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of MIDI tracks in the file, read only field. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      format.nDuration = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nDuration").ToLocalChecked()).ToLocalChecked()).FromJust(); // The length of the currently open MIDI resource in milliseconds. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      format.nPosition = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPosition").ToLocalChecked()).ToLocalChecked()).FromJust(); // Current Position of the MIDI resource being played in milliseconds
      format.bVibra = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bVibra").ToLocalChecked()).ToLocalChecked()).FromJust(); // Does Vibra track exist? NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      format.nNumMetaEvents = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNumMetaEvents").ToLocalChecked()).ToLocalChecked()).FromJust(); // Total number of MIDI Meta Events in the currently open MIDI resource. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      format.nNumActiveVoices = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNumActiveVoices").ToLocalChecked()).ToLocalChecked()).FromJust(); // Number of active voices in the currently playing MIDI resource. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
      format.eMIDIPlayBackState = (OMX_AUDIO_MIDIPLAYBACKSTATETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eMIDIPlayBackState").ToLocalChecked()).ToLocalChecked()).FromJust(); // MIDI playback state enumeration, read only field

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioMidiMetaEvent:
    {
      OMX_AUDIO_CONFIG_MIDIMETAEVENTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust(); // Index of Meta Event
      format.nMetaEventType = (OMX_U8) Nan::To<int>(Nan::Get(param, Nan::New("nMetaEventType").ToLocalChecked()).ToLocalChecked()).FromJust(); // Meta Event Type, 7bits (i.e. 0 - 127)
      format.nMetaEventSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMetaEventSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // size of the Meta Event in bytes
      format.nTrack = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nTrack").ToLocalChecked()).ToLocalChecked()).FromJust(); // track number for the meta event
      format.nPosition = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPosition").ToLocalChecked()).ToLocalChecked()).FromJust(); // Position of the meta-event in milliseconds

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioMidiMetaEventData:
    {
      OMX_AUDIO_CONFIG_MIDIMETAEVENTDATATYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust(); // Index of Meta Event
      format.nMetaEventSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMetaEventSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // size of the Meta Event in bytes

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioVolume:
    {
      OMX_AUDIO_CONFIG_VOLUMETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bLinear = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bLinear").ToLocalChecked()).ToLocalChecked()).FromJust(); // Is the volume to be set in linear (0.100) or logarithmic scale (mB)

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioBalance:
    {
      OMX_AUDIO_CONFIG_BALANCETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nBalance = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nBalance").ToLocalChecked()).ToLocalChecked()).FromJust(); // balance setting for this port (-100 to 100, where -100 indicates all left, and no right

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioChannelMute:
    {
      OMX_AUDIO_CONFIG_CHANNELMUTETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannel = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannel").ToLocalChecked()).ToLocalChecked()).FromJust(); // channel to select from 0 to N-1, using OMX_ALL to apply mute settings to all channels
      format.bMute = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bMute").ToLocalChecked()).ToLocalChecked()).FromJust(); // Mute setting for this channel
      format.bIsMIDI = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bIsMIDI").ToLocalChecked()).ToLocalChecked()).FromJust(); // TRUE if nChannel refers to a MIDI channel, FALSE otherwise

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioMute:
    {
      OMX_AUDIO_CONFIG_MUTETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bMute = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bMute").ToLocalChecked()).ToLocalChecked()).FromJust(); // Mute setting for this port

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioLoudness:
    {
      OMX_AUDIO_CONFIG_LOUDNESSTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bLoudness = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bLoudness").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable/disable for loudness

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioEchoCancelation:
    {
      OMX_AUDIO_CONFIG_ECHOCANCELATIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eEchoCancelation = (OMX_AUDIO_ECHOCANTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eEchoCancelation").ToLocalChecked()).ToLocalChecked()).FromJust(); // Echo cancelation settings

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioNoiseReduction:
    {
      OMX_AUDIO_CONFIG_NOISEREDUCTIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bNoiseReduction = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bNoiseReduction").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable/disable for noise reduction

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioBass:
    {
      OMX_AUDIO_CONFIG_BASSTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnable = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnable").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable/disable for bass control
      format.nBass = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nBass").ToLocalChecked()).ToLocalChecked()).FromJust(); // bass setting for the port, as a continuous value from -100 to 100 (0 means no change in bass level)

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioTreble:
    {
      OMX_AUDIO_CONFIG_TREBLETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnable = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnable").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable/disable for treble control
      format.nTreble = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nTreble").ToLocalChecked()).ToLocalChecked()).FromJust(); // treble setting for the port, as a continuous value from -100 to 100 (0 means no change in treble level)

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioStereoWidening:
    {
      OMX_AUDIO_CONFIG_STEREOWIDENINGTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnable = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnable").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable/disable for stereo widening control
      format.eWideningType = (OMX_AUDIO_STEREOWIDENINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eWideningType").ToLocalChecked()).ToLocalChecked()).FromJust(); // Stereo widening algorithm type
      format.nStereoWidening = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nStereoWidening").ToLocalChecked()).ToLocalChecked()).FromJust(); // stereo widening setting for the port, as a continuous value from 0 to 100

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioChorus:
    {
      OMX_AUDIO_CONFIG_CHORUSTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnable = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnable").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable/disable for chorus
      format.nModulationDepth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nModulationDepth").ToLocalChecked()).ToLocalChecked()).FromJust(); // depth of modulation as a percentage of delay (i.e. 0 to 100)

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioEqualizer:
    {
      OMX_AUDIO_CONFIG_EQUALIZERTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnable = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnable").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable/disable for equalizer

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioReverberation:
    {
      OMX_AUDIO_CONFIG_REVERBERATIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnable = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnable").ToLocalChecked()).ToLocalChecked()).FromJust(); // Enable/disable for reverberation control
      format.nDensity = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nDensity").ToLocalChecked()).ToLocalChecked()).FromJust(); // Modal density in the late reverberation decay, in percent (i.e. 0 - 100)
      format.nDiffusion = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nDiffusion").ToLocalChecked()).ToLocalChecked()).FromJust(); // Echo density in the late reverberation decay, in percent (i.e. 0 - 100)

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigAudioChannelVolume:
    {
      OMX_AUDIO_CONFIG_CHANNELVOLUMETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nChannel = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nChannel").ToLocalChecked()).ToLocalChecked()).FromJust(); // channel to select from 0 to N-1, using OMX_ALL to apply volume settings to all channels
      format.bLinear = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bLinear").ToLocalChecked()).ToLocalChecked()).FromJust(); // Is the volume to be set in linear (0.100) or logarithmic scale (mB)
      format.bIsMIDI = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bIsMIDI").ToLocalChecked()).ToLocalChecked()).FromJust(); // TRUE if nChannel refers to a MIDI channel, FALSE otherwise

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamImagePortFormat:
    {
      OMX_IMAGE_PARAM_PORTFORMATTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eCompressionFormat = (OMX_IMAGE_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamFlashControl:
    {
      OMX_IMAGE_PARAM_FLASHCONTROLTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eFlashControl = (OMX_IMAGE_FLASHCONTROLTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFlashControl").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigFocusControl:
    {
      OMX_IMAGE_CONFIG_FOCUSCONTROLTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eFocusControl = (OMX_IMAGE_FOCUSCONTROLTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFocusControl").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nFocusSteps = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFocusSteps").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nFocusStepIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFocusStepIndex").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamQFactor:
    {
      OMX_IMAGE_PARAM_QFACTORTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nQFactor = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nQFactor").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamQuantizationTable:
    {
      OMX_IMAGE_PARAM_QUANTIZATIONTABLETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eQuantizationTable = (OMX_IMAGE_QUANTIZATIONTABLETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eQuantizationTable").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamHuffmanTable:
    {
      OMX_IMAGE_PARAM_HUFFMANTTABLETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eHuffmanTable = (OMX_IMAGE_HUFFMANTABLETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eHuffmanTable").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigFlashControl:
    {
      OMX_IMAGE_PARAM_FLASHCONTROLTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eFlashControl = (OMX_IMAGE_FLASHCONTROLTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFlashControl").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoPortFormat:
    {
      OMX_VIDEO_PARAM_PORTFORMATTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.xFramerate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoQuantization:
    {
      OMX_VIDEO_PARAM_QUANTIZATIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nQpI = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nQpI").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nQpP = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nQpP").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nQpB = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nQpB").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoFastUpdate:
    {
      OMX_VIDEO_PARAM_VIDEOFASTUPDATETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnableVFU = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableVFU").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nFirstGOB = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFirstGOB").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nFirstMB = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFirstMB").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nNumMBs = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNumMBs").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoBitrate:
    {
      OMX_VIDEO_PARAM_BITRATETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eControlRate = (OMX_VIDEO_CONTROLRATETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eControlRate").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nTargetBitrate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nTargetBitrate").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoMotionVector:
    {
      OMX_VIDEO_PARAM_MOTIONVECTORTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eAccuracy = (OMX_VIDEO_MOTIONVECTORTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eAccuracy").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bUnrestrictedMVs = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bUnrestrictedMVs").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bFourMV = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bFourMV").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.sXSearchRange = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("sXSearchRange").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.sYSearchRange = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("sYSearchRange").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoIntraRefresh:
    {
      OMX_VIDEO_PARAM_INTRAREFRESHTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eRefreshMode = (OMX_VIDEO_INTRAREFRESHTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eRefreshMode").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nAirMBs = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAirMBs").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nAirRef = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAirRef").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nCirMBs = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nCirMBs").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoErrorCorrection:
    {
      OMX_VIDEO_PARAM_ERRORCORRECTIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnableHEC = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableHEC").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableResync = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableResync").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nResynchMarkerSpacing = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nResynchMarkerSpacing").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableDataPartitioning = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableDataPartitioning").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableRVLC = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableRVLC").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoVBSMC:
    {
      OMX_VIDEO_PARAM_VBSMCTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.b16x16 = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("b16x16").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.b16x8 = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("b16x8").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.b8x16 = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("b8x16").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.b8x8 = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("b8x8").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.b8x4 = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("b8x4").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.b4x8 = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("b4x8").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.b4x4 = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("b4x4").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoMpeg2:
    {
      OMX_VIDEO_PARAM_MPEG2TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nPFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eProfile = (OMX_VIDEO_MPEG2PROFILETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eProfile").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eLevel = (OMX_VIDEO_MPEG2LEVELTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eLevel").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoMpeg4:
    {
      OMX_VIDEO_PARAM_MPEG4TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nSliceHeaderSpacing = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSliceHeaderSpacing").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bSVH = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bSVH").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bGov = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bGov").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nPFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nIDCVLCThreshold = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIDCVLCThreshold").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bACPred = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bACPred").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nMaxPacketSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMaxPacketSize").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nTimeIncRes = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nTimeIncRes").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eProfile = (OMX_VIDEO_MPEG4PROFILETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eProfile").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eLevel = (OMX_VIDEO_MPEG4LEVELTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eLevel").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nAllowedPictureTypes = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAllowedPictureTypes").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nHeaderExtension = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nHeaderExtension").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bReversibleVLC = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bReversibleVLC").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoWmv:
    {
      OMX_VIDEO_PARAM_WMVTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eFormat = (OMX_VIDEO_WMVFORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFormat").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoRv:
    {
      OMX_VIDEO_PARAM_RVTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eFormat = (OMX_VIDEO_RVFORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBitsPerPixel = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nBitsPerPixel").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nPaddedWidth = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nPaddedWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nPaddedHeight = (OMX_U16) Nan::To<int>(Nan::Get(param, Nan::New("nPaddedHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nFrameRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFrameRate").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBitstreamFlags = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitstreamFlags").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBitstreamVersion = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBitstreamVersion").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nMaxEncodeFrameSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMaxEncodeFrameSize").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnablePostFilter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnablePostFilter").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableTemporalInterpolation = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableTemporalInterpolation").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableLatencyMode = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableLatencyMode").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoAvc:
    {
      OMX_VIDEO_PARAM_AVCTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nSliceHeaderSpacing = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSliceHeaderSpacing").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nPFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bUseHadamard = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bUseHadamard").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nRefFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nRefFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nRefIdx10ActiveMinus1 = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nRefIdx10ActiveMinus1").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nRefIdx11ActiveMinus1 = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nRefIdx11ActiveMinus1").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableUEP = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableUEP").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableFMO = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableFMO").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableASO = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableASO").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnableRS = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnableRS").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eProfile = (OMX_VIDEO_AVCPROFILETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eProfile").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eLevel = (OMX_VIDEO_AVCLEVELTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eLevel").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nAllowedPictureTypes = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAllowedPictureTypes").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bFrameMBsOnly = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bFrameMBsOnly").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bMBAFF = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bMBAFF").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEntropyCodingCABAC = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEntropyCodingCABAC").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bWeightedPPrediction = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bWeightedPPrediction").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nWeightedBipredicitonMode = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nWeightedBipredicitonMode").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bconstIpred = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bconstIpred").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bDirect8x8Inference = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDirect8x8Inference").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bDirectSpatialTemporal = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDirectSpatialTemporal").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nCabacInitIdc = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nCabacInitIdc").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eLoopFilterMode = (OMX_VIDEO_AVCLOOPFILTERTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eLoopFilterMode").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoH263:
    {
      OMX_VIDEO_PARAM_H263TYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nPFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBFrames").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eProfile = (OMX_VIDEO_H263PROFILETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eProfile").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eLevel = (OMX_VIDEO_H263LEVELTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eLevel").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bPLUSPTYPEAllowed = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bPLUSPTYPEAllowed").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nAllowedPictureTypes = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAllowedPictureTypes").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bForceRoundingTypeToZero = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bForceRoundingTypeToZero").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nPictureHeaderRepetition = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPictureHeaderRepetition").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nGOBHeaderInterval = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nGOBHeaderInterval").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoProfileLevelQuerySupported:
    {
      OMX_VIDEO_PARAM_PROFILELEVELTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eProfile = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("eProfile").ToLocalChecked()).ToLocalChecked()).FromJust(); // type is OMX_VIDEO_AVCPROFILETYPE, OMX_VIDEO_H263PROFILETYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
      format.eLevel = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("eLevel").ToLocalChecked()).ToLocalChecked()).FromJust(); // type is OMX_VIDEO_AVCLEVELTYPE, OMX_VIDEO_H263LEVELTYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
      format.nProfileIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nProfileIndex").ToLocalChecked()).ToLocalChecked()).FromJust(); // Used to query for individual profile support information, This parameter is valid only for OMX_IndexParamVideoProfileLevelQuerySupported index, For all other indices this parameter is to be ignored.

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoProfileLevelCurrent:
    {
      OMX_VIDEO_PARAM_PROFILELEVELTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eProfile = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("eProfile").ToLocalChecked()).ToLocalChecked()).FromJust(); // type is OMX_VIDEO_AVCPROFILETYPE, OMX_VIDEO_H263PROFILETYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
      format.eLevel = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("eLevel").ToLocalChecked()).ToLocalChecked()).FromJust(); // type is OMX_VIDEO_AVCLEVELTYPE, OMX_VIDEO_H263LEVELTYPE, or OMX_VIDEO_MPEG4PROFILETYPE depending on context
      format.nProfileIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nProfileIndex").ToLocalChecked()).ToLocalChecked()).FromJust(); // Used to query for individual profile support information, This parameter is valid only for OMX_IndexParamVideoProfileLevelQuerySupported index, For all other indices this parameter is to be ignored.

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigVideoBitrate:
    {
      OMX_VIDEO_CONFIG_BITRATETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nEncodeBitrate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nEncodeBitrate").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigVideoFramerate:
    {
      OMX_CONFIG_FRAMERATETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.xEncodeFramerate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("xEncodeFramerate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Q16 format

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigVideoIntraVOPRefresh:
    {
      OMX_CONFIG_INTRAREFRESHVOPTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.IntraRefreshVOP = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("IntraRefreshVOP").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigVideoIntraMBRefresh:
    {
      OMX_CONFIG_MACROBLOCKERRORMAPTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nErrMapSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nErrMapSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // Size of the Error Map in bytes

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigVideoMBErrorReporting:
    {
      OMX_CONFIG_MBERRORREPORTINGTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoMacroblocksPerFrame:
    {
      OMX_PARAM_MACROBLOCKSTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nMacroblocks = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nMacroblocks").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigVideoMacroBlockErrorMap:
    {
      OMX_CONFIG_MACROBLOCKERRORMAPTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nErrMapSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nErrMapSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // Size of the Error Map in bytes

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoSliceFMO:
    {
      OMX_VIDEO_PARAM_AVCSLICEFMO format;
      OMX_consts::InitOMXParams(&format, port);
      format.nNumSliceGroups = (OMX_U8) Nan::To<int>(Nan::Get(param, Nan::New("nNumSliceGroups").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nSliceGroupMapType = (OMX_U8) Nan::To<int>(Nan::Get(param, Nan::New("nSliceGroupMapType").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eSliceMode = (OMX_VIDEO_AVCSLICEMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eSliceMode").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigVideoAVCIntraPeriod:
    {
      OMX_VIDEO_CONFIG_AVCINTRAPERIOD format;
      OMX_consts::InitOMXParams(&format, port);
      format.nIDRPeriod = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIDRPeriod").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nPFrames = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nPFrames").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigVideoNalSize:
    {
      OMX_VIDEO_CONFIG_NALSIZE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nNaluBytes = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nNaluBytes").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamCommonDeblocking:
    {
      OMX_PARAM_DEBLOCKINGTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bDeblocking = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bDeblocking").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamCommonSensorMode:
    {
      OMX_PARAM_SENSORMODETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nFrameRate = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nFrameRate").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bOneShot = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bOneShot").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamCommonInterleave:
    {
      OMX_PARAM_INTERLEAVETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bEnable = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnable").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nInterleavePortIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nInterleavePortIndex").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonColorFormatConversion:
    {
      OMX_CONFIG_COLORCONVERSIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonScale:
    {
      OMX_CONFIG_SCALEFACTORTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.xWidth = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("xWidth").ToLocalChecked()).ToLocalChecked()).FromJust(); // Fixed point value stored as Q16
      format.xHeight = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("xHeight").ToLocalChecked()).ToLocalChecked()).FromJust(); // Fixed point value stored as Q16

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonImageFilter:
    {
      OMX_CONFIG_IMAGEFILTERTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eImageFilter = (OMX_IMAGEFILTERTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eImageFilter").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonColorEnhancement:
    {
      OMX_CONFIG_COLORENHANCEMENTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bColorEnhancement = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bColorEnhancement").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nCustomizedU = (OMX_U8) Nan::To<int>(Nan::Get(param, Nan::New("nCustomizedU").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nCustomizedV = (OMX_U8) Nan::To<int>(Nan::Get(param, Nan::New("nCustomizedV").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonColorKey:
    {
      OMX_CONFIG_COLORKEYTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nARGBColor = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nARGBColor").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nARGBMask = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nARGBMask").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonColorBlend:
    {
      OMX_CONFIG_COLORBLENDTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nRGBAlphaConstant = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nRGBAlphaConstant").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eColorBlend = (OMX_COLORBLENDTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eColorBlend").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonFrameStabilisation:
    {
      OMX_CONFIG_FRAMESTABTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bStab = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bStab").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonRotate:
    {
      OMX_CONFIG_ROTATIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nRotation = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nRotation").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonMirror:
    {
      OMX_CONFIG_MIRRORTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eMirror = (OMX_MIRRORTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eMirror").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonOutputPosition:
    {
      OMX_CONFIG_POINTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nX = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nX").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nY = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nY").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonInputCrop:
    {
      OMX_CONFIG_RECTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nLeft = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nLeft").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nTop = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nTop").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nWidth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nHeight = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nHeight").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonOutputCrop:
    {
      OMX_CONFIG_RECTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nLeft = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nLeft").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nTop = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nTop").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nWidth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nHeight = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nHeight").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonDigitalZoom:
    {
      OMX_CONFIG_SCALEFACTORTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.xWidth = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("xWidth").ToLocalChecked()).ToLocalChecked()).FromJust(); // Fixed point value stored as Q16
      format.xHeight = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("xHeight").ToLocalChecked()).ToLocalChecked()).FromJust(); // Fixed point value stored as Q16

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonOpticalZoom:
    {
      OMX_CONFIG_SCALEFACTORTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.xWidth = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("xWidth").ToLocalChecked()).ToLocalChecked()).FromJust(); // Fixed point value stored as Q16
      format.xHeight = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("xHeight").ToLocalChecked()).ToLocalChecked()).FromJust(); // Fixed point value stored as Q16

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonWhiteBalance:
    {
      OMX_CONFIG_WHITEBALCONTROLTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eWhiteBalControl = (OMX_WHITEBALCONTROLTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eWhiteBalControl").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonExposure:
    {
      OMX_CONFIG_EXPOSURECONTROLTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eExposureControl = (OMX_EXPOSURECONTROLTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eExposureControl").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonContrast:
    {
      OMX_CONFIG_CONTRASTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nContrast = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nContrast").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonBrightness:
    {
      OMX_CONFIG_BRIGHTNESSTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nBrightness = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBrightness").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonBacklight:
    {
      OMX_CONFIG_BACKLIGHTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nBacklight = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nBacklight").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nTimeout = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nTimeout").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonGamma:
    {
      OMX_CONFIG_GAMMATYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nGamma = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nGamma").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonSaturation:
    {
      OMX_CONFIG_SATURATIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nSaturation = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nSaturation").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonLightness:
    {
      OMX_CONFIG_LIGHTNESSTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nLightness = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nLightness").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonExclusionRect:
    {
      OMX_CONFIG_RECTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nLeft = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nLeft").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nTop = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("nTop").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nWidth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nHeight = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nHeight").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonDithering:
    {
      OMX_CONFIG_DITHERTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eDither = (OMX_DITHERTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDither").ToLocalChecked()).ToLocalChecked()).FromJust(); // Type of dithering to use

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonPlaneBlend:
    {
      OMX_CONFIG_PLANEBLENDTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nDepth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nDepth").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nAlpha = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nAlpha").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonExposureValue:
    {
      OMX_CONFIG_EXPOSUREVALUETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eMetering = (OMX_METERINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eMetering").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.xEVCompensation = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("xEVCompensation").ToLocalChecked()).ToLocalChecked()).FromJust(); // Fixed point value stored as Q16
      format.nApertureFNumber = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nApertureFNumber").ToLocalChecked()).ToLocalChecked()).FromJust(); // e.g. nApertureFNumber = 2 implies "f/2" - Q16 format
      format.bAutoAperture = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bAutoAperture").ToLocalChecked()).ToLocalChecked()).FromJust(); // Whether aperture number is defined automatically
      format.nShutterSpeedMsec = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nShutterSpeedMsec").ToLocalChecked()).ToLocalChecked()).FromJust(); // Shutterspeed in milliseconds
      format.bAutoShutterSpeed = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bAutoShutterSpeed").ToLocalChecked()).ToLocalChecked()).FromJust(); // Whether shutter speed is defined automatically
      format.nSensitivity = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nSensitivity").ToLocalChecked()).ToLocalChecked()).FromJust(); // e.g. nSensitivity = 100 implies "ISO 100"
      format.bAutoSensitivity = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bAutoSensitivity").ToLocalChecked()).ToLocalChecked()).FromJust(); // Whether sensitivity is defined automatically

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonOutputSize:
    {
      OMX_FRAMESIZETYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nWidth = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nHeight = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nHeight").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamCommonExtraQuantData:
    {
      OMX_OTHER_EXTRADATATYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eType = (OMX_EXTRADATATYPE) Nan::To<int>(Nan::Get(param, Nan::New("eType").ToLocalChecked()).ToLocalChecked()).FromJust(); // Extra Data type
      format.nDataSize = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nDataSize").ToLocalChecked()).ToLocalChecked()).FromJust(); // Size of the supporting data to follow

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonFocusRegion:
    {
      OMX_CONFIG_FOCUSREGIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.bCenter = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bCenter").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bLeft = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bLeft").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bRight = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bRight").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bTop = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bTop").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bBottom = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bBottom").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bTopLeft = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bTopLeft").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bTopRight = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bTopRight").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bBottomLeft = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bBottomLeft").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bBottomRight = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bBottomRight").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonFocusStatus:
    {
      OMX_PARAM_FOCUSSTATUSTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eFocusStatus = (OMX_FOCUSSTATUSTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFocusStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bCenterStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bCenterStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bLeftStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bLeftStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bRightStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bRightStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bTopStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bTopStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bBottomStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bBottomStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bTopLeftStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bTopLeftStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bTopRightStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bTopRightStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bBottomLeftStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bBottomLeftStatus").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bBottomRightStatus = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bBottomRightStatus").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigCommonTransitionEffect:
    {
      OMX_CONFIG_TRANSITIONEFFECTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.eEffect = (OMX_TRANSITIONEFFECTTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eEffect").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamOtherPortFormat:
    {
      OMX_OTHER_PARAM_PORTFORMATTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.nIndex = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust(); // Indicates the enumeration index for the format from 0x0 to N-1
      format.eFormat = (OMX_OTHER_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eFormat").ToLocalChecked()).ToLocalChecked()).FromJust(); // Type of data expected for this channel

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigOtherPower:
    {
      OMX_OTHER_CONFIG_POWERTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.bEnablePM = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnablePM").ToLocalChecked()).ToLocalChecked()).FromJust(); // Flag to enable Power Management

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigOtherStats:
    {
      OMX_OTHER_CONFIG_STATSTYPE format;
      OMX_consts::InitOMXParams(&format);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeScale:
    {
      OMX_TIME_CONFIG_SCALETYPE format;
      OMX_consts::InitOMXParams(&format);
      format.xScale = (OMX_S32) Nan::To<int>(Nan::Get(param, Nan::New("xScale").ToLocalChecked()).ToLocalChecked()).FromJust(); // This is a value in Q16 format which is used for scaling the media time

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeClockState:
    {
      OMX_TIME_CONFIG_CLOCKSTATETYPE format;
      OMX_consts::InitOMXParams(&format);
      format.eState = (OMX_TIME_CLOCKSTATE) Nan::To<int>(Nan::Get(param, Nan::New("eState").ToLocalChecked()).ToLocalChecked()).FromJust(); // State of the media time.
      format.nWaitMask = (OMX_U32) Nan::To<int>(Nan::Get(param, Nan::New("nWaitMask").ToLocalChecked()).ToLocalChecked()).FromJust(); // Mask of OMX_CLOCKPORT values.

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeActiveRefClock:
    {
      OMX_TIME_CONFIG_ACTIVEREFCLOCKTYPE format;
      OMX_consts::InitOMXParams(&format);
      format.eClock = (OMX_TIME_REFCLOCKTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eClock").ToLocalChecked()).ToLocalChecked()).FromJust(); // Reference clock used to compute media time

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeCurrentMediaTime:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeCurrentWallTime:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeCurrentAudioReference:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeCurrentVideoReference:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeMediaTimeRequest:
    {
      OMX_TIME_CONFIG_MEDIATIMEREQUESTTYPE format;
      OMX_consts::InitOMXParams(&format, port);
      format.pClientPrivate = (OMX_PTR) Nan::To<int>(Nan::Get(param, Nan::New("pClientPrivate").ToLocalChecked()).ToLocalChecked()).FromJust(); // Client private data to disabiguate this media time from others (e.g. the number of the frame to deliver). Duplicated in the media time structure that fulfills this request. A value of zero is reserved for time scale updates.

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeClientStartTime:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimePosition:
    {
      OMX_TIME_CONFIG_TIMESTAMPTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;
    case OMX_IndexConfigTimeSeekMode:
    {
      OMX_TIME_CONFIG_SEEKMODETYPE format;
      OMX_consts::InitOMXParams(&format);
      format.eType = (OMX_TIME_SEEKMODETYPE) Nan::To<int>(Nan::Get(param, Nan::New("eType").ToLocalChecked()).ToLocalChecked()).FromJust(); // The seek mode

      SetParameterTemplate(&format, handle, nParamIndex);
    }
      break;

    /*case OMX_IndexParamPortDefinition:
    {
      OMX_PARAM_PORTDEFINITIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      format.eDir = (OMX_DIRTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDir").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferCountActual = (int) Nan::To<int>(Nan::Get(param, Nan::New("nBufferCountActual").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferCountMin = (int) Nan::To<int>(Nan::Get(param, Nan::New("nBufferCountMin").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferSize = (int) Nan::To<int>(Nan::Get(param, Nan::New("nBufferSize").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bEnabled").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bPopulated = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bPopulated").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eDomain = (OMX_PORTDOMAINTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eDomain").ToLocalChecked()).ToLocalChecked()).FromJust();

      if (format.eDomain == OMX_PortDomainVideo) {
        v8::Local<v8::Object> video = Nan::To<v8::Object>(Nan::Get(param, Nan::New("video").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();

        format.format.video.nFrameWidth = (int) Nan::To<int>(Nan::Get(video, Nan::New("nFrameWidth").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nFrameHeight = (int) Nan::To<int>(Nan::Get(video, Nan::New("nFrameHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nStride = (int) Nan::To<int>(Nan::Get(video, Nan::New("nStride").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nSliceHeight = (int) Nan::To<int>(Nan::Get(video, Nan::New("nSliceHeight").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nBitrate = (int) Nan::To<int>(Nan::Get(video, Nan::New("nBitrate").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.xFramerate = (int) Nan::To<int>(Nan::Get(video, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.bFlagErrorConcealment = (OMX_BOOL) Nan::To<int>(Nan::Get(video, Nan::New("bFlagErrorConcealment").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(video, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(video, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      }

      format.bBuffersContiguous = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New("bBuffersContiguous").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferAlignment = (int) Nan::To<int>(Nan::Get(param, Nan::New("nBufferAlignment").ToLocalChecked()).ToLocalChecked()).FromJust();

//      printf("format.eDir: %d\n", format.eDir);
//      printf("format.nBufferCountActual: %d\n", format.nBufferCountActual);
//      printf("format.nBufferCountMin: %d\n", format.nBufferCountMin);
//      printf("format.nBufferSize: %d\n", format.nBufferSize);
//      printf("format.bEnabled: %d\n", format.bEnabled);
//      printf("format.bPopulated: %d\n", format.bPopulated);
//      printf("format.eDomain: %d\n", format.eDomain);
//      printf("format.bBuffersContiguous: %d\n", format.bBuffersContiguous);
//      printf("format.nBufferAlignment: %d\n", format.nBufferAlignment);

      SetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoPortFormat:
    {
      OMX_VIDEO_PARAM_PORTFORMATTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      format.nIndex = (int) Nan::To<int>(Nan::Get(param, Nan::New("nIndex").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eCompressionFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New("eColorFormat").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.xFramerate = (int) Nan::To<int>(Nan::Get(param, Nan::New("xFramerate").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;*/
    default:
      break;
  }
}
