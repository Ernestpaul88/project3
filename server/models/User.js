const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema(
  {

    firstName: { 
      type: String,
      unique: false 
    },
    lastName: { 
      type: String,
      unique: false 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      unique: false,
      required: true,
      minlength: 5
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
}

// set up pre-save middleware to create password
userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  } else {
    console.log('No password provided!');
  }

  next();
});




// Create reference to User & export
const User = model('User', userSchema);
module.exports = User;
