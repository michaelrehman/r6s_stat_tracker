const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env (allows us to use environment variables anywhere in our application)
dotenv.config({ path: './config.env' });

const app = express();

// Dev logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Profile routes
app.use('/api/v1/profile', require('./routes/profile'));
app.use('/api/v1/results', require('./routes/results'));

if (process.env.NODE_ENV === 'production') {
	// Static folder
	app.use(express.static(__dirname + '/public'));
	// SPA Handling
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}.`);
});
