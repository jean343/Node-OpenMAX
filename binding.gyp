{
  "targets": [
    {
      "target_name": "hello",
      "sources": [ "main.cpp" ],
      "include_dirs" : [
          "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}