const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
          validator: (value) => /\S+@\S+\.\S+/.test(value),
          message: 'Invalid email address',
          },
      },
    password: {
      type: String,
      required: true,
      },
    // password: {type: String, required: true},
    created_at: { type: Date, default: Date.now },
    isVerified: {type: Boolean, default: false},
    phoneNumb: {type: Number, required: true},
    birthdate: {type: Date, required: true},
    cin: {type: String, required: true},
    vote: {type: String, default: 'none'}

})

function isValidBirthdate(value) {
    // Check if the user is at least 18 years old
    const minAge = 16;
    const currentDate = new Date();
    const userBirthdate = new Date(value);
    const age = currentDate.getFullYear() - userBirthdate.getFullYear();

    if (age < minAge) {
      return false;
    }

    return true;
  }

const User = mongoose.model('User', userSchema)

module.exports = User