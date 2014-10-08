//propelics/models/user
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	first : String,
	last  : String,
	email : String,
	phone : String,
	status: {type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);
