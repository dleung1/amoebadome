var Component = Class.create({
  initialize: function(type){
    this._owner = {};
    this._type = type;
  },
  update: function(dt) {},
  draw: function() {},
  destroy: function() {},
  setOwner: function(owner) {
    // Handle removing properties here.
    this._owner = owner;
  },
  getOwner: function() {
    return this._owner;
  },
  getType: function() {
    return this._type;
  }
});
