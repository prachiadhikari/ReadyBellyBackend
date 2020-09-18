'use strict';

var bcrypt = require('bcrypt');
var userSchema = require('../entity/UserSchema.js');
var UserType = require("../enums/UserTypeEnum");
const { Op } = require("sequelize");
const UserSchema = require('../entity/UserSchema.js');
const EmailSender = require("./EmailSender.js");
const EmailTemplates = require("./EmailTemplates.js");


function validator(req, res, next) {
	if (req.body.email === '' || req.body.password === '') {
		res.status(500);
		res.json({status:500, message: 'email and password is required'});
	} else if (req.body.fullname === '') {
		console.log("fullname not found ");
		res.status(500);
		res.json({status:500, message: 'Fullname is required'});
	} else if (req.body.address1 === '') {
		console.log("address not found ");
		res.status(500);
		res.json({status:500, message: 'address is required'});
	} else if (req.body.mobile === '') {
		console.log("mobile not found ");
		res.status(500);
		res.json({status:500, message: 'mobile is required'});
	} else if (req.body.phone === '') {
		console.log("phone not found ");
		res.status(500);
		res.json({status:500, message: 'phone is required'});
	} else if (req.body.password === '') {
		console.log("password not found ");
		res.status(500);
        res.json({status:500, message: 'password is required'});
	} else if(!UserType.exists(req.body.user_type)) {
		console.log(req.body.user_type);
		console.log("User type invalid or not found.");
		res.status(500);
		res.json({status: 500, message: "User type invalid or not found"});
	} else {
	next();
	} 
}


function checkEmail(req, res, next) {
	if (req.body.email === "" || req.body.password === "") {
	  res.status(500);
	  res.json({ status: 500, message: "email and password is required" });
	} else {
	  fetchUserByUsername(req.body.email).then(function (result) {
		if (result) {
		  console.log("Username already exists.");
		  res.status(500);
		  res.json({ status: "500", message: "Username already exists" });
		} else {
		  next();
		}
	  });
	}
  }

  function generateHash(req, res, next) {
	console.log("Inside generate hash");
	var saltRounds = 10;
	console.log(req.body.password);
	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
	  if (hash) {
		console.log(hash);
		updateIntoUser(req.body, hash);
		res.json({
		  token: hash,
		  status: 200,
		  message: "User successfully inserted!",
		});
	  } else if (err) {
		res.json({ message: "cannot generateHash", status: 500 });
	  }
	});
  }
function updateIntoUser(user, hashedPassword) {
	userSchema.userSchema
	  .create({
		fullname: user.fullname,
		email: user.email,
		password: hashedPassword,
		user_type: user.user_type,
		phone: user.phone,
		mobile: user.mobile,
		address1: user.address1,
		restaurantname:user.restaurantname,
		image_path: user.imagePath,
		isApproved: user.user_type === UserType.VENDOR ? false : true,
	  })
	  .then(function (success) {
		if (success) {
		  console.log("user successfully inserted");
		} else {
		  console.log("User could not be Inserted");
		  res.status(500);
		  res.json({ message: "Could not insert USER!!!", status: 500 });
		}
	  })
	  .catch(function (err) {
		console.log(err);
		console.log("err while inserting user");
		res.status(500);
		res.json({ message: "Could not insert USER!!!", status: 500 });
	  });
  }
function updateUsers(req, res, next) {
	console.log("inside update user");
	var user = req.body;
	console.log(user);
  
	userSchema.userSchema.findOne({ 
	  where: {
		id: user.id
	  } 
	}).then(function (previousUser, hashedPassword) {
	  if (previousUser) {
		previousUser.update({
			fullname: user.fullname,
			email: user.email,
			password: hashedPassword,
			user_type: user.user_type,
			phone: user.phone,
			mobile: user.mobile,
			address1: user.address1,
			restaurantname:user.restaurantname,
			image_path: user.imagePath,
		}).then(function (user) {
		  console.log("Successfuly updated");
		  res.status(200);
		  res.json({status: 200, message: "Successfully updated", "user": user})
		}).catch(function(err){
		  console.log(err);
		  res.status(500);
		  res.json({status:500, message:"Could not update!"});
		});
	  }
	}).catch(function (err) {
	  console.log(err);
	  console.log("err while inserting user");
	  res.status(500);
	  res.json({ message: "Could not insert User!!!", status: 500 })
	});
  
  }
  function fetchAllByUserType(req, res, next) {
	userSchema.userSchema
	   .findAll({
		 where: {
		   user_type: {
			 [Op.eq]: UserType.VENDOR
		   },
		 }, 
	   })
	   .then(
		 function (result) {
		   res.status(200);
		   res.json({
			 users: result,
			 status: 200,
			 message: "All vendors shown",
		   });
		 },
		 function (err) {
		   console.log(err);
		   res.status(500);
		   res.json({ status: 500, message: "Unable to fetch users." });
		 }
	   );
   }

function fetchAllByUserId(req, res, next) {
	console.log(req.params)
	if (req.params.userId == undefined || req.params.userId === '') {
		res.status(500);
		res.json({ status: 200, message: "user id is required" });
	} else {
		UserSchema.userSchema.findOne({
			where: {
				id: req.params.userId
			}
		}).then(function (result) {
			res.status(200);
			res.json({
				user: result,
				status: 200,
			})
		}, function (err) {
			res.status(500);
			res.json({ status: 500, message: "Unable to fetch ptofile." });
		});
	}
}
function fetchAllUsers(req, res) {
	userSchema.userSchema.findAll({
		where: {
			user_type: {
				[Op.ne]: UserType.ADMIN
			}
		}
	}).then(function (result) {
		res.status(200);
		res.json({
			products: result,
			status: 200,
			message: "All users shown"
		})	
	}, function (err) {
		console.log(err);
		res.status(500);
		res.json({ status: 500, message: "Unable to fetch users." });
	});
}
function fetchUserByUsername(username) {
	return userSchema.userSchema.findOne({
	  where: {
		email: username,
		isApproved: true,
	  },
	});
  }
function fetchUserByUserId(id) {
	return userSchema.userSchema.findOne({
	  where: {
		id: id,
		isApproved: true,
	  }
	});
  }
  async function sendUserApprovalEmail(userIdr) {
	let user = await fetchUserByUserId(userId);
	let bodyHtml = EmailTemplates.getUserApprovalEmailHtml(user);
	let emailObj = EmailSender.getEmailObject(user.email, "User Approved!", null, bodyHtml);
	try {
		await EmailSender.sendEmail(emailObj);
	} catch (err) {
		console.log("Could not send email for reason :: " + err );
		console.log(err);
	} 
}


function approveUser(req, res) {
	console.log(req.params);
	var purchase = req.body;
	console.log(purchase);
	userSchema.userSchema
	  .update(
		{
		  isApproved: true,
		},
		{
		  where: {
			id: req.params.userId,
		  },
		}
	  )
	  .then(
		function (user) {
		  sendUserApprovalEmail(user);
		  res.status(200);
		  res.json({
			status: 200,
			message: "User successfully approved",
		  });
		},
		function (err) {
		  console.log(err);
		  res.status(500);
		  res.json({
			status: 500,
			message: "Unable to approve user",
		  });
		}
	  );
  }

  function deleteUser(req, res, next) {
	if (req.params.id === null || req.params.id === undefined) {
	  res.status(500);
	  res.json({ message: "Please specify id", status: 500 });
	} else {
	  userSchema.userSchema
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
module.exports = {validator, generateHash,checkEmail,fetchAllByUserType,updateUsers,deleteUser, fetchUserByUsername, fetchAllUsers, approveUser,fetchAllByUserId};
