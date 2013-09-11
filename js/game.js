var Game = Class.create({
  initialize: function(opts) {
    var config = _.defaults(opts || {}, {
      canvas  : 'game',
      renderer: 'webgl',
      width   : 800,
      height  : 600,
      debug   : true,
      release : false
    });

    var renderer;
    if (Detector.webgl && config.renderer === 'webgl') {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.setClearColorHex(0x000000, 1);
    } else {
      renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(config.width, config.height);
    document.getElementById(config.canvas).appendChild(renderer.domElement);

    this._renderer = renderer;
    this._scene = new THREE.Scene();

    // Draw debug widgets.
    if(config.debug) {
      var stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.bottom = '0px';
      document.body.appendChild(stats.domElement);
      this._stats = stats;
      this._gui = new dat.GUI();
    }

    // THIS IS TEMPORARY FOR TESTING ONLY
    var e = new Entity("Main Camera");
    var cam = new Camera(
      45, 
      config.width / config.height,
      0.1, 
      10000
    );

    var con = new Controller({
      'forward': function() {
        console.log(this.position);
        this.translateZ(1);
      },
      'back': function() {
        console.log(this.position);
        this.translateZ(-1);
      },
      'left': function() {
        console.log(this.position);
        this.translateX(-1);
      },
      'right': function() {
        console.log(this.position);
        this.translateX(1);
      }
    });
    e.addComponent(cam);
    e.addComponent(con);
    
    e.position.set(0, 50, -50);
    e.lookAt(new THREE.Vector3(0, 0, 0));

    this._scene.add(e);
    this._camera = e;

    var ee = new Entity("Torus");
    var geometry = new THREE.SphereGeometry();
    var material = new THREE.MeshNormalMaterial();
    var mes = new Mesh(geometry, material);
    var mco = new Controller({
      'fire': function() {
        console.log(this.getComponent("rigidbody")._body.force);
        this.getComponent("rigidbody")._body.force.set(0, 100, 0);
      }
    });
    var phy = new Rigidbody(5, new CANNON.Sphere(50));

    ee.addComponent(mes);
    ee.addComponent(mco);
    ee.addComponent(phy);
    ee.position.set(0, 20, 0);
    this._scene.add(ee); 

    this.update();
  },
  update: function(dt) {
    window.requestAnimationFrame(this.update.bind(this));
    this.render();
  },
  render: function() {
    this._renderer.render(this._scene, this._camera);
  }
});

Game.Input = new InputService();
Game.Physics = new PhysicsService();
