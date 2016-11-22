var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var cardSchema = new mongoose.Schema({
  numer: String,
  fullName: String,
  cvc: String,
  month: String,
  year: Date,
  balance: String
}, schemaOptions);

cardSchema.methods.compareNumber = function(number, cb) {
  bcrypt.compare(number, this.number, function(err, isMatch) {
    cb(err, isMatch);
  });
};

var Card = mongoose.model('Card', cardSchema);

module.exports = Card;
