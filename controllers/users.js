//user's model
var User = require('../models/user');

var usersController = {
	add : function(req, res){
			var user = new User();
			
			//adding atrributes
			user.first = req.body.first;
			user.last  = req.body.last;
			user.email = req.body.email;
			user.phone = req.body.phone;

			user.save(function(err){
				if (err){
					res.send(err);
				}
				res.json({message: 'New User successfully created.'});
			});
	},
	getAll : function(req, res){
				User.find(function(err, users){
					if (err){
						res.send(err);
					}
					res.json(users);
				});
	},
	findById : function(req, res){
				User.findById(req.params.id, function(err, user){
					if (err){
						res.send(err);
					}
					res.json(user);
				});
	},
	update : function(req, res){
				User.findById(req.params.id, function(err, user){
					if (err){
						res.send(err);
					}
					
					//adding atrributes
					user.first = req.body.first;
					user.last  = req.body.last;
					user.email = req.body.email;
					user.phone = req.body.phone;

					user.save(function(err){
						if (err){
							res.send(err);
						}
						res.json({message: 'User updated..'});
					});
				});
	},
	delete : function(req, res){
				User.remove({
					_id: req.params.id
				},function(err, user){
					if (err){
						res.send(err);
					}

					res.json({message: 'User successfully deleted'})
				});
	}
};

module.exports = usersController;