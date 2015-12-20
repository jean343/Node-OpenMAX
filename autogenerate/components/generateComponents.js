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

    fs.writeFileSync('../../lib/components/' + nameCamel + '.js', data);

  });
});

glob("../../lib/**/*.js", function (er, files) {

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
    var file = path.basename(files[k], '.js');
    if (file === 'utils')
      continue;
    index += "module.exports." + file + " = require('" + path.dirname(files[k].slice(4)) + '/' + file + "');\n";
  }
  console.log(index);
  fs.writeFileSync('../../index.js', index);
});

function template(name, nameCamel, inPorts, outPorts) {

  var inPort = inPorts[0] || '0';
  var outPort = outPorts[0] || '0';

  var flags = ['ILCLIENT_CREATE_FLAGS.ILCLIENT_DISABLE_ALL_PORTS'];
  if (inPort != 0) {
    flags.push('ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_INPUT_BUFFERS');
  }
  if (outPort != 0) {
    flags.push('ILCLIENT_CREATE_FLAGS.ILCLIENT_ENABLE_OUTPUT_BUFFERS');
  }

  var proto = prototypes(nameCamel);
  var protoText = '';

  for (var p in proto) {
    if (proto.hasOwnProperty(p)) {
      protoText += nameCamel + ".prototype." + p + " = " + proto[p];
    }
  }

  return "//This file is auto-generated from 'node headerGeneration/generateComponents.js' \n\
\n\
var omx = require('../../');\n\
var Component = omx.Component;\n\
var ILCLIENT_CREATE_FLAGS = omx.ILCLIENT_CREATE_FLAGS;\n\
var OMX_STATETYPE = omx.Core.OMX_STATETYPE;\n\
var OMX_INDEXTYPE = omx.Index.OMX_INDEXTYPE;\n\
\n\
function " + nameCamel + "() {\n\
  if (!(this instanceof " + nameCamel + ")) {\n\
    return new " + nameCamel + "();\n\
  }\n\
  var self = this;\n\
  this.init(" + flags.join(' | ') + ");\n\
  this.component.setPorts(" + inPort + ", " + outPort + ");\n\
\n\
  self.on('finish', function () {\n\
    console.log('" + nameCamel + " on finish');\n\
    self.component.emptyBuffer(undefined, function () {\n\
      self.component.changeState(OMX_STATETYPE.OMX_StateIdle);\n\
      self.component.changeState(OMX_STATETYPE.OMX_StateLoaded);\n\
    });\n\
  });\n\
}\n\
\n\
" + nameCamel + ".prototype = new Component('" + name + "');\n\
\n\
" + protoText + "\n\
\n\
module.exports = " + nameCamel + ";\n";
}

function prototypes(nameCamel) {
  switch (nameCamel) {
    case 'VideoDecode':
      return {
        setVideoPortFormat: "function (eCompressionFormat) {\n\
          var format = this.component.getParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat);\n\
          format.eCompressionFormat = eCompressionFormat;\n\
          this.component.setParameter(this.component.in_port, OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);\n\
        };"
      };
      break;
    case 'VideoEncode':
      return {
        setVideoPortFormat: "function (eCompressionFormat) {\n\
          var format = {\n\
            eCompressionFormat: eCompressionFormat\n\
          };\n\
          this.component.setParameter(this.component.out_port, OMX_INDEXTYPE.OMX_IndexParamVideoPortFormat, format);\n\
        };"
      };
      break;
  }
}