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
    expect(Camera.getExposure()).toEqual(omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlAuto);
  });
  it("should set Exposure", function(done) {
    var exposures = [
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlOff,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlAuto,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlNight,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlBackLight,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlSpotLight,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlSports,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlSnow,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlBeach,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlLargeAperture,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlSmallAperture,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlVeryLong,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlFixedFps,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlNightWithPreview,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlAntishake,
      omx.OMX_EXPOSURECONTROLTYPE.OMX_ExposureControlFireworks,
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
      metering: 0,
      eVCompensation: 0,
      apertureFNumber: 0,
      autoAperture: false,
      shutterSpeedMsec: 0,
      autoShutterSpeed: true,
      sensitivity: 0,
      autoSensitivity: true
    }));
  });
  it("should set Exposure Value", function(done) {
    var value = new omx.ExposureValue();
    value.shutterSpeedMsec = 1000;
    value.autoSensitivity = false;
    value.sensitivity = 4000;
    Camera.setExposureValue(value);

    expect(JSON.stringify(Camera.getExposureValue())).toEqual(JSON.stringify({
      metering: 0,
      eVCompensation: 0,
      apertureFNumber: 0,
      autoAperture: false,
      shutterSpeedMsec: 1000,
      autoShutterSpeed: true,
      sensitivity: 4000,
      autoSensitivity: false
    }));

    t(done);
  });

});
