// requires..
//var baseDB = require('../base/base_db');
var baseDB = Platform.requirePlugin("base.db.mongo");

// Collection: courses
var coursesCollection ="courses";
exports.collection = coursesCollection;

exports.getCourses = function (selector, options, clbk)
{
	baseDB.findDocuments(coursesCollection, selector, options, clbk);
};


exports.saveCourses = function (docs, options, clbk)
{
	baseDB.saveDocuments(coursesCollection, docs, options, clbk);
};



