//propelics/models/device
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	name: String,
	description: String,
	identifinder: String,
	borrowing: {type: Schema.Types.ObjectId, ref: "Borrowing"},
	imageName: String
});

module.exports = mongoose.model('Device', deviceSchema);