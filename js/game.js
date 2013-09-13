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

    var cam = new Entity.Camera(
      "Main Camera",
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
    cam.addComponent(con);
    
    cam.position.set(0, 300, -300);
    cam.lookAt(new THREE.Vector3(0, 0, 0));

    this._scene.add(cam);
    this._camera = cam;

    var geo = new THREE.SphereGeometry();
    var mat = new THREE.MeshNormalMaterial();

    var tor = new Entity.Mesh("Torus", geo, mat);
    var ctr = new Controller({
      'fire': function() {
        console.log(this.getComponent("rigidbody")._body.force);
        this.getComponent("rigidbody")._body.force.set(0, 0, 200);
      }
    });
    var phy = new Rigidbody(5, new CANNON.Sphere(50));
    phy._body.position.y = 100;

    tor.addComponent(ctr);
    tor.addComponent(phy);
    this._scene.add(tor); 

    var pln = new THREE.PlaneGeometry(300, 300);
    var gnt = new THREE.MeshNormalMaterial();
  
    var gnd = new Entity.Mesh("Ground", pln, gnt);
    var rbd = new Rigidbody(0, new CANNON.Plane());
    rbd._body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

    gnd.addComponent(rbd);
    this._scene.add(gnd);

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
