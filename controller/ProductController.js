'use strict';

var productSchema = require('../entity/ProductSchema.js');
var ProductType = require("../enums/ProductTypeEnum");
const UserSchema = require('../entity/UserSchema.js');
const { Op } = require("sequelize");

function validator(req, res, next) {
	if (req.body.name == undefined || req.body.name === '') {
		console.log("Product name not found ");
		res.status(500);
		res.json({ status: 500, message: 'Product name is required' });
	} else if (req.body.price == undefined || req.body.price === '') {
		console.log("Price not found ");
		res.status(500);
		res.json({ status: 500, message: 'Price is required' });
	} else if (req.body.desc == undefined || req.body.desc === '') {
		console.log("Description not found ");
		res.status(500);
		res.json({ status: 500, message: 'Description is required' });
	} else if (!ProductType.exists(req.body.type)) {
		console.log("Product type not found ");
		res.status(500);
		res.json({ status: 500, message: 'Product Type is required' });
	} else if (!req.headers.authorization && (req.body.quantity == undefined || req.body.quantity === '')) {
		console.log("Quantity is required ");
		res.status(500);
		res.json({ status: 500, message: 'Quantity is required' });
	} else {
		next();
	}
}

function insertIntoProduct(req, res) {
	var product = req.body;

	productSchema.productSchema.create({
		name: product.name,
		price: product.price,
		type: product.type,
		desc: product.desc,
		quantity: product.quantity,
		size: product.size,
		image: product.image,
		userId: req.tokenInfo.userId

	}).then(function (success) {
		if (success) {
			console.log("Product successfully inserted");
			res.json({ status: 200, message: "Product inserted successfully", product: success });
		} else {
			console.log("Product could not be Inserted");
			res.status(500);
			res.json({ message: "Could not insert Product!!!", status: 500 })
		}
	}).catch(function (err) {
		console.log("err while inserting product");
		res.status(500);
		res.json({ message: "Could not insert Product!!!", status: 500 })
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
					attributes: ['fullname', 'id']
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

function fetchProductByProductName(productName) {
	return productSchema.productSchema.findOne({
		where: {
			productName: productName
		}
	});
}
function fetchProductByProductSize(productSize) {
	return productSchema.productSchema.findOne({
		where: {
			productSize: productSize
		}
	});
}

function fetchAllProducts(req, res, next) {
	console.log(req.params);
	productSchema.productSchema.findAll({
		include: [
			{
				model: UserSchema.userSchema,
				as: "user",
				attributes: ['fullname', 'id']
			}
		]
	}).then(function (result) {
		console.log("result here");
		//console.log(result);
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

function searchProduct (req, res, next)  {
    productSchema.productSchema.findAll({
        where: {
            [Op.or]: [
                {
                    id : { [Op.eq]: req.params.search }
                },
                {
                    name : { [Op.eq] : req.params.search }
                },
                {
                    type : { [Op.eq] : req.params.search }
                },
                {
                    size : { [Op.eq] : req.params.search }
                },
            ]
        }
    }).then(data => {
        res.json(data)
    }).catch(next)
};


module.exports = { validator,fetchAllByProductId, fetchProductByProductName, deleteProduct, updateIntoProduct,fetchProductByProductSize, fetchAllByUserId, fetchAllProducts, insertIntoProduct, searchProduct };