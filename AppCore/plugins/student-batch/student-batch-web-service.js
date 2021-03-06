// requires..
var SB_DB = require('./student-batch-db');
var httpBase = Platform.requirePlugin("base.web-service");

//express : router
var router = Platform.express.Router();

// load sbs objects
router.post('/load', load);

function load (req, res){
	console.log("loading student-batches...");
	httpBase.setHeader(res);
	var selector = {};
	var options = {};
	if(req.body){
		console.log(JSON.stringify(req.body));
		
		if(req.body.selector){
			selector = req.body.selector;
			console.log("Selector: " + JSON.stringify(selector));
		}
		
		if(req.body.options){
			options = req.body.options;
			console.log("Options: " + JSON.stringify(options));
		}
	}

	SB_DB.getStudentBatches(selector, options, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
}

//save sbs objects
router.post('/save', save);

function save(req, res){
	var sbs = req.body.sbs;
	console.log("saving student-batches = " + JSON.stringify(sbs));
	httpBase.setHeader(res);
	SB_DB.saveStudentBatches(sbs, {}, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
}

//export this router to use in our server.js
module.exports = router;
