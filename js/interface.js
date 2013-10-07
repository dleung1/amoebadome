var Interface = (function() {
  var listeners = [];

  return {
    to: function(name, bind, handle) {
      // Clear previous screen's listeners.
      Game.removeListeners('tick', listeners);
      listeners = [];

      $("#interface")
      .html($("script[name='" + name + "']").text())
      .find("[data-bind]")
      .each(function() {
        var label = $(this).attr('data-bind');

        $(this).find("[data-property]")
        .each(function() {
          var prop = $(this).attr('data-property').split(' as ');

          if (prop.length > 1) {
            $(this).css(prop[1], _.deep(bind[label], prop[0]));
            if ($(this).attr('data-watch') !== undefined) {
              listeners.push(function() {
                this.css(prop[1], _.deep(bind[label], prop[0]));
              }.bind($(this)));
            }
          } else {
            $(this).text(_.deep(bind[label], prop[0])); 
            if ($(this).attr('data-watch') !== undefined) {
              listeners.push(function() {
                this.text(_.deep(bind[label], prop[0]));
              }.bind($(this)));
            }
          }
        });

        $(this).find("[data-click]")
        .each(function() {
          var event = $(this).attr('data-click');
          $(this).click(bind[label], handle[event]);
        });
      });
      Game.addListeners('tick', listeners);
    }
  }
})();
