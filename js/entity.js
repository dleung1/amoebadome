var Entity = function(name) {
  return new Entity.Transform(name);
};

Entity.prototype = {
  components: {},
  addComponent: function(comp) {
    this.components[comp.getType()] = comp;
    comp.setOwner(this);
  },
  getComponent: function(type) {
    return this.components[type];
  }
};

Entity.Transform = function(name) {
  THREE.Object3D.call(this);
  this.useQuaternion = true;
  this.name = name;
};
Entity.Transform.prototype = Object.create(THREE.Object3D.prototype);
Entity.Transform.prototype.constructor = Entity.Transform;
_.extend(Entity.Transform.prototype, Entity.prototype);

Entity.Camera = function(name) {
  var args = Array.prototype.slice.call(arguments, 1);
  THREE.PerspectiveCamera.apply(this, args);

  this.name = name;
};
Entity.Camera.prototype = Object.create(THREE.PerspectiveCamera.prototype);
Entity.Camera.prototype.constructor = Entity.Camera;
_.extend(Entity.Camera.prototype, Entity.prototype);

Entity.Mesh = function(name) {
  var args = Array.prototype.slice.call(arguments, 1);
  THREE.Mesh.apply(this, args);

  this.useQuaternion = true;
  this.name = name;
};
Entity.Mesh.prototype = Object.create(THREE.Mesh.prototype);
Entity.Mesh.prototype.constructor = Entity.Mesh;
_.extend(Entity.Mesh.prototype, Entity.prototype);

