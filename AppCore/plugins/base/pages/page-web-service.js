// requires..
var httpBase = Platform.requirePlugin("base.web-service");

//express : router
var router = Platform.express.Router();

// load web pages
Platform.registerWebPages();

// load page
router.get('/*', loadPage);

var subs_page_title = "__page.title__";
var subs_links = "__links__";
var subs_parents = "__parents__";

var parent_home = {"id":"dashboard", "title":"Home", "description":"Home"};

function loadPage (req, res){
	var pages = Platform.registry.pages;
	console.log("Pages : " + JSON.stringify(pages));
	var pageId = req.path.substr(1);
	console.log("loading Page - " + pageId);
	if(Object.keys(pages).indexOf(pageId) >= 0){
		var page = pages[pageId];
		//httpBase.setHeader(res);
		var basePageContent = require("fs").readFileSync(__dirname + "/base-page.html").toString("utf8");
		basePageContent = basePageContent.replace(new RegExp(subs_page_title, "g"), page.title);
		if(page.links){
			basePageContent = basePageContent.replace(new RegExp(subs_links, "g"), JSON.stringify(page.links));
		} else {
			basePageContent = basePageContent.replace(new RegExp(subs_links, "g"), "[]");
		}
		
		var parents = [parent_home];
		buildParents(page, parents);
		console.log("Parent trail : " + JSON.stringify(parents));
		basePageContent = basePageContent.replace(new RegExp(subs_parents, "g"), JSON.stringify(parents));
		
		res.write(basePageContent);
	} else {
		res.write(pageId + " : Not found");
		
	}
	res.end();
}

function buildParents(page, parents){
	if(!parents){
		parents = [];
	}
	parents.splice(1, 0, page);
	var pages = Platform.registry.pages;
	var parentPageId = page["parent-id"];
	if(parentPageId && Object.keys(pages).indexOf(parentPageId) >= 0){
		var parentPage = pages[parentPageId];
		buildParents(parentPage, parents);
	}
}
//export this router to use in our server.js
module.exports = router;
