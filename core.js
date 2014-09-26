//core.js

//BASE SETUP
//==========================================================

//call the package we need
var express = require('express'),
	app 	= express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 8080,
	device = require('./controllers/devices'),
	user = require('./controllers/users'),
	accessory = require('./controllers/accessories'),
	borrowing = require('./controllers/borrowings');

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
//=================DEVICES=========================
router.route('/devices')
	.post(device.add)
	.get(device.getAll);

router.route('/devices/:id')
	.get(device.findById)
	.put(device.update)
	.delete(device.delete);

//=================USERS=========================
router.route('/users')
	.post(user.add)
	.get(user.getAll);

router.route('/users/:id')
	.get(user.findById)
	.put(user.update)
	.delete(user.delete);

//=================ACCESSORIES===================
router.route('/accessories')
	.post(accessory.add)
	.get(accessory.getAll);

router.route('/accessories/:id')
	.get(accessory.findById)
	.put(accessory.update)
	.delete(accessory.delete);

//=================BORROWINGS===================
//TODO: add borrowings routes
router.route('/borrowings')
	.post(borrowing.start)
	.get(borrowing.getAll);


//Register our routes
app.use('/API', router);

//START THE SERVER
//==========================================================
app.listen(port);
console.log('listen on port: ', port);