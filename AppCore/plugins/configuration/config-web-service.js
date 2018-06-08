// requires..
var httpBase = Platform.requirePlugin("base.web-service");

//express : router
var router = Platform.express.Router();

// reload Platform
router.get('/reloadPlatform', reloadPlatform);

function reloadPlatform(req, res){
	console.log("Reloading platform");
	httpBase.setHeader(res);
	// Platform : bootstrap
	Platform.bootstrap();

	// register web services.
	Platform.registerWebServices();

	//register static clients
	Platform.registerStaticClients();
	
	// load web pages
	Platform.registerWebPages();

	res.send({"success":true});
}

//export this router to use in our server.js
module.exports = router;
