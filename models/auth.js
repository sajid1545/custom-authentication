const { UUID } = require('bson');
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},

	password: {
		type: String,
		required: true,
	},
	uid: {
		type: String,
		required: true,
	},
	roles: {
		type: String,
		default: 'user',
	},
});

//Export the model
module.exports = mongoose.model('User', userSchema);
