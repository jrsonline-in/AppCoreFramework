var url = "mongodb://localhost:27017";
var dbname = "excellence";

var MongoClient = require('mongodb').MongoClient;

// utility functions.

// to find documents against given selector
module.exports.findDocuments = function (collection, selector, options, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		var coll = db.collection(collection);
		console.log("Find On collection: [" + collection  + "] :: Selector : '" + JSON.stringify(selector) + "' :: Options : '" + JSON.stringify(options) + "'");
		coll.find(selector, options).toArray(function(err, res){
			if(err){
				console.log("Error in find.");
			}
			console.log("found on collection: [" + collection  + "]: " + JSON.stringify(res));
			client.close();
			// callback the listener
			if(callback){
				callback(res);
			}
		});
	});
}

// to save multiple documents
module.exports.saveDocuments = function (collection, docs, options, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log(dbname + " Database created!");
		var coll = db.collection(collection);
		console.log("saving docs : " + JSON.stringify(docs) + "\n in coll - " + collection );
		
		for(var i=0; i<docs.length; i++){
			coll.save(docs[i], options);
		}
		client.close();
		// callback the listener
		if(callback){
			callback({status:"success", docs:docs});
		}
	});
}

// to update documents against given selector 
module.exports.updateDocuments = function (collection, selector, updates, options, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log(dbname + " Database created!");
		var coll = db.collection(collection);
		console.log("updating " + JSON.stringify(updates) + " in docs for selector : " + JSON.stringify(selector) + "\n in coll - " + collection );
		
		coll.update(selector, updates, options);
		client.close();
		// callback the listener
		if(callback){
			callback({status:"success"});
		}
	});
}


//to remove documents against given selector
exports.removeDocuments = function (collection, selector, options, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log("Database created!");
		var coll = db.collection(collection);
		coll.remove(selector, options, function(err, res){
			if(err){
				console.log("Error in find.");
			}
			console.log("found: " + res);
			client.close();
			// callback the listener
			if(callback){
				callback(res);
			}
		});
	});
}

// check if pre-exists.
// if pre-exists, get that or create a new one
function getCollection(dbObj, collectionName, clbk){
	if(dbObj){
		dbObj.collectionNames(function(error, names){
			if(error){
				throw (error);
			} else {
				var _collection = undefined;
				if(names.includes(collectionName)){
					_collection = dbObj.collection(collectionName);
				} else {
					_collection = dbObj.createCollection(collectionName);
				}
				if(clbk){
					clbk(_collection);
				}
				return _collection;
			}
		});
	} else {
		throw (new Error("Unable to get names of collections on an invalid database object."))
	}
	
}

