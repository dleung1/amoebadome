var Entity = Class.create({
  initialize: function(name) {
    THREE.Object3D.call(this);
    
    var proto = THREE.Object3D.prototype;
    for(var p in proto) {
      if(!this[p] && proto.hasOwnProperty(p)) {
        this[p] = proto[p];
      }
    }

    this.name = name;
    this._components = {};
  },
  addComponent: function(comp) {
    this._components[comp.getType()] = comp;
    comp.setOwner(this);
  },
  getName: function() {
    return this._name;
  },
  setName: function(name) {
    this._name = name;
  }
});

