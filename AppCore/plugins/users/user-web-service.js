// requires..
var usersDB = require('./users-db');
var httpBase = Platform.requirePlugin("base.web-service");

//express : router
var router = Platform.express.Router();

// load users objects
router.post('/load', load);
router.get('/load', load);

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

	usersDB.getUsers(selector, options, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
}

//save users objects
router.post('/save', save);

function save(req, res){
	var users = req.body.users;
	console.log("saving...  array = " + JSON.stringify(users));
	httpBase.setHeader(res);
	usersDB.saveUsers(users, {}, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
}

//export this router to use in our server.js
module.exports = router;
