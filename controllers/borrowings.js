var Borrowing = require('../models/borrowing');

var borrowingsController = {
	start : function(req, res){
			var borrowing = new Borrowing();

			//adding atrributes
			borrowing.user = req.body.user;
			borrowing.device = req.body.device;
			borrowing.accessory = req.body.accessory;

			borrowing.save(function(err){
				if (err){
					res.send(err);
				}
				res.json({message: 'Borrowing successfully created.'});
			});
	},
	end : function(req, res){
			//TODO: create end functionality
	},
	getAll: function(req, res){
			//TODO: delete this method, it is just for testing purpouse
			Borrowing.find(function(err, borrowings){
				if (err){
					res.send(err);
				}
				res.json(borrowings);
			});
	},
	getListByDeviceId: function(deviceId){
						//History of a device
						Borrowing.find({device: deviceId})
								 .where('start').ne('null')
								 .where('end').ne('null')
								 .populate("user")
								 .populate("device")
								 .populate("accessory")
								 .exec(function(err, borrowing){
										 if (err){
											 res.send(err);
										 }
										 res.json(borrowing);
						});
	},
	isAvailable: function(deviceId){
					Borrowing.find({device: deviceId})
							 .where('start').ne('null')
							 .where('end').in(['null'])
							 .limit(1)
							 .populate("user")
							 .populate("device")
							 .populate("accessory")
							 .exec(function(err, borrowing){
									if (err){
										res.send(err);
									}
									res.json(borrowing);
					});
	}	
};

module.exports = borrowingsController;