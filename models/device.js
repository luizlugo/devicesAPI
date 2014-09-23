//propelics/models/device
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	name: String,
	description: String,
	identifinder: String
});

module.exports = mongoose.model('Device', deviceSchema);