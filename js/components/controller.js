var Controller = function(actions) {
  this.actions = actions || {};
  Component.call(this, "controller");
};
Controller.prototype = Object.create(Component.prototype);
Controller.prototype.constructor = Controller;

Controller.prototype.setOwner = function(owner) {
  _.each(_.pairs(this.actions), function(el) {
    if(this._owner) {
      Game.Input.removeListener(el[0], el[1]);
    }
    Game.Input.addListener(el[0], _.bind(el[1], owner));
  }, this);
  Component.prototype.setOwner.call(this, owner);
};

