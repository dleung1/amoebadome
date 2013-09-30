var Scene = (function() {
 	var scenes = {}
 	var selected; 
 	return{
 		current = null;
		define: function(name, scene) {
			scenes[name] = scene;
		},
		transition : function(name) {
			current = scenes[name];

			Q.nfcall(selected.unload)
			.then(scenes[name].load)
			.then(scenes[name].run)
			.then(function(scene){
				current = scene;
			})
		}
	}
})();
