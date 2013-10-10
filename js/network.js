var Network = (function() {
  var proxies = {};
  var socket = io.connect('/');
  var uuid;
  
  socket.on('client.accept', function(data) {
    uuid = data.uuid;
  });

  socket.on('agent.create', function(uuid, type, data) {
    console.log("Creating Agent:", uuid);
    var proxy = Game.addEntity(type);
    _.each(_.pairs(data), function(el) {
      _.deep(proxy, el[0], el[1]); 
    });
    proxies[uuid] = proxy;
  });

  socket.on('agent.tick', function(uuid, data) {
    _.each(_.pairs(data), function(el) {
      _.deep(proxies[uuid], el[0], el[1]);
    });
  });
  
  socket.on('agent.destroy', function(uuid) {
    console.log("Destroying Agent: %s", uuid);
    Game.removeEntity(proxies[uuid]);
    delete proxies[uuid];
  });

  return {
    socket: socket
  }
})();
