var Borrowing = require('../models/borrowing');
var Device = require('../models/device');
 
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

				/*looking for the device in order 
				to update its borrowingId*/
				Device.findById(req.body.device, function(err, device){
					if (err){
						res.send(err);
					}
					
					//adding attributes
					device.borrowing = borrowing._id;

					device.save(function(err){
						if (err){
							res.send(err);
						}
						res.json({borrowing: borrowing});
					});
				});
				
			});
	},
	end : function(req, res){
			Borrowing.findById(req.params.id)
			.exec(function(err, borrowing){
					if (err){
						res.send(err);
					}
					//ending the borrowing with the current date and hour
					borrowing.end = Date.now();
					borrowing.save(function(err){
						if (err){
							res.send(err);
						}

						/*looking for the device in order 
						to update its borrowingId*/
						Device.findById(req.body.deviceId, function(err, device){
							if (err){
								res.send(err);
							}
							//releasing the phone
							device.borrowing = null;
							device.save(function(err){
								if (err){
									res.send(err);
								}
								res.json({device: device});
							});
						});
					});
			});
	},
	getAll: function(req, res){
			//TODO: delete this method, it is just for testing purpouse
			Borrowing.find()
					 .populate("user")
					 .populate("device")
					 .populate("accessory")
					 .exec(function(err, borrowings){
							  if (err){
								res.send(err);
							  }
							  res.json(borrowings);
					});
	},
	getById: function(req, res){
			Borrowing.find({_id: req.params.id})
					 .populate("user")
					 .populate("device")
					 .populate("accessory")
					 .exec(function(err, borrowings){
							  if (err){
								res.send(err);
							  }
							  res.json(borrowings);
					});
	},
	getDeviceHistory: function(req, res){
			console.log('getDeviceHistory method');
			//History of a device
			Borrowing.find({device: req.params.id})
					 .where("start").ne(null)
					 .where("end").ne(null)
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