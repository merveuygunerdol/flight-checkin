const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connectionString = process.env.DB_URL || 'mongodb://localhost/flight';
mongoose.connect('mongodb://localhost/flight');
