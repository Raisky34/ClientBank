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
exports.transactionPost = function(req, res, next) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

	Card.findOne({ _id: req.body.billFrom }, function(err, card) {
			if (!card) {
				return res.status(400).send({ msg: "Can't find choosen card in system" });
    	}

			if (Number(card.balance) >= Number(req.body.price)) {
				card.balance =  Number(card.balance) - Number(req.body.price);
      	card.save(function(err) {});
    	} else {
				return res.status(400).send({ msg: "You don't have enough money." });
  	}

		Bill.findOne({ bankName: req.body.bankName }, function(err, bill) {
			if (!bill) {
				return res.status(400).send({ msg: "Can't find bank bill in system" });
			}
			bill.balance =  Number(req.body.price) + Number(bill.balance);
			bill.save(function(err) {});

			let transactions = new Transactions({
				billFrom: req.body.billFrom,
				billTo: bill.id,
				price: req.body.price
			});
			transactions.save(function(err) {
				res.send({ transactions: transactions });
				//res.send({ msg: "Operation successfully." });
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
