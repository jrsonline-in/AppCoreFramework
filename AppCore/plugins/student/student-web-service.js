// requires..
var studentDB = require('./student-db');
var httpBase = Platform.requirePlugin("base.web-service");

//express : router
var router = Platform.express.Router();

// load students objects
router.post('/load', load);

function load (req, res){
	console.log("loading students...");
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

	studentDB.getStudents(selector, options, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
}

//save students objects
router.post('/save', save);

function save(req, res){
	var students = req.body.students;
	console.log("saving students = " + JSON.stringify(students));
	httpBase.setHeader(res);
	studentDB.saveStudents(students, {}, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
}

//export this router to use in our server.js
module.exports = router;
