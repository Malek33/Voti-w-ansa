const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => /\S+@\S+\.\S+/.test(value),
            message: 'Invalid email address',
            },
        },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => isStrongPassword(value),
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        }},
    // password: {type: String, required: true},
    created_at: { type: Date, default: Date.now },
    isVerified: {type: Boolean, default: false},
    phoneNumb: {type: Number, required: true},
    birthdate: {
        type: Date,
        validate: {
          validator: isValidBirthdate,
          message: 'Invalid birth date. Age must be at least 18 years.',
        },
      },
    votes: {type: Array}

})

// Custom validator for password strength
function isStrongPassword(value) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
  }


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

const Candidate = mongoose.model('User', candidateSchema)

module.exports = Candidate