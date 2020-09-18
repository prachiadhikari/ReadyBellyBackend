'use strict';

var contactSchema = require('../entity/ContactSchema.js');

function validator(req, res, next) {
	if (req.body.yourname == undefined || req.body.yourname === '') {
		console.log("Your name not found ");
		res.status(500);
		res.json({ status: 500, message: 'Your name is required' });
	} else if (req.body.youremail == undefined || req.body.youremail === '') {
		console.log("Your email not found ");
		res.status(500);
		res.json({ status: 500, message: 'Your email is required' });
	} else if (req.body.yourfeedback == undefined || req.body.yourfeedback === '') {
		console.log("Your feedback not found ");
		res.status(500);
		res.json({ status: 500, message: 'Your feedback is required' });
	} else {
		next();
	}
}

function insertIntoContact(req, res) {
	var contact = req.body;

	contactSchema.contactSchema.create({
		yourname: contact.yourname,
		youremail: contact.youremail,
		yourfeedback: contact.yourfeedback,

	}).then(function (success) {
		if (success) {
			console.log("Your query sent successfully ");
			res.json({ status: 200, message: "Your query sent successfully", contact: success });
		} else {
			console.log("Your query could not be Inserted");
			res.status(500);
			res.json({ message: "Could not insert Your query !!!", status: 500 })
		}
	}).catch(function (err) {
		console.log("err while inserting Your query");
		res.status(500);
		res.json({ message: "Could not insert Your query!!!", status: 500 })
	})
}

function fetchAllContacts(req, res, next) {
	console.log(req.params);
	contactSchema.contactSchema.findAll({
	}).then(function (result) {
		console.log("result here");
		res.status(200);
		res.json({
			contacts: result,
			status: 200,
			message: "All contacs shown"
		})	
	}, function (err) {
		console.log(err);
		res.status(500);
		res.json({ status: 500, message: "Unable to fetch contacts." });
	});
}

function deleteContact(req, res, next) {
  if (req.params.id === null || req.params.id === undefined) {
    res.status(500);
    res.json({ message: "Please specify id", status: 500 });
  } else {
    contactSchema.contactSchema
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(function (result) {
        if (result === 0) {
          res.status(500);
          res.json({ status: "500", message: "Could not delete." });
        }
        res.status(200);
        res.json({ message: "success", status: 200 });
      })
      .catch(function (err) {
        res.status(500);
        res.json({ status: "500", message: "Could not delete." });
      });
  }
}



module.exports = { validator,insertIntoContact,fetchAllContacts,deleteContact}; 


