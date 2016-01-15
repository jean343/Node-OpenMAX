import omx = require('../../');

describe("Component", function() {

  it("should create component", function() {
    new omx.VideoDecode();
  });

  it("should fully init", function(done) {
    var vd = new omx.VideoDecode();
    vd.init().then(done);
  });

  it("should load and be in idle state", function(done) {
    var vd = new omx.VideoDecode();
    vd.init()
      .then(function() {
        expect(vd.getState()).toEqual(omx.OMX_STATETYPE.OMX_StateIdle);
        done();
      })
      .catch(console.log.bind(console));
  });

  it("should change to executing state", function(done) {
    var vd = new omx.VideoDecode();
    vd.init()
      .then(function() {
        return vd.changeState(omx.OMX_STATETYPE.OMX_StateExecuting);
      })
      .then(function() {
        expect(vd.getState()).toEqual(omx.OMX_STATETYPE.OMX_StateExecuting);
        done();
      })
      .catch(console.log.bind(console));
  });

  it("should return on same state change", function(done) {
    var vd = new omx.VideoDecode();
    vd.init()
      .then(function() {
        return vd.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
      })
      .then(function() {
        return vd.changeState(omx.OMX_STATETYPE.OMX_StateIdle);
      })
      .then(done)
      .catch(console.log.bind(console));
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
      .catch(done);
  });

});
