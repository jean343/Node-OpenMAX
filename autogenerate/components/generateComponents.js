// TODO check: https://jan.newmarch.name/RPi/OpenMAX/Components/

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

    var filePath = '../../lib/components/' + nameCamel + '.ts';
    var oldFileContent = fs.readFileSync(filePath).toString();

    var data = template(oldFileContent, name, nameCamel, getArray(inPorts), getArray(outPorts));

    fs.writeFileSync(filePath, data);

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

function template(oldFileContent, name, nameCamel, inPorts, outPorts) {

  var inPort = inPorts[0] || '0';
  var outPort = outPorts[0] || '0';

  if (name === 'camera') {
    outPort = outPorts[1] || '0';
  }

  var re = /--------([\s\S]*?)\/\/ ----/;
  var match = oldFileContent.match(re);
  var customCode = match[1];

  return "// This file is auto-generated from 'node generateComponents.js' \n\
\n\
import omx = require('../../')\n\
\n\
export class " + nameCamel + " extends omx.Component {\n\
  constructor(name?: string) {\n\
    super('" + name + "', name);\n\
    this.setPorts(" + inPort + ", " + outPort + ");\n\
  }\n\
\n\
  // ---- Text can be edited below this line --------\n\
  " + customCode.trim() + "\n\
  // ---- Text can be edited above this line --------\n\
}";
}