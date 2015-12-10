var async = require("async");

var myaddon = require("./build/Release/Node_OMX.node");

var Parent = new myaddon.Parent();

Parent.setValue(42);
console.log(Parent.getValue());




myaddon.bcm_host_init();

console.log(myaddon.hello("test/test.h264"));

myaddon.bcm_host_deinit();


//try {
//
//  var obj = new myaddon.MyObject(0);
//  console.log('obj', obj);
//  console.log(obj.plusOne());
//  console.log(obj.plusOne());
//  console.log(obj.plusOne());
//
//  console.log('t');
//  var obj2 = myaddon.MyObject();
//  console.log('obj2', obj2);
//  console.log(obj2.plusOne());
//  console.log(obj2.plusOne());
//  console.log(obj2.plusOne());
//
//} catch (e) {
//  console.error(e, e.stack);
//}
//
////console.time("sleepSync");
////myaddon.MyObject().sleepSync(1);
////console.timeEnd("sleepSync");
////
////console.time("sleep");
////console.time("sleep done");
////myaddon.MyObject().sleep(1, function () {
////  console.timeEnd("sleep done");
////});
////console.timeEnd("sleep");
//
//var arr = [];
//for (var i = 0; i < 8; i++) {
//  arr.push(i);
//}
//
//console.time("sleep");
//console.time("call");
//async.each(arr, function (item, callback) {
//  myaddon.MyObject().sleep(1, callback);
//}, function () {
//  console.timeEnd("sleep");
//});
//console.timeEnd("call");