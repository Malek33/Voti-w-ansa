const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({
    name: {type: String, required: true},
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
    created_at: { type: Date, default: Date.now },
    description: {type: String},
    // isVerified: {type: Boolean, default: false},
    phoneNumb: {type: Number, required: true},
    candidates: {type: Array},
    img: {type: String, default: 'media/imgs/organizationPic.png'},
    adress: {type: String},
    owner: {type: String}

})


const Organization = mongoose.model('Organization', organizationSchema)

module.exports = Organization