var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

/**
 * GET /mobileTransaction
 */
exports.contactGet = function(req, res) {
  res.render('mobileTransaction', {
    title: 'MobileTransaction'
  });
};

/**
 * POST /contact
 */
exports.contactPost = function(req, res) {
  req.assert('operator', 'Name cannot be blank').notEmpty();
  req.assert('number', 'Number is not valid').notEmpty();
  req.assert('price', 'Price cannot be blank').notEmpty();

  var errors = req.validationErrors();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  var mailOptions = {
    from: req.body.name + ' ' + '<'+ req.body.email + '>',
    to: 'your@email.com',
    subject: '✔ Contact Form | Mega Boilerplate',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(err) {
    res.send({ msg: 'Thank you! Your operation has been submitted.' });
  });
};
