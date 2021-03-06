//device model
var Device = require('../models/device');

var devicesController = {
	add : function(req, res){
			var device = new Device();
			
			//adding atrributes
			device.name = req.body.name;
			device.description = req.body.description;
			device.identifinder = req.body.identifinder;
			device.imageName = req.body.imageName;

			device.save(function(err){
				if (err){
					res.send(err);
				}
				res.json({message: 'New device successfully created.'});
			});
	},
	getAll : function(req, res){
				Device.find()
				  .populate({ path: 'borrowing' })
				  .exec(function(err, devices) {

				    var options = {
				      path: 'borrowing.user',
				      model: 'User'
				    };

				    if (err) return res.json(500);
				    Device.populate(devices, options, function (err, devices) {
				      res.json(devices);
				    });
				  });
	},
	findById : function(req, res){
				Device.find({_id: req.params.id})
				  .populate({ path: 'borrowing' })
				  .exec(function(err, devices) {

				    var options = {
				      path: 'borrowing.user',
				      model: 'User'
				    };

				    if (err) return res.json(500);
				    Device.populate(devices, options, function (err, devices) {
				      res.json(devices);
				    });
				  });
	},
	update : function(req, res){
				Device.findById(req.params.id, function(err, device){
					if (err){
						res.send(err);
					}
					
					//adding attributes
					device.name = req.body.name;
					device.description = req.body.description;
					device.identifinder = req.body.identifinder;
					device.imageName = req.body.imageName;

					device.save(function(err){
						if (err){
							res.send(err);
						}
						res.json({message: 'Device updated..'});
					});
				});
	},
	delete : function(req, res){
				Device.remove({
					_id: req.params.id
				},function(err, device){
					if (err){
						res.send(err);
					}

					res.json({message: 'Device successfully deleted'})
				});
	}
};

module.exports = devicesController;