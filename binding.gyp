{
  "targets": [
    {
      "target_name": "Node_OMX",
      "sources": [
        "src/main.cpp",
        "src/init.cpp",
        "src/BUFFERHEADERTYPE.cpp",
        "src/ParametersGet.cpp",
        "src/ParametersSet.cpp",
        "src/COMPONENTTYPE.cpp",
        "src/CopyAsync.cpp",
        "src/Graphics.cpp",
        "src/GfxTexture.cpp",
        "src/EglImage.cpp",
        "src/GfxProgram.cpp",
        "src/GfxShader.cpp"
      ],
      "defines": [
        "OMX",
        "OMX_SKIP64BIT"
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "/opt/vc/include",
        "/opt/vc/include/interface/vcos/pthreads",
        "/opt/vc/include/interface/vmcs_host/linux"
      ],
      "link_settings": {
        "library_dirs": [
          "/opt/vc/lib"
        ],
        "libraries": [
          "-lopenmaxil",
          "-lbcm_host",
          "-lvcos",
          "-lpthread"
        ]
      },
    }
  ]
}