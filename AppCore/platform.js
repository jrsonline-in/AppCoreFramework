
// Platform : add to global
global.Platform = Platform;

Platform.fs = require("fs");
Platform.PATH_SEP = "/";
Platform.PLUGIN_FILE_NAME = "plugin.json";
Platform.CONFIG_FILE = "platform.json"
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
	Platform.inited = false;
	console.log("Bootstraping...");
	
	// Initialize Platform.
	Platform.init();

	// set Platform.inited = true;
	Platform.inited = true;
	console.log("...Bootstrapped");

};

// Platform: init
Platform.init = function init(){
	Platform.registry = {};

	// object: to store platform configuration, loaded from platform.json
	function PlatformConfig(){
		// properties
		this.id = "";
		this.name = "";
		this.description = "";
	}
	
	// load platform configuration from platform.json
	Platform.config = new PlatformConfig();
	Object.assign(Platform.config, JSON.parse(Platform.fs.readFileSync(Platform.root() + Platform.PATH_SEP + Platform.CONFIG_FILE)))
	console.log("platform config : " + JSON.stringify(Platform.config));
	
	// register plugins
	Platform.registerPlugins();
	
}

//Platform: register plugins
Platform.registerPlugins = function registerPlugins(){
	
	console.log("registering plugins...");
	// init : plugin registry
	Platform.registry.plugins = [];
	Platform.registry.disabledPlugins = [];
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
		} else if(path.endsWith(Platform.PLUGIN_FILE_NAME)) {
			var pluginConfig =JSON.parse(Platform.fs.readFileSync(path));
			if(pluginConfig.disabled){
				Platform.registry.disabledPlugins.push({"name":pluginConfig.name, "path": require('path').dirname(path), "config": pluginConfig});
			} else {
				Platform.registry.plugins.push({"name":pluginConfig.name, "path": require('path').dirname(path), "config": pluginConfig});
			}
		}	
	}
}

//utility: registerWebPages
Platform.registerWebPages = function registerWebPages(){

	if(!Platform.inited){
		Platform.bootstrap();
	}
	
	// if needed, init express and app
	Platform.initExpressApp();
	
	// register web pages.
	Platform.registry.pages = new Object();
	
	Platform.registry.plugins.forEach(function(plugin) {
		var pages = plugin.config["webPages"];
		if(pages){
			//console.log("Plugin - '" + plugin.name + "' contains pages : " + JSON.stringify(pages));
			pages.forEach(function(page) {
				page.pluginName = plugin.name;
				Platform.registry.pages[page.id] = page;
				//console.log("Added page - " + JSON.stringify(Platform.registry.pages))
			})
		}
	});
	return Platform.registry.pages;
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
				var mod = require(plugin.path + Platform.PATH_SEP + service.script);
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

	//express : init
	var bodyParser = require('body-parser');
	Platform.app.use(bodyParser.json()); // for parsing application/json
	Platform.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
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
				var stPath = plugin.path + Platform.PATH_SEP + st;
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
				var reqPath = plugin.path + Platform.PATH_SEP + plugin.config.script;
				//console.log("Loading Plugin at - " + reqPath);
				var pluginScript = require(reqPath);
				//console.log("Loaded : " + pluginScript);
				plugin.required = pluginScript;
			}
			return plugin.required;
		}
	}
}

//utility: getPluginDefinition
Platform.getPluginDefinition= function getPluginDefinition(name){
	if(!Platform.inited){
		Platform.bootstrap();
	}
	
	for(var i=0; i<Platform.registry.plugins.length; i++){
		var plugin = Platform.registry.plugins[i];
		if(plugin.name == name){
			return plugin;
		}
	}
}



