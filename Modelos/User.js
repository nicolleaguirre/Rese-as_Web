const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verificationCode: {
    type: String,
    required: false
  },
  isVerified: { 
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);
