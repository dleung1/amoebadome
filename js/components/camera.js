var Camera = Class.create(Component, {
  initialize: function($super) {
    this._owner = {};
    this._opts = Array.prototype.slice.call(arguments, 1);

    $super("camera"); 
  },
  setOwner: function(owner) {
    if (e instanceof Entity) {
      var camera = new THREE.PerspectiveCamera(
        this._opts[0],
        this._opts[1],
        this._opts[2],
        this._opts[3]
      );   
     
      var proto = THREE.Camera.prototype;
      for(var p in proto) {
        if(!owner[p] && proto.hasOwnProperty(p)) {
          owner[p] = proto[p]
        }
      }

      proto = THREE.PerspectiveCamera.prototype;
      for(var p in proto) {
        if(!owner[p] && proto.hasOwnProperty(p)) {
          owner[p] = proto[p];
        }
      }

      for(var p in camera) {
        if(!owner[p] && camera.hasOwnProperty(p)) {
          owner[p] = camera[p];
        }
      }

      
      this._owner = owner;
      this._camera = camera;
    }
  }
});
