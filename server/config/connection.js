/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const MONGO_LOCAL_URL = 'mongodb://localhost/project3';

mongoose.connect(
	process.env.MONGODB_URI || MONGO_LOCAL_URL,
	{
	  useNewUrlParser: true, 
	  useUnifiedTopology: true,
	}
  );

const db = mongoose.connection;

db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`);
});

module.exports = db;
