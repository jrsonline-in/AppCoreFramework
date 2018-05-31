
module.exports.mysql = function(){
	return new MySQL();
}

function MySQL(){
	var mysql = require('mysql');

	// For every call to connect() method, one must call the end() method after running all queries to free up the resources.
	this.connect = function connect(){
		var con = mysql.createConnection({
			  host: "localhost",
			  user: "jrsexc",
			  password: "jrsexc",
			  database: "school_crm"
		});

		con.connect(function(err){
			if(err) {
				throw err;
			}
		});
		return con;
	}
	
	this.query = function query(sql, callback){
		var con = this.connect();
		con.query(sql, function (error, results, fields) {
			  if (error) throw error;
			  if(callback){
				  callback(results, fields);
			  }
			});
		
		this.end(con);
	}
	
	// One must call the end() method after running all queries to free up the resources if the connect() method was called earlier.
	this.end = function (con){
		con.end();
	}
}

