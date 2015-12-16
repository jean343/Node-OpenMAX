var request = require('request');
var cheerio = require('cheerio');
var upperCamelCase = require('uppercamelcase');
var fs = require('fs');

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

    fs.writeFileSync('../lib/' + nameCamel + '.js', data);

  });
});

fs.readdir('../lib', function (err, items) {
  console.log(items);

  var index = "'use strict'; \n\
module.exports = {\n";

  for (var k in items) {
    var file = items[k].slice(0, -3);
    if (file === 'utils')
      continue;
    index += "  " + file + ": require('./lib/" + file + "'),\n";
  }
  index = index.slice(0, -2);// Remove the last comma
  index += "\n};";
  fs.writeFileSync('../index.js', index);
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
var Component = require('./Component');\n\
var ILCLIENT_CREATE_FLAGS = require('./ILCLIENT_CREATE_FLAGS');\n\
var OMX_STATETYPE = require('./OMX_STATETYPE');\n\
var OMX_INDEXTYPE = require('./OMX_INDEXTYPE');\n\
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
  }
}