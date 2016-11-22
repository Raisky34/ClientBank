var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Card = require('../models/Card');
var User = require('../models/User');

/**
 * DELETE /account
 */
exports.cardDelete = function(req, res, next) {
  Card.remove({ _id: req.card.id }, function(err) {
    res.send({ msg: 'Your card has been permanently deleted.' });
  });
};

export.getInfo = function(req, res, next) {
  Card.get({ _id: req.card.id }, function(err) {
    res.send({ msg: 'Your card has been permanently deleted.' });
  });
};



/**
 * POST /card
 */
exports.cartPost = function(req, res, next) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  Card.findOne({ number: req.body.number }, function(err, card) {
      if (card) {
        return res.status(400).send({ msg: 'The card number you have entered is already associated with another account.' });
      }
      card = new Card({
        numer: req.body.numer,
        fullName: req.body.fullName,
        cvc: req.body.cvc,
        month: req.body.month,
        year: req.body.year,
        balnce: 500
      });
      card.save(function(err) {
        res.send({ card: card });
      });
    });
};
