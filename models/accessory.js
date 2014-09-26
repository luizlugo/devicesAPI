var moongose = require('mongoose');
var Schema = moongose.Schema;

var accessorySchema = new Schema({
	name: String,
	color: String,
	size: String
});

module.exports = moongose.model('Accessory', accessorySchema);