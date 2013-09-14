var Follow = function(target) {
  this.target = target;
  this.offset = new THREE.Vector3(0, 0, 0);
};
Follow.prototype = Object.create(Component.prototype);
Follow.prototype.constructor = Follow;

Follow.prototype.update = function(dt) {
  if (this.target === undefined) return;

  this._owner.position.addVectors(this._owner.position, this.offset);
};
