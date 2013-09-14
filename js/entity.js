var Entity = function(name) {
  this.name = name;
  this.components = {};
};

Entity.prototype = {
  addComponent: function(comp) {
    this.components[comp.getType()] = comp;
    comp.setOwner(this);
  },
  getComponent: function(type) {
    return this.components[type];
  }
};
Entity.prototype.constructor = Entity.Transform;

Entity.Transform = function(name) {
  THREE.Object3D.call(this);

  _.extend(this, Entity.prototype);
  Entity.call(this, name);

  this.useQuaternion = true;
};
Entity.Transform.prototype = Object.create(THREE.Object3D.prototype);
Entity.Transform.prototype.constructor = Entity.Transform;

Entity.Camera = function(name) {
  var args = Array.prototype.slice.call(arguments, 1);
  THREE.PerspectiveCamera.apply(this, args);

  _.extend(this, Entity.prototype);
  Entity.call(this, name);
};
Entity.Camera.prototype = Object.create(THREE.PerspectiveCamera.prototype);
Entity.Camera.prototype.constructor = Entity.Camera;

Entity.Mesh = function(name) {
  var args = Array.prototype.slice.call(arguments, 1);
  THREE.Mesh.apply(this, args);

  _.extend(this, Entity.prototype);
  Entity.call(this, name);

  this.useQuaternion = true;
};
Entity.Mesh.prototype = Object.create(THREE.Mesh.prototype);
Entity.Mesh.prototype.constructor = Entity.Mesh;

