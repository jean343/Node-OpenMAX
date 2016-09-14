import omx = require('../../');

describe("Camera", function() {
  var Camera: omx.Camera;
  var Clock: omx.Clock;
  var VideoRender: omx.VideoRender;
  var pipeline;
  var t = (d) => { setTimeout(d, 1000) };

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

  it("should set contrast positive", function(done) {
    Camera.setContrast(30);
    expect(Camera.getContrast()).toEqual(30);
    t(done);
  });
  it("should set contrast positive over", function(done) {
    Camera.setContrast(200);
    expect(Camera.getContrast()).toEqual(100);
    t(done);
  });
  it("should set contrast negative", function(done) {
    Camera.setContrast(-30);
    expect(Camera.getContrast()).toEqual(-30);
    t(done);
  });
  it("should set contrast negative over", function(done) {
    Camera.setContrast(-200);
    expect(Camera.getContrast()).toEqual(-100);
    t(done);
  });

});
