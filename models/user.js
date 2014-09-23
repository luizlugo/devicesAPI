//propelics/models/user
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		first : String,
		last  : String
	},
	email : String,
	phone : String 
});

module.exports = mongoose.model('User', userSchema);
