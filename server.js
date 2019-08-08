const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env (allows us to use environment variables anywhere in our application)
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8000;
const app = express();

// Dev logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.listen(port, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}.`);
});

// Profile routes
app.use('/api/v1/profile', require('./routes/profile'));
