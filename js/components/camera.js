var Camera = Class.create(Component, {
  initialize: function($super) {
    this._opts = Array.prototype.slice.call(arguments, 1);
    $super("camera"); 
  },
  setOwner: function($super, owner) {
    if (owner instanceof Entity) {
      var camera = new THREE.PerspectiveCamera(
        this._opts[0],
        this._opts[1],
        this._opts[2],
        this._opts[3]
      );   
      _.extend(owner, camera);

      this._camera = camera;
      $super(owner); 
    }
  }
});
