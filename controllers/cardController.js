var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Card = require('../models/Card');
var User = require('../models/User');
var _ = require('underscore');

/**
 * DELETE /account
 */
exports.cardDelete = function(req, res, next) {
  Card.remove({ _id: req.card.id }, function(err) {
    res.send({ msg: 'Your card has been permanently deleted.' });
  });
};

exports.getInfo = function(req, res, next) {
  Card.get({ _id: req.card.id }, function(err) {
    res.send({ card: 'Your card has been permanently deleted.' });
  });
};

exports.getAll = function(req, res, next) {
  var cardsArray = [];
  var asyncArray = [];
  async.waterfall([
    function(done) {
      User.findById(req.body.userId, function(err, user) {
        done(err, user);
      });
    },
    function(user, done) {
      user.card.map((id) => {
        asyncArray.push((done) => {
          Card.findById(id, function(err, card) {
            cardsArray.push(card);
            done();
          });
        })
      });
      asyncArray.push((done) => {
        res.send({ cards: cardsArray });
        done();
      });
      async.waterfall(asyncArray);
    }
  ]);
};


exports.newCardPost = function(req, res, next) {
  var errors = req.validationErrors();
  var isNewCard = true;
  if (errors) {
    return res.status(400).send(errors);
  }
  Card.findOne({ number: req.body.number }, function(err, card) {
      if (card) {
        isNewCard = false;
        return res.status(400).send({ msg: 'The card number you have entered is already associated with another account.' });
      }
      card = new Card({
        number: req.body.number,
        fullName: req.body.fullName,
        cvc: req.body.cvc,
        month: req.body.month,
        year: req.body.year,
        balance: 500
      });

      card.save(function(err) {
        res.send({ card: card });
      });
    });
};


/**
 * POST /card
 */
exports.cardPost = function(req, res, next) {
  var errors = req.validationErrors();
  var isNewCard = false;
  if (errors) {
    return res.status(400).send(errors);
  }
  Card.findOne({ number: req.body.number }, function(err, card) {
      if (!card) {
        isNewCard = true;
        return res.status(400).send({ msg: 'The card number you have entered not exist.' });
      }

      let cardId = card._id;
      User.findById(req.body.userId, function(err, user) {
				var result = -1;
				for (var i = 0; i < user.card.length; i++) {
					if (user.card[i].toString() === cardId.toString()) {
						result = 1;
					}
				}
				if(result == -1){
					if(req.body.number === card.number &&
						 req.body.fullName === card.fullName &&
						 req.body.cvc === card.cvc &&
						 req.body.month === card.month &&
						 req.body.year === card.year
						){
							 res.send({ card: card });
					}
					else {
						return res.status(400).send({ msg: 'The entered card information is not valid' });
					}
					console.log("user save");
					user.card.push(cardId);
					user.save();
				}
				else {
					return res.status(400).send({ msg: 'Card already added to your account' });
				}
      });
    });
};
