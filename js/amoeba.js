var Amoeba = Class.create({
  _renderer: {},
  _scene: {},
  config: {
    canvas  : '#amoeba',
    renderer: 'webgl',
    width   : 800,
    height  : 600,
    debug   : true,
    release : false
  },
  init: function() {
    var renderer;
    if (Detector.webgl) {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
      });
      renderer.setClearColorHex(0xBBBBBB, 1);
    } else {
      renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(this.config.width, this.config.height);
    document.getElementById(this.config.canvas).appendChild(renderer.domElement);

    this._renderer = renderer;
    this._scene = new THREE.Scene();
  },
  update: function(dt) {
    requestAnimationFrame(this.draw);
    this.draw();
  },
  draw: function() {
    this._renderer.render(this._scene, this._camera);
  }
});

