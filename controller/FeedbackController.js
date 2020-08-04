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
			res.json({ status: 200, message: "Product inserted successfully", product: success });
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

function deleteProduct(req, res, next) {
	if (req.params.id === null || req.params.id === undefined) {
		res.status(500);
		res.json({ message: "Please specify id", status: 500 });
	} else {
		productSchema.productSchema.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(function (result) {
				if (result === 0) {
					res.status(500)
					res.json({ status: "500", message: "Could not delete." });
				}
				res.status(200);
				res.json({ message: "success", status: 200 });
			})
			.catch(function (err) {
				res.status(500)
				res.json({ status: "500", message: "Could not delete." });
			})
	}

}

function fetchAllByUserId(req, res, next) {
	console.log(req.params)
	if (req.params.userId == undefined || req.params.userId === '') {
		res.status(500);
		res.json({ status: 200, message: "User id is required" });
	} else {
		productSchema.productSchema.findAll({
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
			res.json({ status: 500, message: "Unable to fetch products." });
		});
	}
}

function fetchAllByProductId(req, res, next) {
	console.log(req.params)
	if (req.params.productId == undefined || req.params.productId === '') {
		res.status(500);
		res.json({ status: 200, message: "Product id is required" });
	} else {
		productSchema.productSchema.findAll({
			where: {
				id: req.params.productId
			}
		}).then(function (result) {
			res.status(200);
			res.json({
				products: result,
				status: 200,
			})
		}, function (err) {
			res.status(500);
			res.json({ status: 500, message: "Unable to fetch products." });
		});
	}
}


function fetchAllProducts(req, res, next) {
	console.log(req.params);
	productSchema.productSchema.findAll({
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
			message: "All products shown"
		})	
	}, function (err) {
		console.log(err);
		res.status(500);
		res.json({ status: 500, message: "Unable to fetch products." });
	});
}

function updateIntoProduct(req, res, next) {
	console.log("inside update product");
	var product = req.body;
	console.log(product);

	productSchema.productSchema.findOne({ 
		where: {
			id: product.id
		} 
	}).then(function (previousProduct) {
		if (previousProduct) {
			previousProduct.update({
				name: product.name,
				price: product.price,
				type: product.type,
				desc: product.desc,
				quantity: product.quantity,
				size: product.size,
				image: product.image,
				userId: product.user_id
			}).then(function (product) {
				console.log("Successfuly updated");
				res.status(200);
				res.json({status: 200, message: "Successfully updated", "product": product})
			}).catch(function(err){
				console.log(err);
				res.status(500);
				res.json({status:500, message:"Could not update!"});
			});
		}
	}).catch(function (err) {
		console.log(err);
		console.log("err while inserting product");
		res.status(500);
		res.json({ message: "Could not insert Product!!!", status: 500 })
	});

}


module.exports = { validator, insertIntoFeedback };