var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var Bill = require('../models/Bill');

exports.getBillInfo = function(req, res, next) {
  Bill.findOne({ bankName: req.body.bankName }, function(err, bill) {
    res.send({ bill: bill});
  });
};

exports.getAllBills = function(req, res, next) {
	Bill.find({}, function(err, bills) {
		res.send(bills);
	});
}

exports.createBillPost = function(req, res, next) {
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }
  Bill.findOne(
		{
			$or: [
            { number: req.body.number  },
            { bankName: req.body.bankName }
          ]
		}, function(err, bill) {
      if (bill) {
        return res.status(400).send({ msg: 'The enetered bill is already exists in system' });
      }
      bill = new Bill({
        number: req.body.number,
        bankName: req.body.bankName,
        balance: 0
      });

      bill.save(function(err) {
        res.send({ msg: "Add bank bill in system successfully." });
      });
    });
};
