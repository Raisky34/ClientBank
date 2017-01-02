var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var transactionsSchema = new mongoose.Schema({
  billFrom: String,
  billTo: String,
	payInfo: String,
  price: String
}, schemaOptions);

var Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;
