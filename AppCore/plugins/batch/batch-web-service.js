// requires..
var batchDB = require('./batch-db');
var httpBase = Platform.requirePlugin("base.web-service");

//express : router
var router = Platform.express.Router();

// load batches objects
router.post('/load', load);

function load (req, res){
	console.log("loading...");
	httpBase.setHeader(res);
	var selector = {};
	if(req.body && req.body.selector){
		selector = req.body.selector;
		console.log("Selector: " + JSON.stringify(selector));
	}
	batchDB.getBatches(selector, {}, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
}

//save batches objects
router.post('/save', save);

function save(req, res){
	var batches = req.body.batches;
	console.log("saving...  array = " + JSON.stringify(batches));
	httpBase.setHeader(res);
	batchDB.saveBatches(batches, {}, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
}

//export this router to use in our server.js
module.exports = router;
