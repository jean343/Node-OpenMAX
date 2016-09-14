import omx = require('../../index');

describe("Camera", function() {
  var Camera: omx.Camera;
  var Clock: omx.Clock;
  var VideoRender: omx.VideoRender;
  var pipeline;
  var t = (d, time?: number) => { setTimeout(d, time || 200) };

  beforeAll(function(done) {
    Camera = new omx.Camera();
    Clock = new omx.Clock();
    VideoRender = new omx.VideoRender();
    omx.Component.initAll([Camera, Clock, VideoRender])
      .then(function() {
        Camera.setFormat().enable();
        Clock.run();

        pipeline = Clock
          .tunnel(Camera)
          .pipe(VideoRender);
        done();
      })
      .catch(console.log.bind(console));
  });

  afterAll(function(done) {
    Clock.stop();
    pipeline
      .on('finish', function() {
        done();
      });
  });

  beforeEach(function() {
  });

  afterEach(function() {
    Camera.setContrast();
    Camera.setBrightness();
    Camera.setSaturation();
    Camera.setDigitalZoom();
  });

  it("should set getDigitalZoom", function(done) {
    var p = Camera.getDigitalZoom();
    console.log(p)
    t(done);
  });
  it("should set DigitalZoom", function(done) {
    Camera.setDigitalZoom(0x10000);
    t(done, 2000);
  });
  it("should set DigitalZoom", function(done) {
    Camera.setDigitalZoom(0x20000);
    t(done, 2000);
  });
  it("should set DigitalZoom", function(done) {
    Camera.setDigitalZoom(0x30000);
    t(done, 2000);
  });
  it("should set DigitalZoom", function(done) {
    Camera.setDigitalZoom(0x40000);
    t(done, 2000);
  });
  it("should set DigitalZoom", function(done) {
    Camera.setDigitalZoom(0x50000);
    t(done, 2000);
  });
  it("should set DigitalZoom", function(done) {
    Camera.setDigitalZoom(0x60000);
    t(done, 2000);
  });

  it("should have default Contrast", function() {
    expect(Camera.getContrast()).toEqual(0);
    Camera.setContrast();
    expect(Camera.getContrast()).toEqual(0);
  });
  it("should set Contrast positive", function(done) {
    Camera.setContrast(200);
    expect(Camera.getContrast()).toEqual(100);
    Camera.setContrast(30);
    expect(Camera.getContrast()).toEqual(30);
    t(done);
  });
  it("should set Contrast negative", function(done) {
    Camera.setContrast(-200);
    expect(Camera.getContrast()).toEqual(-100);
    Camera.setContrast(-30);
    expect(Camera.getContrast()).toEqual(-30);
    t(done);
  });

  it("should have default Brightness", function() {
    expect(Camera.getBrightness()).toEqual(50);
    Camera.setBrightness();
    expect(Camera.getBrightness()).toEqual(50);
  });
  it("should set Brightness positive", function(done) {
    Camera.setBrightness(200);
    expect(Camera.getBrightness()).toEqual(100);
    Camera.setBrightness(40);
    expect(Camera.getBrightness()).toEqual(40);
    t(done);
  });
  it("should set Brightness negative", function(done) {
    Camera.setBrightness(-200);
    expect(Camera.getBrightness()).toEqual(0);
    Camera.setBrightness(60);
    expect(Camera.getBrightness()).toEqual(60);
    t(done);
  });

  it("should have default Saturation", function() {
    expect(Camera.getSaturation()).toEqual(0);
    Camera.setSaturation();
    expect(Camera.getSaturation()).toEqual(0);
  });
  it("should set Saturation positive", function(done) {
    Camera.setSaturation(200);
    expect(Camera.getSaturation()).toEqual(100);
    Camera.setSaturation(30);
    expect(Camera.getSaturation()).toEqual(30);
    t(done);
  });
  it("should set Saturation negative", function(done) {
    Camera.setSaturation(-200);
    expect(Camera.getSaturation()).toEqual(-100);
    Camera.setSaturation(-30);
    expect(Camera.getSaturation()).toEqual(-30);
    t(done);
  });

});
