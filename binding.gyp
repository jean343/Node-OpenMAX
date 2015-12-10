{
  "targets": [
    {
      "target_name": "Node_OMX",
      "sources": [
        "main.cpp",
        "init.cpp",
        "sleepAsync.cpp",

        "test/VideoDecoder.cpp",
        "test/Component.cpp"
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