'use strict';

var feedbackSchema = require('../entity/FeedbackSchema.js');
const UserSchema = require('../entity/UserSchema.js');


function validator(req, res, next) {
	if (req.body.message == undefined || req.body.message === '') {
		console.log("Message not found ");
		res.status(500);
		res.json({ status: 500, message: 'Product name is required' });
	} else {
		next();
	}
}

function insertIntoFeedback(req, res) {
	var feedback = req.body;

	feedbackSchema.feedbackSchema.create({
		message: feedback.message

	}).then(function (success) {
		if (success) {
			console.log("Feedback successfully inserted");
			res.json({ status: 200, message: "Feedback inserted successfully", product: success });
		} else {
			console.log("Feedback could not be Inserted");
			res.status(500);
			res.json({ message: "Could not insert Feedback!!!", status: 500 })
		}
	}).catch(function (err) {
		console.log("err while inserting feedback");
		res.status(500);
		res.json({ message: "Could not insert Feedback!!!", status: 500 })
	})
}


function fetchAllByUserId(req, res, next) {
	console.log(req.params)
	if (req.params.userId == undefined || req.params.userId === '') {
		res.status(500);
		res.json({ status: 200, message: "User id is required" });
	} else {
		feedbackSchema.feedbackSchema.findAll({
			include: [
				{
					model: UserSchema.userSchema,
					as: "user",
					attributes: ['fullname']
				}
			],
			where: {
				userId: req.params.userId
			}
		}).then(function (result) {
			res.status(200);
			res.json({
				products: result,
				status: 200,

			})
		}, function (err) {
			res.status(500);
			res.json({ status: 500, message: "Unable to fetch feedback." });
		});
	}
}

function fetchAllByFeedbackId(req, res, next) {
	console.log(req.params)
	if (req.params.feedbackId == undefined || req.params.feedbackId === '') {
		res.status(500);
		res.json({ status: 200, message: "Feedback id is required" });
	} else {
		feedbackSchema.feedbackSchema.findAll({
			where: {
				id: req.params.feedbackId
			}
		}).then(function (result) {
			res.status(200);
			res.json({
				feedback: result,
				status: 200,
			})
		}, function (err) {
			res.status(500);
			res.json({ status: 500, message: "Unable to fetch feedback." });
		});
	}
}


function fetchAllFeedback(req, res, next) {
	console.log(req.params);
	feedbackSchema.feedbackSchema.findAll({
		include: [
			{
				model: UserSchema.userSchema,
				as: "user",
				attributes: ['fullname']
			}
		]
	}).then(function (result) {
		console.log("result here");
		console.log(result);
		res.status(200);
		res.json({
			products: result,
			status: 200,
			message: "All feedback shown"
		})	
	}, function (err) {
		console.log(err);
		res.status(500);
		res.json({ status: 500, message: "Unable to fetch feedback." });
	});
}




module.exports = { validator, insertIntoFeedback,fetchAllByFeedbackId,fetchAllByUserId,fetchAllFeedback };