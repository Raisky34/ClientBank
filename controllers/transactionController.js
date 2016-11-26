var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Card = require('../models/Card');
var User = require('../models/User');
var Transactions = require('../models/Transactions');

/**
 * POST /transaction
 */
exports.transactionPost = function(req, res, next) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  let transactions = new Transactions({
    billFrom: req.body.billFrom,
    billTo: req.body.billTo,
    price: req.body.price
  });
  transactions.save(function(err) {
    res.send({ transactions: transactions });
  });
};

exports.getAll = function(req, res, next) {
  let transferArray = [];
  let asyncArray = [];
  async.waterfall([
    function(done) {
      User.findById(req.body.userId, function(err, user) {
        done(err, user);
      });
    },
    function(user, done) {
      user.card.map((id) => {
        asyncArray.push((done) => {
          Transactions.find({ billFrom: id }, function(err, transaction) {
            transferArray.push(transaction);
            done();
          });
        })
      });
      asyncArray.push((done) => {
        res.send({ operations: transferArray });
        done();
      });
      async.waterfall(asyncArray);
    }
  ]);
};
