// requires..
var baseDB = Platform.requirePlugin("base.db.mongo");

// Collection: students
var studentsCollection ="students";
exports.collection = studentsCollection;

exports.getStudents = function (selector, options, clbk)
{
	baseDB.findDocuments(studentsCollection, selector, options, clbk);
};


exports.saveStudents = function (docs, options, clbk)
{
	baseDB.saveDocuments(studentsCollection, docs, options, clbk);
};


