var request = require('request');
var cheerio = require('cheerio');
var upperCamelCase = require('uppercamelcase');
var fs = require('fs');
var path = require('path');
var glob = require("glob");

var url = 'http://home.nouwen.name/RaspberryPi/documentation/ilcomponents/index.html';
request(url, function (err, resp, body) {
  var $ = cheerio.load(body);
  var tables = $('table[cellspacing=0][cellpadding=2]');
  tables.each(function () {
    var tr = this.children[0];

    function getArray(obj) {
      return $(obj).text().trim().split(/[\s,]+/);
    }

    var a = tr.children[1];
    var b = tr.children[3];
    var c = tr.children[5];
    var inPorts, name, outPorts;
    if (!isNaN(getArray(a)[0])) {
      inPorts = a;
      name = $(b).text().trim();
      outPorts = c;
    } else {
      name = $(a).text().trim();
      outPorts = b;
    }
    var nameCamel = upperCamelCase(name);

    console.log(getArray(inPorts).join(), nameCamel, getArray(outPorts).join());

    var data = template(name, nameCamel, getArray(inPorts), getArray(outPorts));

    fs.writeFileSync('../../lib/components/' + nameCamel + '.ts', data);

  });
});

glob("../../lib/**/*.ts", function (er, files) {

  var index = "";

  files = files.sort(function (a, b) {
    var aFlags = a.indexOf('/flags/') > -1;
    var bFlags = b.indexOf('/flags/') > -1;

    if (aFlags && !bFlags) {
      return -1;
    }

    if (!aFlags && bFlags) {
      return 1;
    }

    return a > b ? 1 : -1;
  });

  console.log(files);
  for (var k in files) {
    var file = path.basename(files[k], '.ts');
    if (file === 'utils')
      continue;
    index += "export * from \"" + path.dirname(files[k].slice(4)) + '/' + file + "\"\n";
  }
  console.log(index);
  fs.writeFileSync('../../index.ts', index);
});

function template(name, nameCamel, inPorts, outPorts) {

  var inPort = inPorts[0] || '0';
  var outPort = outPorts[0] || '0';

  var flags = ['omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS'];
  if (inPort != 0) {
    flags.push('omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS');
  }
  if (outPort != 0) {
    flags.push('omx.ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS');
  }

  var proto = prototypes(nameCamel);
  var protoText = '';

  for (var p in proto) {
    if (proto.hasOwnProperty(p)) {
      protoText += p + proto[p];
    }
  }

  return "//This file is auto-generated from 'node headerGeneration/generateComponents.js' \n\
\n\
import util = require('util')\n\
import omx = require('../../')\n\
\n\
export class " + nameCamel + " extends omx.Component {\n\
  constructor() {\n\
    super('" + name + "');\n\
    var self = this;\n\
    this.init(" + flags.join(' | ') + ");\n\
    this.component.setPorts(" + inPort + ", " + outPort + ");\n\
  }\n\
  \n\
  " + protoText + "\n\
}";
}

function prototypes(nameCamel) {
  switch (nameCamel) {
    case 'VideoDecode':
      return {
        setVideoPortFormat: " (eCompressionFormat: omx.OMX_VIDEO_CODINGTYPE) {\n\
    var format = this.component.getParameter(this.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);\n\
    format.eCompressionFormat = eCompressionFormat;\n\
    this.component.setParameter(this.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);\n\
  };"
      };
      break;
    case 'VideoEncode':
      return {
        setVideoPortFormat: " (eCompressionFormat: omx.OMX_VIDEO_CODINGTYPE) {\n\
    var format = {\n\
      eCompressionFormat: eCompressionFormat\n\
    };\n\
    this.component.setParameter(this.component.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);\n\
  };"
      };
    case 'ImageDecode':
      return {
        setInputFormat: " (eCompressionFormat: omx.OMX_IMAGE_CODINGTYPE) {\n\
    var format = this.component.getParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat);\n\
    format.eCompressionFormat = eCompressionFormat;\n\
    this.component.setParameter(this.component.in_port, omx.OMX_INDEXTYPE.OMX_IndexParamImagePortFormat, format);\n\
  };"
      };
    case 'ImageEncode':
      return {
        setInputFormat: " (eCompressionFormat: omx.OMX_IMAGE_CODINGTYPE) {\n\
    var format = this.component.getParameter(this.component.out_port, OMX_INDEXTYPE.OMX_IndexParamImagePortFormat);\n\
    format.eCompressionFormat = eCompressionFormat;\n\
    this.component.setParameter(this.component.out_port, omx.OMX_INDEXTYPE.OMX_IndexParamImagePortFormat, format);\n\
  };"
      };
      break;
  }
}
