// variables.
var ct = "Content-Type";
var ct_json = "application/json";
var ct_html = "text/html";

//utility to set headers with JSON.
exports.setHeader = function setHeader(res){
	var header = {
	    	ct: this.ct_json,
			"Access-Control-Allow-Origin" : "*", // Required for CORS support to work
	    	"Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
			};
	res.set(header);
	return header;

}
