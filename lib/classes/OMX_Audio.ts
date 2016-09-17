import omx = require('../../index')
export class AUDIO_PORTDEFINITIONTYPE {
  /**
   * < platform specific reference for an output device, otherwise this field is 0
   */
  pNativeRender;
  /**
   * Turns on error concealment if it is supported by the OMX component
   */
  bFlagErrorConcealment: boolean;
  /**
   * Type of data expected for this port (e.g. PCM, AMR, MP3, etc)
   */
  eEncoding: omx.AUDIO_CODINGTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_PORTFORMATTYPE {
  /**
   * Indicates the enumeration index for the format from 0x0 to N-1
   */
  nIndex: number;
  /**
   * Type of data expected for this port (e.g. PCM, AMR, MP3, etc)
   */
  eEncoding: omx.AUDIO_CODINGTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_PCMMODETYPE {
  /**
   * Number of channels (e.g. 2 for stereo)
   */
  nChannels: number;
  /**
   * indicates PCM data as signed or unsigned
   */
  eNumData: omx.NUMERICALDATATYPE;
  /**
   * indicates PCM data as little or big endian
   */
  eEndian: omx.ENDIANTYPE;
  /**
   * True for normal interleaved data; false for non-interleaved data (e.g. block data)
   */
  bInterleaved: boolean;
  /**
   * Bit per sample
   */
  nBitPerSample: number;
  /**
   * Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
   */
  nSamplingRate: number;
  /**
   * PCM mode enumeration
   */
  ePCMMode: omx.AUDIO_PCMMODETYPE;
  /**
   * Slot i contains channel defined by eChannelMap[i]
   */
  eChannelMapping: omx.AUDIO_CHANNELTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_MP3TYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * Bit rate of the input data. Use 0 for variable rate or unknown bit rates
   */
  nBitRate: number;
  /**
   * Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
   */
  nSampleRate: number;
  /**
   * Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
   */
  nAudioBandWidth: number;
  /**
   * Channel mode enumeration
   */
  eChannelMode: omx.AUDIO_CHANNELMODETYPE;
  /**
   * MP3 stream format
   */
  eFormat: omx.AUDIO_MP3STREAMFORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_DDPTYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * Bit rate of the input data. Use 0 for variable rate or unknown bit rates
   */
  nBitRate: number;
  /**
   * Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
   */
  nSampleRate: number;
  eBitStreamId: omx.AUDIO_DDPBITSTREAMID;
  eBitStreamMode: omx.AUDIO_DDPBITSTREAMMODE;
  eDolbySurroundMode: omx.AUDIO_DDPDOLBYSURROUNDMODE;
  /**
   * Slot i contains channel defined by eChannelMapping[i]
   */
  eChannelMapping: omx.AUDIO_CHANNELTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_DTSTYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * Bit rate of the input data. Use 0 for variable rate or unknown bit rates
   */
  nBitRate: number;
  /**
   * Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
   */
  nSampleRate: number;
  /**
   * DTS type 1, 2, or 3.
   */
  nDtsType: number;
  /**
   * DTS stream is either big/little endian and 16/14 bit packing
   */
  nFormat: number;
  /**
   * DTS frame size in bytes
   */
  nDtsFrameSizeBytes: number;
  /**
   * Slot i contains channel defined by eChannelMapping[i]
   */
  eChannelMapping: omx.AUDIO_CHANNELTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_AACPROFILETYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
   */
  nSampleRate: number;
  /**
   * Bit rate of the input data. Use 0 for variable rate or unknown bit rates
   */
  nBitRate: number;
  /**
   * Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
   */
  nAudioBandWidth: number;
  /**
   * Frame length (in audio samples per channel) of the codec. Can be 1024 or 960 (AAC-LC), 2048 (HE-AAC), 480 or 512 (AAC-LD). Use 0 to let encoder decide
   */
  nFrameLength: number;
  /**
   * AAC tool usage
   */
  nAACtools: number;
  /**
   * MPEG-4 AAC error resilience tool usage
   */
  nAACERtools: number;
  /**
   * AAC profile enumeration
   */
  eAACProfile: omx.AUDIO_AACPROFILETYPE;
  /**
   * AAC stream format enumeration
   */
  eAACStreamFormat: omx.AUDIO_AACSTREAMFORMATTYPE;
  /**
   * Channel mode enumeration
   */
  eChannelMode: omx.AUDIO_CHANNELMODETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_VORBISTYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * Bit rate of the encoded data data. Use 0 for variable rate or unknown bit rates. Encoding is set to the bitrate closest to specified value (in bps)
   */
  nBitRate: number;
  /**
   * Sets minimum bitrate (in bps).
   */
  nMinBitRate: number;
  /**
   * Sets maximum bitrate (in bps).
   */
  nMaxBitRate: number;
  /**
   * Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
   */
  nSampleRate: number;
  /**
   * Audio band width (in Hz) to which an encoder should limit the audio signal. Use 0 to let encoder decide
   */
  nAudioBandWidth: number;
  /**
   * Sets encoding quality to n, between -1 (low) and 10 (high). In the default mode of operation, teh quality level is 3. Normal quality range is 0 - 10.
   */
  nQuality: number;
  /**
   * Set bitrate management mode. This turns off the normal VBR encoding, but allows hard or soft bitrate constraints to be enforced by the encoder. This mode can be slower, and may also be lower quality. It is primarily useful for streaming.
   */
  bManaged: boolean;
  /**
   * Downmix input from stereo to mono (has no effect on non-stereo streams). Useful for lower-bitrate encoding.
   */
  bDownmix: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_WMATYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * Bit rate of the input data. Use 0 for variable rate or unknown bit rates
   */
  nBitRate: number;
  /**
   * Version of WMA stream / data
   */
  eFormat: omx.AUDIO_WMAFORMATTYPE;
  /**
   * Profile of WMA stream / data
   */
  eProfile: omx.AUDIO_WMAPROFILETYPE;
  /**
   * Sampling rate of the source data
   */
  nSamplingRate: number;
  /**
   * is the block alignment, or block size, in bytes of the audio codec
   */
  nBlockAlign: number;
  /**
   * WMA Type-specific data
   */
  nEncodeOptions: number;
  /**
   * WMA Type-specific data
   */
  nSuperBlockAlign: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_RATYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * is the sampling rate of the source data
   */
  nSamplingRate: number;
  /**
   * is the value for bits per frame
   */
  nBitsPerFrame: number;
  /**
   * is the value for samples per frame
   */
  nSamplePerFrame: number;
  /**
   * is the number of coupling quantization bits in the stream
   */
  nCouplingQuantBits: number;
  /**
   * is the coupling start region in the stream
   */
  nCouplingStartRegion: number;
  /**
   * is the number of regions value
   */
  nNumRegions: number;
  /**
   * is the RealAudio audio format
   */
  eFormat: omx.AUDIO_RAFORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_SBCTYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * Bit rate of the input data. Use 0 for variable rate or unknown bit rates
   */
  nBitRate: number;
  /**
   * Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
   */
  nSampleRate: number;
  /**
   * Number of blocks
   */
  nBlocks: number;
  /**
   * Number of subbands
   */
  nSubbands: number;
  /**
   * Bitpool value
   */
  nBitPool: number;
  /**
   * Use bitrate value instead of bitpool
   */
  bEnableBitrate: boolean;
  /**
   * Channel mode enumeration
   */
  eChannelMode: omx.AUDIO_CHANNELMODETYPE;
  /**
   * SBC Allocation method type
   */
  eSBCAllocType: omx.AUDIO_SBCALLOCMETHODTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_ADPCMTYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Number of bits in each sample
   */
  nBitsPerSample: number;
  /**
   * Sampling rate of the source data. Use 0 for variable or unknown sampling rate.
   */
  nSampleRate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_G723TYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * todo: Should this be moved to a config?
   */
  eBitRate: omx.AUDIO_G723RATE;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  /**
   * Enable Post Filter
   */
  bPostFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_G726TYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  eG726Mode: omx.AUDIO_G726MODE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_G729TYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  eBitType: omx.AUDIO_G729TYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_AMRTYPE {
  /**
   * Number of channels
   */
  nChannels: number;
  /**
   * Bit rate read only field
   */
  nBitRate: number;
  /**
   * AMR Band Mode enumeration
   */
  eAMRBandMode: omx.AUDIO_AMRBANDMODETYPE;
  /**
   * AMR DTX Mode enumeration
   */
  eAMRDTXMode: omx.AUDIO_AMRDTXMODETYPE;
  /**
   * AMR frame format enumeration
   */
  eAMRFrameFormat: omx.AUDIO_AMRFRAMEFORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_GSMFRTYPE {
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_GSMHRTYPE {
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_GSMEFRTYPE {
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_TDMAFRTYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_TDMAEFRTYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_PDCFRTYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_PDCEFRTYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_PDCHRTYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Enable Discontinuous Transmisssion
   */
  bDTX: boolean;
  /**
   * Enable High Pass Filter
   */
  bHiPassFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_QCELP8TYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Bit rate of the input data. Use 0 for variable rate or unknown bit rates
   */
  nBitRate: number;
  /**
   * Frame rate
   */
  eCDMARate: omx.AUDIO_CDMARATETYPE;
  /**
   * minmal rate for the encoder = 1,2,3,4, default = 1
   */
  nMinBitRate: number;
  /**
   * maximal rate for the encoder = 1,2,3,4, default = 4
   */
  nMaxBitRate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_QCELP13TYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Frame rate
   */
  eCDMARate: omx.AUDIO_CDMARATETYPE;
  /**
   * minmal rate for the encoder = 1,2,3,4, default = 1
   */
  nMinBitRate: number;
  /**
   * maximal rate for the encoder = 1,2,3,4, default = 4
   */
  nMaxBitRate: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_EVRCTYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * actual Frame rate
   */
  eCDMARate: omx.AUDIO_CDMARATETYPE;
  /**
   * RATE_REDUCtion is requested for this frame
   */
  bRATE_REDUCon: boolean;
  /**
   * minmal rate for the encoder = 1,2,3,4, default = 1
   */
  nMinBitRate: number;
  /**
   * maximal rate for the encoder = 1,2,3,4, default = 4
   */
  nMaxBitRate: number;
  /**
   * Enable encoder's High Pass Filter
   */
  bHiPassFilter: boolean;
  /**
   * Enable encoder's noise suppressor pre-processing
   */
  bNoiseSuppressor: boolean;
  /**
   * Enable decoder's post Filter
   */
  bPostFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_SMVTYPE {
  /**
   * Number of channels in the data stream (not necessarily the same as the number of channels to be rendered.
   */
  nChannels: number;
  /**
   * Frame rate
   */
  eCDMARate: omx.AUDIO_CDMARATETYPE;
  /**
   * RATE_REDUCtion is requested for this frame
   */
  bRATE_REDUCon: boolean;
  /**
   * minmal rate for the encoder = 1,2,3,4, default = 1 ??
   */
  nMinBitRate: number;
  /**
   * maximal rate for the encoder = 1,2,3,4, default = 4 ??
   */
  nMaxBitRate: number;
  /**
   * Enable encoder's High Pass Filter ??
   */
  bHiPassFilter: boolean;
  /**
   * Enable encoder's noise suppressor pre-processing
   */
  bNoiseSuppressor: boolean;
  /**
   * Enable decoder's post Filter ??
   */
  bPostFilter: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_MIDITYPE {
  /**
   * size of the MIDI file in bytes, where the entire MIDI file passed in, otherwise if 0x0, the MIDI data is merged and streamed (instead of passed as an entire MIDI file)
   */
  nFileSize: number;
  /**
   * Specifies the maximum simultaneous polyphonic voices. A value of zero indicates that the default polyphony of the device is used
   */
  sMaxPolyphony: omx.BU32;
  /**
   * Whether to load default sound bank at initialization
   */
  bLoadDefaultSound: boolean;
  /**
   * Version of the MIDI file
   */
  eMidiFormat: omx.AUDIO_MIDIFORMATTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_PARAM_MIDILOADUSERSOUNDTYPE {
  /**
   * DLS file index to be loaded
   */
  nDLSIndex: number;
  /**
   * Size in bytes
   */
  nDLSSize: number;
  /**
   * Midi sound bank type enumeration
   */
  eMidiSoundBank: omx.AUDIO_MIDISOUNDBANKTYPE;
  /**
   * Midi sound bank layout enumeration
   */
  eMidiSoundBankLayout: omx.AUDIO_MIDISOUNDBANKLAYOUTTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_MIDIIMMEDIATEEVENTTYPE {
  /**
   * Size of immediate MIDI events or MIP message in bytes
   */
  nMidiEventSize: number;
  /**
   * MIDI event array to be rendered immediately, or an array for the MIP message buffer, where the size is indicated by nMidiEventSize
   */
  nMidiEvents: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_MIDISOUNDBANKPROGRAMTYPE {
  /**
   * Valid channel values range from 1 to 16
   */
  nChannel: number;
  /**
   * Valid program ID range is 1 to 128
   */
  nIDProgram: number;
  /**
   * Sound bank ID
   */
  nIDSoundBank: number;
  /**
   * User soundbank index, easier to access soundbanks by index if multiple banks are present
   */
  nUserSoundBankIndex: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_MIDICONTROLTYPE {
  /**
   * Pitch transposition in semitones, stored as Q22.10 format based on JAVA MMAPI (JSR-135) requirement
   */
  sPitchTransposition: omx.BS32;
  /**
   * Relative playback rate, stored as Q14.17 fixed-point number based on JSR-135 requirement
   */
  sPlayBackRate: omx.BU32;
  /**
   * Tempo in beats per minute (BPM), stored as Q22.10 fixed-point number based on JSR-135 requirement
   */
  sTempo: omx.BU32;
  /**
   * Specifies the maximum simultaneous polyphonic voices. A value of zero indicates that the default polyphony of the device is used
   */
  nMaxPolyphony: number;
  /**
   * Number of times to repeat playback
   */
  nNumRepeat: number;
  /**
   * Time in milliseconds to indicate when playback will stop automatically. Set to zero if not used
   */
  nStopTime: number;
  /**
   * 16 bit mask for channel mute status
   */
  nChannelMuteMask: number;
  /**
   * 16 bit mask for channel solo status
   */
  nChannelSoloMask: number;
  /**
   * 32 bit mask for track mute status. Note: This is for tracks 0-31
   */
  nTrack0031MuteMask: number;
  /**
   * 32 bit mask for track mute status. Note: This is for tracks 32-63
   */
  nTrack3263MuteMask: number;
  /**
   * 32 bit mask for track solo status. Note: This is for tracks 0-31
   */
  nTrack0031SoloMask: number;
  /**
   * 32 bit mask for track solo status. Note: This is for tracks 32-63
   */
  nTrack3263SoloMask: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_MIDISTATUSTYPE {
  /**
   * Number of MIDI tracks in the file, read only field. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
   */
  nNumTracks: number;
  /**
   * The length of the currently open MIDI resource in milliseconds. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
   */
  nDuration: number;
  /**
   * Current Position of the MIDI resource being played in milliseconds
   */
  nPosition: number;
  /**
   * Does Vibra track exist? NOTE: May not return a meaningful value until the entire file is parsed and buffered.
   */
  bVibra: boolean;
  /**
   * Total number of MIDI Meta Events in the currently open MIDI resource. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
   */
  nNumMetaEvents: number;
  /**
   * Number of active voices in the currently playing MIDI resource. NOTE: May not return a meaningful value until the entire file is parsed and buffered.
   */
  nNumActiveVoices: number;
  /**
   * MIDI playback state enumeration, read only field
   */
  eMIDIPlayBackState: omx.AUDIO_MIDIPLAYBACKSTATETYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_MIDIMETAEVENTTYPE {
  /**
   * Index of Meta Event
   */
  nIndex: number;
  /**
   * Meta Event Type, 7bits (i.e. 0 - 127)
   */
  nMetaEventType: number;
  /**
   * size of the Meta Event in bytes
   */
  nMetaEventSize: number;
  /**
   * track number for the meta event
   */
  nTrack: number;
  /**
   * Position of the meta-event in milliseconds
   */
  nPosition: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_MIDIMETAEVENTDATATYPE {
  /**
   * Index of Meta Event
   */
  nIndex: number;
  /**
   * size of the Meta Event in bytes
   */
  nMetaEventSize: number;
  /**
   * array of one or more bytes of meta data as indicated by the nMetaEventSize field
   */
  nData: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_VOLUMETYPE {
  /**
   * Is the volume to be set in linear (0.100) or logarithmic scale (mB)
   */
  bLinear: boolean;
  /**
   * Volume linear setting in the 0..100 range, OR Volume logarithmic setting for this port. The values for volume are in mB (millibels = 1/100 dB) relative to a gain of 1 (e.g. the output is the same as the input level). Values are in mB from nMax (maximum volume) to nMin mB (typically negative). Since the volume is "voltage" and not a "power", it takes a setting of -600 mB to decrease the volume by 1/2. If a component cannot accurately set the volume to the requested value, it must set the volume to the closest value BELOW the requested value. When getting the volume setting, the current actual volume must be returned.
   */
  sVolume: omx.BS32;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_CHANNELVOLUMETYPE {
  /**
   * channel to select from 0 to N-1, using OMX_ALL to apply volume settings to all channels
   */
  nChannel: number;
  /**
   * Is the volume to be set in linear (0.100) or logarithmic scale (mB)
   */
  bLinear: boolean;
  /**
   * Volume linear setting in the 0..100 range, OR Volume logarithmic setting for this port. The values for volume are in mB (millibels = 1/100 dB) relative to a gain of 1 (e.g. the output is the same as the input level). Values are in mB from nMax (maximum volume) to nMin mB (typically negative). Since the volume is "voltage" and not a "power", it takes a setting of -600 mB to decrease the volume by 1/2. If a component cannot accurately set the volume to the requested value, it must set the volume to the closest value BELOW the requested value. When getting the volume setting, the current actual volume must be returned.
   */
  sVolume: omx.BS32;
  /**
   * TRUE if nChannel refers to a MIDI channel, FALSE otherwise
   */
  bIsMIDI: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_BALANCETYPE {
  /**
   * balance setting for this port (-100 to 100, where -100 indicates all left, and no right
   */
  nBalance: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_MUTETYPE {
  /**
   * Mute setting for this port
   */
  bMute: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_CHANNELMUTETYPE {
  /**
   * channel to select from 0 to N-1, using OMX_ALL to apply mute settings to all channels
   */
  nChannel: number;
  /**
   * Mute setting for this channel
   */
  bMute: boolean;
  /**
   * TRUE if nChannel refers to a MIDI channel, FALSE otherwise
   */
  bIsMIDI: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_LOUDNESSTYPE {
  /**
   * Enable/disable for loudness
   */
  bLoudness: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_BASSTYPE {
  /**
   * Enable/disable for bass control
   */
  bEnable: boolean;
  /**
   * bass setting for the port, as a continuous value from -100 to 100 (0 means no change in bass level)
   */
  nBass: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_TREBLETYPE {
  /**
   * Enable/disable for treble control
   */
  bEnable: boolean;
  /**
   * treble setting for the port, as a continuous value from -100 to 100 (0 means no change in treble level)
   */
  nTreble: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_EQUALIZERTYPE {
  /**
   * Enable/disable for equalizer
   */
  bEnable: boolean;
  /**
   * Band number to be set. Upper Limit is N-1, where N is the number of bands, lower limit is 0
   */
  sBandIndex: omx.BU32;
  /**
   * Center frequecies in Hz. This is a read only element and is used to determine the lower, center and upper frequency of this band.
   */
  sCenterFreq: omx.BU32;
  /**
   * band level in millibels
   */
  sBandLevel: omx.BS32;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_STEREOWIDENINGTYPE {
  /**
   * Enable/disable for stereo widening control
   */
  bEnable: boolean;
  /**
   * Stereo widening algorithm type
   */
  eWideningType: omx.AUDIO_STEREOWIDENINGTYPE;
  /**
   * stereo widening setting for the port, as a continuous value from 0 to 100
   */
  nStereoWidening: number;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_CHORUSTYPE {
  /**
   * Enable/disable for chorus
   */
  bEnable: boolean;
  /**
   * average delay in milliseconds
   */
  sDelay: omx.BU32;
  /**
   * rate of modulation in millihertz
   */
  sModulationRate: omx.BU32;
  /**
   * depth of modulation as a percentage of delay (i.e. 0 to 100)
   */
  nModulationDepth: number;
  /**
   * Feedback from chorus output to input in percentage
   */
  nFeedback: omx.BU32;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_REVERBERATIONTYPE {
  /**
   * Enable/disable for reverberation control
   */
  bEnable: boolean;
  /**
   * Intensity level for the whole room effect (i.e. both early reflections and late reverberation) in millibels
   */
  sRoomLevel: omx.BS32;
  /**
   * Attenuation at high frequencies relative to the intensity at low frequencies in millibels
   */
  sRoomHighFreqLevel: omx.BS32;
  /**
   * Intensity level of early reflections (relative to room value), in millibels
   */
  sReflectionsLevel: omx.BS32;
  /**
   * Delay time of the first reflection relative to the direct path, in milliseconds
   */
  sReflectionsDelay: omx.BU32;
  /**
   * Intensity level of late reverberation relative to room level, in millibels
   */
  sReverbLevel: omx.BS32;
  /**
   * Time delay from the first early reflection to the beginning of the late reverberation section, in milliseconds
   */
  sReverbDelay: omx.BU32;
  /**
   * Late reverberation decay time at low frequencies, in milliseconds
   */
  sDecayTime: omx.BU32;
  /**
   * Ratio of high frequency decay time relative to low frequency decay time in percent
   */
  nDecayHighFreqRatio: omx.BU32;
  /**
   * Modal density in the late reverberation decay, in percent (i.e. 0 - 100)
   */
  nDensity: number;
  /**
   * Echo density in the late reverberation decay, in percent (i.e. 0 - 100)
   */
  nDiffusion: number;
  /**
   * Reference high frequency in Hertz. This is the frequency used as the reference for all the high-frequency settings above
   */
  sReferenceHighFreq: omx.BU32;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_ECHOCANCELATIONTYPE {
  /**
   * Echo cancelation settings
   */
  eEchoCancelation: omx.AUDIO_ECHOCANTYPE;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
export class AUDIO_CONFIG_NOISEREDUCTIONTYPE {
  /**
   * Enable/disable for noise reduction
   */
  bNoiseReduction: boolean;
  constructor(p?: any) {
    if (p) {
      Object.assign(this, p);
    }
  }
}
