{
  "targets": [
    {
      "target_name": "Node_OMX",
      "sources": [
        "src/main.cpp",
        "src/init.cpp",
        "src/ILCLIENT.cpp",
        "src/COMPONENT.cpp",
        "src/TUNNEL.cpp",
        "src/BUFFERHEADERTYPE.cpp",
        "src/ParametersGet.cpp",
        "src/ParametersSet.cpp",
        "src/COMPONENTTYPE.cpp"
      ],
      "defines": [
        "OMX",
        "OMX_SKIP64BIT"
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "/opt/vc/include",
        "/opt/vc/include/interface/vcos/pthreads",
        "/opt/vc/include/interface/vmcs_host/linux",
        "/opt/vc/src/hello_pi/libs/ilclient/"
      ],
      "link_settings": {
        "library_dirs": [
          "/opt/vc/lib"
        ],
        "libraries": [
          "-lopenmaxil",
          "-lbcm_host",
          "-lvcos",
          "-lpthread",
          "/opt/vc/src/hello_pi/libs/ilclient/libilclient.a"
        ]
      },
    }
  ]
}