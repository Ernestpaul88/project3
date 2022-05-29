const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};




// Create reference to User & export
const User = model('User', userSchema);
module.exports = User;
