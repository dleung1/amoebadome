var Rigidbody = Class.create(Component, {
  initialize: function($super, mass, shape) {
    this._body = new CANNON.RigidBody(mass, shape);
        $super("rigidbody");
  },
  setOwner: function($super, owner) {
    Game.Physics.addBody(this._body); 
    owner.position.copy(this._body.position);
    owner.quaternion.copy(this._body.quaternion);
    var tick = function() {
      this._body.position.copy(this._owner.position);
      this._body.quaternion.copy(this._owner.quaternion);
    };
    Game.Physics.addListener('tick', _.bind(tick, this))
    $super(owner);
  }
});
