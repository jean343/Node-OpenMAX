export enum ILCLIENT_CREATE_FLAGS {
  ILCLIENT_FLAGS_NONE = 0x0, // Used if no flags are set.
  ILCLIENT_ENABLE_INPUT_BUFFERS = 0x1, //If set we allow the client to communicate with input ports via buffer communication, rather than tunneling with another component.
  ILCLIENT_ENABLE_OUTPUT_BUFFERS = 0x2, // If set we allow the  client to communicate with output ports via buffer communication, rather than tunneling with another component.
  ILCLIENT_DISABLE_ALL_PORTS = 0x4, // If set we disable all ports on creation.
  ILCLIENT_HOST_COMPONENT = 0x8, // Create a host component. The default host ilcore only can create host components by being locally hosted so should only be used for testing purposes.
  ILCLIENT_OUTPUT_ZERO_BUFFERS = 0x10 // All output ports will have nBufferCountActual set to zero, if supported by the component.
}
