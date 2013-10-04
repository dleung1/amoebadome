var GUID = function() {
  return GUID._guid++;
};
GUID._guid = 1;

var Game = (function() {
  var entities = {};

  return _.extend({
    config: {
      canvas: '#game',
      width : 800,
      height: 600,
      debug : true
    },
    init: function(opts) {
      this.config = _.defaults(opts || {}, this.config); 
      
      if(Detector.webgl) {
        this._renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        this._renderer.setClearColor(0x000000, 1);
      } else {
        this._renderer = new THREE.CanvasRenderer();
      }
      this._renderer.setSize(this.config.width, this.config.height);
      $(this.config.canvas).append(this._renderer.domElement);
      this._scene = new THREE.Scene();

      if (this.config.debug) {
        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom = '0px';
        document.body.appendChild(stats.domElement);
        this._stats = stats;
        this._gui = new dat.GUI();
      }
      this.emitEvent('initialized');
    },
    run: function() {
      this.emitEvent('running');
      this.update();
    },
    update: function(dt) {
      window.requestAnimationFrame(this.update.bind(this));
      this.emitEvent('tick');
      this.render();
    },
    render: function() {
      this._renderer.render(this._scene, Entity.Camera.main);
    },
    addEntity: function(e) {
      if (e.guid && e.guid <= GUID._guid) return;
      if (typeof e === "string") {
        e = Prefab.create(e);
      } 

      if (e instanceof Array) {
        return _.map(e, this.addEntity, this);
      }

      var proc = function(el) {
        el.guid = GUID();
        el.name = el.name || "Entity" + el.guid;
        entities[el.guid] = el;
        this._scene.add(el);

        _.each(_.values(el.components), function(c) {
          c.update && this.addListener('tick', _.bind(c.update, c));
        }, this);
        this.emitEvent('entity', [el]);
      }.bind(this);

      if (e.children.length > 0) {
        THREE.SceneUtils.traverseHierarchy(e, proc);
      } else {
        proc(e); 
        this.emitEvent('entity', [e]);
      }
      return e;
    },
    removeEntity: function(e) {
      this._scene.remove(e);
    }
  }, EventEmitter.prototype);
})();
Game.Input = new InputService();
Game.Physics = new PhysicsService();
