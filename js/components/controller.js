var Controller = Class.create(Component, {
  initialize: function($super, actions) {
    this.actions = actions || {};   
    $super("controller");
  },
  setOwner: function($super, owner) {
    _.each(_.pairs(this.actions), function(el) {
      if(this._owner) {
        Game.Input.removeListener(el[0], el[1]);
      }
      Game.Input.addListener(el[0], _.bind(el[1], owner));
    }, this);
    $super(owner);
  },
  addActions: function() {
  
  }
});

