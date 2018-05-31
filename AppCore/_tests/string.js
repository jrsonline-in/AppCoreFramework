var path = require('path');
var p = __dirname;
console.log(p.split("\\").join("/"));
console.log(path.delimiter)
fs = require("fs");
console.log(fs.realpathSync(p));