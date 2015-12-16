module.exports = {
  OMX_StateInvalid: 0, // component has detected that it's internal data structures are corrupted to the point that it cannot determine it's state properly
  OMX_StateLoaded: 1, // component has been loaded but has not completed initialization. The OMX_SetParameter macro and the OMX_GetParameter macro are the only valid macros allowed to be sent to the component in this state.
  OMX_StateIdle: 2, // component initialization has been completed successfully and the component is ready to to start.
  OMX_StateExecuting: 3, // component has accepted the start command and is processing data (if data is available)
  OMX_StatePause: 4, // component has received pause command
  OMX_StateWaitForResources: 5, // component is waiting for resources, either after preemption or before it gets the resources requested. See specification for complete details.
  OMX_StateMax: 0X7FFFFFFF
};