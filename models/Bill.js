var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var billSchema = new mongoose.Schema({
  number: String,
  bankName: String,
  balance: String
}, schemaOptions);

billSchema.methods.compareNumber = function(number, cb) {
  bcrypt.compare(number, this.number, function(err, isMatch) {
    cb(err, isMatch);
  });
};

var Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
