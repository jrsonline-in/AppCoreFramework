require("../platform");

(function(){ // MYSQL
	var ms = Platform.requirePlugin("base.db.mysql").mysql();

	ms.query("select * from users", function(res, flds){
		console.log("Result : " + JSON.stringify(res));
		console.log("Fields : " + JSON.stringify(flds));
	});

})();


(function(){ // mongodb
	var mongo = Platform.requirePlugin("base.db.mongo");

	mongo.findDocuments("products", {}, {}, function(prods){
		console.log("Products: " + JSON.stringify(prods));
	} );

})();