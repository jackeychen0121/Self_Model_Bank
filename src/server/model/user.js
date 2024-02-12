const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  bankNumber: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  transaction: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transactions'
  }]
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);