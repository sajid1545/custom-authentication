const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require('mongoose');
require('dotenv').config();

// DB
mongoose.connect(process.env.DATABASE).then(() => console.log('DB connected'));

//middlewares
app.use(bodyParser.json());
app.use(cors());

// setting routes middleware

app.use('/api', require('./routes/auth'));

app.get('/', (req, res) => {
	res.send('Hello I am live');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});

module.exports = app;
