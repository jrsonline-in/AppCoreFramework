// requires..
var httpBase = Platform.requirePlugin("base.web-service");

//express : router
var router = Platform.express.Router();

//load web pages
Platform.registerWebPages();

// load page
router.get('/*', loadPage);

var subs_page = "__page__";
var subs_page_title = "__page.title__";
var subs_links = "__links__";
var subs_parents = "__parents__";
var subs_page_content = "__page.content__";

function loadPage (req, res){
	var pages = Platform.registry.pages;
	//console.log("Pages : " + JSON.stringify(pages));
	var url = require('url');
	var q = url.parse(req.url, true);
	//console.log("Q :: " + JSON.stringify(q));
	
	var pageId = q.pathname.substr(1);
	console.log("loading Page - " + pageId);
	if(Object.keys(pages).indexOf(pageId) >= 0){
		var fs = require("fs");
		var page = pages[pageId];
		// load base page template
		var basePageContent = fs.readFileSync(__dirname + "/base-page.html").toString("utf8");
		// set page
		basePageContent = basePageContent.replace(new RegExp(subs_page, "g"), JSON.stringify(page));
		// set page title
		basePageContent = basePageContent.replace(new RegExp(subs_page_title, "g"), page.title);
		// build children links
		var links = findChildrenLinks(page);
		basePageContent = basePageContent.replace(new RegExp(subs_links, "g"), JSON.stringify(links));
		// build breadcrumb
		var parents = []; 
		buildParents(page, parents);
		basePageContent = basePageContent.replace(new RegExp(subs_parents, "g"), JSON.stringify(parents));
		// build template content
		if(page.template){
			basePageContent = basePageContent.replace(new RegExp(subs_page_content, "g"), page.template);
		} else if(page.templateUrl){
			var plugin = Platform.getPluginDefinition(page.pluginName);
			var templateContent = fs.readFileSync(plugin.path + Platform.PATH_SEP + page.templateUrl).toString("utf8");
			basePageContent = basePageContent.replace(new RegExp(subs_page_content, "g"), templateContent);
		} else {
			basePageContent = basePageContent.replace(new RegExp(subs_page_content, "g"), "");
		}
		// send back as response.
		res.write(basePageContent);
	} else {
		res.write(pageId + " : Not found");
		
	}
	res.end();
}

function findChildrenLinks(page){
	var linkPages = [];
	var pages = Platform.registry.pages;
	Object.keys(pages).forEach(function(id, i) {
		var p = pages[id];
		if(p.parent && p.parent == page.id){
			var linkIndex = 0;
			if(p.listIndex){
				linkIndex = p.listIndex;
			}
			if(linkIndex >= 0){
				if(linkIndex == 0){
					linkPages.push(p);
				} else if(linkIndex <= linkPages.length){
					linkPages.splice((linkIndex-1), 0, p);
				} else {
					linkPages.push(p);
				}
			}
			//console.log("Found child - " + JSON.stringify(p));
		}
	});
	
	return linkPages;
}

function buildParents(page, parents){
	if(!parents){
		parents = [];
	}
	parents.splice(0, 0, page);
	var pages = Platform.registry.pages;
	var parentPageId = page.parent;
	if(parentPageId && Object.keys(pages).indexOf(parentPageId) >= 0){
		var parentPage = pages[parentPageId];
		buildParents(parentPage, parents);
	}
}
//export this router to use in our server.js
module.exports = router;
