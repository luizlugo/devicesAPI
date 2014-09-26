var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var borrowingsSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: "User"},
	device: {type: Schema.Types.ObjectId, ref: "Device"},
	accessory: {type: Schema.Types.ObjectId, ref: "Accessory"},
	start: {type: Date, default: Date.now},
	end: Date
});

module.exports = mongoose.model('Borrowing', borrowingsSchema);