// requires..
var baseDB = Platform.requirePlugin("base.db.mongo");

// Collection: students
var studentBatchCollection ="student-batch";
exports.collection = studentBatchCollection;

exports.getStudentBatches = function getStudentBatches (selector, options, clbk)
{
	baseDB.findDocuments(studentBatchCollection, selector, options, clbk);
};


exports.saveStudentBatches = function saveStudentBatches(docs, options, clbk)
{
	baseDB.saveDocuments(studentBatchCollection, docs, options, clbk);
};


