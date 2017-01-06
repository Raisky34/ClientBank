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
var Bill = require('../models/Bill');

/**
 * POST /transaction
 */
exports.paymentPost = function(req, res, next) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

	Card.findOne({ _id: req.body.billFrom }, function(err, card) {
		if (!card) {
			return res.status(400).send({ msg: "Can't find choosen card in system" });
    }

		Bill.findOne({ bankName: req.body.bankName }, function(err, bill) {
			if (!bill) {
				return res.status(400).send({ msg: "Can't find bank bill in system" });
			}

			if (Number(card.balance) >= Number(req.body.price)) {
				card.balance =  Number(card.balance) - Number(req.body.price);
				card.save(function(err) {});
			} else {
				return res.status(400).send({ msg: "You don't have enough money." });
			}

			bill.balance =  Number(req.body.price) + Number(bill.balance);
			bill.save(function(err) {});

			let transactions = new Transactions({
				billFrom: card.number,
				billTo: bill.number,
				payInfo: req.body.payInfo,
				price: req.body.price
			});
			transactions.save(function(err) {
				res.send({ msg: "Payment successfully." });
			});
  	});
	});
};

exports.transferPost = function(req, res, next) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

	Card.findOne({ _id: req.body.cardFrom }, function(err, cardFrom) {
		if (!cardFrom) {
			return res.status(400).send({ msg: "Can't find card in system which is money source." });
    }

		Card.findOne({ number: req.body.cardTo }, function(err, cardTo) {
			if (!cardTo) {
				return res.status(400).send({ msg: "Can't find card in system to transfer money." });
	    }

			if (Number(cardFrom.balance) >= Number(req.body.moneyCount)) {
				cardFrom.balance =  Number(cardFrom.balance) - Number(req.body.moneyCount);
				cardFrom.save(function(err) {});
			} else {
				return res.status(400).send({ msg: "You don't have enough money." });
			}

			cardTo.balance =  Number(req.body.moneyCount) + Number(cardTo.balance);
			cardTo.save(function(err) {});

			var payInfo = "Tranfer money from card to card";

			let transactions = new Transactions({
				billFrom: cardFrom.number,
				billTo: cardTo.number,
				payInfo: payInfo,
				price: req.body.moneyCount
			});
			transactions.save(function(err) {
				res.send({ msg: "Transfer successfully." });
			});
		});
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
            Card.findById(id, function(err, card) {
              Transactions.find({ billFrom: card.number }, function(err, transaction) {
								transaction.forEach(function(operation) {
	                transferArray.push(operation);
								})
                done();
              });
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
