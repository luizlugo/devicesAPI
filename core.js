//core.js

//BASE SETUP
//==========================================================

//call the package we need
var express = require('express'),
	app 	= express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 8080,
	device = require('./controllers/devices');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());

//configure the database locally 
mongoose.connect('mongodb://@localhost:27017/propelics');

//ROUTES FOR OUR API
//==========================================================
var router = express.Router();  //get an instance of the express router

// Middleware to use for all requests
router.route('/devices')
	.post(device.add)
	.get(device.getAll);

router.route('/devices/:id')
	.get(device.findById)
	.put(device.update)
	.delete(device.delete);

//Register our routes
app.use('/API', router);

//START THE SERVER
//==========================================================
app.listen(port);
console.log('listen on port: ', port);