var Amoeba = Class.create({
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

    if(this.config.debug) {
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.bottom = '0px';
      document.body.appendChild(stats.domElement);
      this._stats = stats;
    }

    // THIS IS TEMPORARY FOR TESTING ONLY
    var e = new Entity("Main Camera");
    var c = new Camera(
      45, 
      this.config.width / this.config.height,
      1,
      10000
    );
    e.addComponent(c);
    this._scene.add(e);
    this._camera = e;
    
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

