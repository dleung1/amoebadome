var Amoeba = Class.create({
  _renderer: {},
  _scene: {},
  _camera: {},
  _emitter: {},
  config: {
    canvas  : 'amoeba',
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

    // TEMPORARY CODE HERE
    var camera = new THREE.PerspectiveCamera(
      35,
      this.config.width / this.config.height,
      1, 
      10000
    );

    camera.position.set(0, 0, 5);
    this._scene.add(camera);
    this._camera = camera;
    
    var geometry = new THREE.TorusGeometry(1, 0.42);
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    this._scene.add(mesh); 
  },
  update: function(dt) {
    window.requestAnimationFrame(this.update.bind(this));
    this.render();
  },
  render: function() {
    this._renderer.render(this._scene, this._camera);
  }
});

