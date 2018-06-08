
// application: launch
(function start(){
	//load platform
	require("./platform");

	// Platform : bootstrap
	Platform.bootstrap();

	// register web services.
	Platform.registerWebServices();

	//register static clients
	Platform.registerStaticClients();
	
	// load web pages
	Platform.registerWebPages();

	// web server : start
	var serverPort = 8080;
	Platform.app.listen(serverPort, function(){
		console.log("Listenting on port: " + serverPort )
	}); 
	
})();



/*
// Link: static HTML/angular pages 
app.use(express.static("../client"));

// Link : products service
var productsService = require('./services/products/products_service.js');
app.use('/products', productsService);

//Link : addresses service
var addressesService = require('./services/addresses/addresses_service.js');
app.use('/addresses', addressesService);

//Link : upload service
var uploadService = require('./services/common/upload_service.js');
app.use('/upload', uploadService);

//Link : users service
var usersService = require('./services/users/users_service.js');
app.use('/users', usersService);

//Link : users service
var ordersService = require('./services/orders/orders_service.js');
app.use('/orders', ordersService);
*/

