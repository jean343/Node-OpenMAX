{
  "targets": [
    {
      "target_name": "hello",
      "sources": [
        "main.cpp",
        "sleepAsync.cpp"
      ],
      "include_dirs" : [
          "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}