cmake_minimum_required(VERSION 2.8)
project( simple )

include_directories("/opt/vc/include/interface/vcos/pthreads/;/opt/vc/include/interface/vmcs_host/linux")
add_definitions(-DOMX -DOMX_SKIP64BIT)

add_executable( simple main.cpp VideoDecoder.cpp Component.cpp )
include_directories(/opt/vc/include /opt/vc/src/hello_pi/libs/ilclient/)

target_link_libraries( simple X11 pthread /opt/vc/src/hello_pi/libs/ilclient/libilclient.a /opt/vc/lib/libbcm_host.so /opt/vc/lib/libopenmaxil.so /opt/vc/lib/libvcos.so  /opt/vc/lib/libGLESv2.so /opt/vc/lib/libEGL.so )