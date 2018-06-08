// requires..
var courseDB = require('./course-db');
var httpBase = Platform.requirePlugin("base.web-service");

//express : router
var router = Platform.express.Router();

// load courses objects
router.post('/load', load);

function load (req, res){
	console.log("loading...");
	httpBase.setHeader(res);
	var selector = {};
	if(req.body && req.body.selector){
		selector = req.body.selector;
		console.log("Selector: " + JSON.stringify(selector));
	}

	var options = {};
	if(req.body && req.body.options){
		options = req.body.options;
		console.log("Options: " + JSON.stringify(options));
	}
	
	courseDB.getCourses(selector, options, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
}

//save courses objects
router.post('/save', save);

function save(req, res){
	var courses = req.body.courses;
	console.log("saving...  array = " + JSON.stringify(courses));
	httpBase.setHeader(res);
	courseDB.saveCourses(courses, {}, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
}

//export this router to use in our server.js
module.exports = router;
