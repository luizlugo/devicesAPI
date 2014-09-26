var Accessory = require('../models/accessory');

var accessoriesController = {
	add : function(req, res){
			var accessory = new Accessory();
			
			//adding atrributes
			accessory.name = req.body.name;
			accessory.color = req.body.color;
			accessory.size = req.body.size;

			accessory.save(function(err){
				if (err){
					res.send(err);
				}
				res.json({message: 'New device successfully created.'});
			});
	},
	getAll : function(req, res){
				Accessory.find(function(err, accessory){
					if (err){
						res.send(err);
					}
					res.json(accessory);
				});
	},
	findById : function(req, res){
				Accessory.findById(req.params.id, function(err, accessory){
					if (err){
						res.send(err);
					}
					res.json(accessory);
				});
	},
	update : function(req, res){
				Accessory.findById(req.params.id, function(err, accessory){
					if (err){
						res.send(err);
					}
					
					//adding atrributes
					accessory.name = req.body.name;
					accessory.color = req.body.color;
					accessory.size = req.body.size;

					accessory.save(function(err){
						if (err){
							res.send(err);
						}
						res.json({message: 'Device updated..'});
					});
				});
	},
	delete : function(req, res){
				Accessory.remove({
					_id: req.params.id
				},function(err, accessory){
					if (err){
						res.send(err);
					}

					res.json({message: 'Device successfully deleted'})
				});
	}

};

module.exports = accessoriesController;