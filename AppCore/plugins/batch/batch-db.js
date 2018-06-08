// requires..
var baseDB = Platform.requirePlugin("base.db.mongo");

// Collection: batches
var batchesCollection ="batches";
exports.collection = batchesCollection;

exports.getBatches = function (selector, options, clbk)
{
	baseDB.findDocuments(batchesCollection, selector, options, clbk);
};


exports.saveBatches = function (docs, options, clbk)
{
	baseDB.saveDocuments(batchesCollection, docs, options, clbk);
};



