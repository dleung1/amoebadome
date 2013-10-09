var Network = (function() {
  var socket = socket || io.connect('/');
  
  return function(targets) {
    this._socket = socket;
    this._targets = targets;

    Component.call(this, "network"); 
  }
})();
Network.prototype = Object.create(Component.prototype);
Network.prototype.constructor = Network;

Network.prototype.setOwner = function(owner) {
  var data = _.reduce(this._targets, function(ag, el) {
    ag[el] = _.deep(owner, el);
  }, {});
  this._socket.emit('agentNew', data);
  Component.prototype.setOwner.call(this, owner);
};

Network.prototype.update = function(dt) {
  var data = _.reduce(this._targets, function(ag, el) {
    ag[el] = _.deep(this._owner, el);
  }, {});
  this._socket.emit('agentTick', data);
}
