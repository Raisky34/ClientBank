var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Card = require('../models/Card');

/**
 * POST /transaction
 */
exports.transactionPost = function(req, res, next) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  Card.findOne({ number: req.body.billFrom }, function(err, card) {
      if (card) {
        return res.status(400).send({ msg: 'The card number you have entered is already associated with another account.' });
      }
      if (card.balnce >= req.body.price) {
        card.balnce -=  req.body.price;
        card.save(function(err) {});
      } else {
        res.send({ msg: "Your card don't have money." });
      }
  });
  Card.findOne({ number: req.body.billTo }, function(err, card) {
      if (card) {
        return res.status(400).send({ msg: 'The card number you have entered is already associated with another account.' });
      }
      card.balnce +=  req.body.price;
      card.save(function(err) {
        res.send({ msg: "Operation successfully." });
      });
  });
};
