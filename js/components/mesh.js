var Mesh = Class.create(Component, {
  initialize: function($super, geo, mat) {
    this._geometry = geo;
    this._material = mat;
    $super("mesh");
  },
  setOwner: function($super, owner) {
    var mesh = new THREE.Mesh(this._geometry, this._material);    
    mesh.useQuaternion = true;
    owner.add(mesh);

    this._mesh = mesh;
    $super(owner);
  }
});

