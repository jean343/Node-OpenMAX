
console.log('a');

var myaddon = require("./build/Release/Node_OMX.node");

(function () {
  myaddon.bcm_host_init();
  var ILCLIENT = myaddon.ILCLIENT();
})();

global.gc();

console.log('b');