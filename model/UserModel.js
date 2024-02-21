const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlenght: [3, "name must contain at least 3 characters"],
    maxlenght: [50, "name must contain a maximum of 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "lastname is required"],
    minlenght: [3, "lastname must contain at least 3 characters"],
    maxlenght: [50, "lastname must contain a maximum of 50 characters"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "this email is already in use"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minLenght: [8, "password must contain at least 8 characters"],
  },

  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],

  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
module.exports = User;

