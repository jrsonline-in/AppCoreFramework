
// Platform : add to global
global.Platform = Platform;

Platform.fs = require("fs");
Platform.PATH_SEP = "/";
Platform.registry = {};

Platform.inited = false;

Platform.root = function (){
	return __dirname.split("\\").join("/");
}

function Platform(){
	// bootstrap object
	Platform.pluginsFolder = Platform.root() + Platform.PATH_SEP + "plugins";
	
}

//Platform : bootstrap
Platform.bootstrap = function bootstrap(){
	console.log("Bootstraping...");
	
	// Initialize Platform.
	Platform.init();

	// set Platform.inited = true;
	Platform.inited = true;
	console.log("...Bootstrapped");

};

// Platform: init
Platform.init = function init(){
	// object: to store platform configuration, loaded from platform.json
	function PlatformConfig(){
		// properties
		this.id = "";
		this.name = "";
		this.description = "";
	}
	
	// load platform configuration from platform.json
	Platform.config = new PlatformConfig();
	Object.assign(Platform.config, JSON.parse(Platform.fs.readFileSync(Platform.root() + Platform.PATH_SEP + "platform.json")))
	console.log("platform config : " + JSON.stringify(Platform.config));
	
	// register plugins
	Platform.registerPlugins();
	
}

//Platform: register plugins
Platform.registerPlugins = function registerPlugins(){
	
	console.log("registering plugins...");
	// init : plugin registry
	Platform.registry.plugins = [];
	// identify plugins root folder
	if(Platform.config.plugins){
		Platform.pluginsFolder = Platform.root() + Platform.PATH_SEP + Platform.config.plugins;
	}
	
	// find plugins iteratively.
	findPlugin(Platform.pluginsFolder);
	
	//console.log(JSON.stringify(Platform.registry.plugins));
	
	// recursive logic to register plugins
	function findPlugin(path){
		if(Platform.fs.statSync(path).isDirectory()){ // a folder. get inside
			var files = Platform.fs.readdirSync(path);
			files.forEach(function(fpath, i) {
				findPlugin(path + Platform.PATH_SEP + fpath);
			});
		} else if(path.endsWith("plugin.json")) {
			var pluginConfig =JSON.parse(Platform.fs.readFileSync(path));
			if(!pluginConfig.active){
				pluginConfig.active = true;
			}
			Platform.registry.plugins.push({"name":pluginConfig.name, "path": path, "config": pluginConfig});
		}	
	}
}


//utility: registerWebServices
Platform.registerWebServices = function registerWebServices(){
	if(!Platform.inited){
		Platform.bootstrap();
	}
	
	// if needed, init express and app
	Platform.initExpressApp();
	
	// register web services.
	
	Platform.registry.plugins.forEach(function(plugin) {
		var services = plugin.config["web-services"];
		if(services){
			services.forEach(function(service) {
				var mod = require(plugin.path + Platform.PATH_SEP + ".."+ Platform.PATH_SEP + service.script);
				Platform.app.use(service.prefix, mod);
			})
		}
	});
	
}

//utility: initExpressApp
Platform.initExpressApp = function initExpressApp(){
	if(!Platform.inited){
		Platform.bootstrap();
	}
	
	// if needed, init express and app
	if(!Platform.express){
		Platform.express = require('express');
	}
	if(!Platform.app){
		Platform.app = Platform.express();
	}

}

//utility: registerStaticClients
Platform.registerStaticClients = function registerStaticClients(){
	if(!Platform.inited){
		Platform.bootstrap();
	}
	
	// if needed, init express and app
	Platform.initExpressApp();
	
	// register static client folders.
	Platform.registry.plugins.forEach(function(plugin) {
		var statics = plugin.config["web-static"];
		if(statics){
			statics.forEach(function(st) {
				var stPath = plugin.path + Platform.PATH_SEP + ".."+ Platform.PATH_SEP + st;
				Platform.app.use(Platform.express.static(stPath));
			})
		}
	});
}

// utility: requirePlugin
Platform.requirePlugin= function loadPlugin(name){
	if(!Platform.inited){
		Platform.bootstrap();
	}
	
	for(var i=0; i<Platform.registry.plugins.length; i++){
		var plugin = Platform.registry.plugins[i];
		if(plugin.name == name){
			if(!plugin.required){
				var reqPath = plugin.path + Platform.PATH_SEP + ".."+ Platform.PATH_SEP + plugin.config.script;
				//console.log("Loading Plugin at - " + reqPath);
				var pluginScript = require(reqPath);
				//console.log("Loaded : " + pluginScript);
				plugin.required = pluginScript;
			}
			return plugin.required;
		}
	}
}



