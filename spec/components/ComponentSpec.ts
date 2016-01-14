import omx = require('../../');

describe("Component", function() {

  xit("should create component", function() {
    new omx.VideoDecode();
  });

  xit("should fully init", function(done) {
    var vd = new omx.VideoDecode();
    vd.init().then(done);
  });

  xit("should load and be in idle state", function(done) {
    var vd = new omx.VideoDecode();
    vd.init().then(function() {
      expect(vd.getState()).toEqual(omx.OMX_STATETYPE.OMX_StateIdle);
      done();
    });
  });

  xit("should change to executing state", function(done) {
    var vd = new omx.VideoDecode();
    vd.init()
      .then(function() {
        return vd.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
      })
      .then(function() {
        expect(vd.getState()).toEqual(omx.OMX_STATETYPE.OMX_StateExecuting);
        done();
      });
  });

  xit("should return on same state change", function(done) {
    var vd = new omx.VideoDecode();
    vd.init()
      .then(function() {
        return vd.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
      })
      .then(function() {
        return vd.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
      })
      .then(function() {
        done();
      });
  });

  it("should return on wrong state change", function(done) {
    var vd = new omx.VideoDecode();
    vd.init()
      .then(function() {
        return vd.changeState(omx.OMX_STATETYPE.OMX_StateLoaded);
      })
      .then(function() {
        return vd.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
      })
      .then(function(){
        console.log('fulfill1');
      }, function(){
        console.log('fulfill2');
      });
  });

});
