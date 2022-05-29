/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose');
const MONGO_LOCAL_URL = 'mongodb://localhost/project3';

mongoose.connect(
	process.env.MONGODB_URI || MONGO_LOCAL_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}
  );

  module.exports = mongoose.connection;

