import omx = require('../../index');

describe("Camera", function() {
  var Camera: omx.Camera;
  var Clock: omx.Clock;
  var VideoRender: omx.VideoRender;
  var pipeline;
  var timeout = 200;
  var t = (d, time?: number) => { setTimeout(d, time || timeout) };

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
    Camera.setVideoFramerate();
    Camera.setFrameStabilisation();
    Camera.setExposure();
  });

  it("should have default DigitalZoom", function() {
    expect(Camera.getDigitalZoom()).toEqual(omx.CameraZoom.CAMERA_ZOOM_1X);
  });
  it("should set DigitalZoom", function(done) {
    var zooms = [
      omx.CameraZoom.CAMERA_ZOOM_1X,
      omx.CameraZoom.CAMERA_ZOOM_2X,
      omx.CameraZoom.CAMERA_ZOOM_3X,
      omx.CameraZoom.CAMERA_ZOOM_4X,
      omx.CameraZoom.CAMERA_ZOOM_5X,
      omx.CameraZoom.CAMERA_ZOOM_6X,
      omx.CameraZoom.CAMERA_ZOOM_7X,
      omx.CameraZoom.CAMERA_ZOOM_8X
    ];
    (function next() {
      var zoom = zooms.shift();
      if (zooms.length === 0) {
        done();
        return;
      }
      Camera.setDigitalZoom(zoom);
      expect(Camera.getDigitalZoom()).toEqual(zoom);
      setTimeout(next, timeout);
    })();
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

  it("should get VideoFramerate", function() {
    Camera.setVideoFramerate(15);
    expect(Camera.getVideoFramerate()).toEqual(15);
  });

  it("should have default FrameStabilisation", function() {
    expect(Camera.getFrameStabilisation()).toEqual(false);
  });
  it("should set FrameStabilisation", function(done) {
    Camera.setFrameStabilisation(true);
    expect(Camera.getFrameStabilisation()).toEqual(true);
    t(done);
  });

  it("should have default Exposure", function() {
    expect(Camera.getExposure()).toEqual(omx.EXPOSURECONTROLTYPE.ExposureControlAuto);
  });
  it("should set Exposure", function(done) {
    var exposures = [
      omx.EXPOSURECONTROLTYPE.ExposureControlOff,
      omx.EXPOSURECONTROLTYPE.ExposureControlAuto,
      omx.EXPOSURECONTROLTYPE.ExposureControlNight,
      omx.EXPOSURECONTROLTYPE.ExposureControlBackLight,
      omx.EXPOSURECONTROLTYPE.ExposureControlSpotLight,
      omx.EXPOSURECONTROLTYPE.ExposureControlSports,
      omx.EXPOSURECONTROLTYPE.ExposureControlSnow,
      omx.EXPOSURECONTROLTYPE.ExposureControlBeach,
      omx.EXPOSURECONTROLTYPE.ExposureControlLargeAperture,
      omx.EXPOSURECONTROLTYPE.ExposureControlSmallAperture,
      omx.EXPOSURECONTROLTYPE.ExposureControlVeryLong,
      omx.EXPOSURECONTROLTYPE.ExposureControlFixedFps,
      omx.EXPOSURECONTROLTYPE.ExposureControlNightWithPreview,
      omx.EXPOSURECONTROLTYPE.ExposureControlAntishake,
      omx.EXPOSURECONTROLTYPE.ExposureControlFireworks,
    ];
    (function next() {
      var exposure = exposures.shift();
      if (exposures.length === 0) {
        done();
        return;
      }
      Camera.setExposure(exposure);
      expect(Camera.getExposure()).toEqual(exposure);
      setTimeout(next, timeout);
    })();
  });

  it("should have default Exposure Value", function() {
    var value = Camera.getExposureValue();
    expect(JSON.stringify(value)).toEqual(JSON.stringify({
      eMetering: 0,
      xEVCompensation: 0,
      nApertureFNumber: 0,
      bAutoAperture: false,
      nShutterSpeedMsec: 0,
      bAutoShutterSpeed: true,
      nSensitivity: 0,
      bAutoSensitivity: true
    }));
  });
  it("should set Exposure Value", function(done) {
    var value = new omx.CONFIG_EXPOSUREVALUETYPE();
    value.nShutterSpeedMsec = 500;
    value.bAutoSensitivity = false;
    value.nSensitivity = 4000;
    Camera.setExposureValue(value);

    expect(JSON.stringify(Camera.getExposureValue())).toEqual(JSON.stringify({
      eMetering: 0,
      xEVCompensation: 0,
      nApertureFNumber: 0,
      bAutoAperture: false,
      nShutterSpeedMsec: 499,
      bAutoShutterSpeed: false,
      nSensitivity: 4000,
      bAutoSensitivity: false
    }));

    t(done);
  });

});