const User = require('../models/auth');
const bcrypt = require('bcrypt');
const { v5: uuidv5 } = require('uuid');

const register = async (req, res) => {
	const { name, email, password } = req.body;

	const isUserExists = await User.findOne({ email: email });

	if (isUserExists) {
		return res.status(400).json({
			message: 'User already exists',
		});
	}

	try {
		const hashPass = await bcrypt.hash(password, 10);

		const trimmedName = name.replace(/\s+/g, '_')
		const uniqueToken = uuidv5(`${trimmedName}`, process.env.MY_NAMESPACE);

		const fullUniqueToken = `${trimmedName}_${uniqueToken}`;

		const result = await User.create({
			name,
			email,
			password: hashPass,
			uid: fullUniqueToken,
		});

		console.log(result);

		res.status(200).json({ success: true, message: `New user ${name} created!`, result });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	register,
};
