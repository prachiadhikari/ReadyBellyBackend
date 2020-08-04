const UserTypeEnum = require("../enums/UserTypeEnum.js");

module.exports = (function() {
	var userController = require("./UserController.js");
   
var bcrypt = require("bcrypt");
var users = require("../entity/UserSchema.js");
var jwt = require("jsonwebtoken");


var secretOrPrivateKey = "SecretKeyCanBeAnythingWhichIsUsedWhileEncodingORdEcoding.";


function validator(req, res, next) {
	console.log("inside validator");
	if (req.body.email === '' || req.body.password === '') {
		res.status(400);
		res.json({message: "email or password not found.", status: 400});
		return;
	}

	console.log(users);
	userController.fetchUserByUsername(req.body.email)
	.then(function(result) {
		console.log("successfully found");
		if(!result) {
			res.status(404);
			res.json({message: "User not found", status: 404});
			return;
		}
		console.log(result + " here");
		req.hashedPassword = result.dataValues.password;
		req.userData = result.dataValues;
		next();
		
	})
	.catch(function(err) {
		console.log(err);
		console.log("user not found.");
	})
}

function passwordChecker(req, res, next) {
	console.log(req.body.password);
	bcrypt.compare(req.body.password, req.hashedPassword)
		.then(function(result) {
			console.log(result);

			if(result) {
				next();
			} else {
				res.status(403);
				res.json({status: 403, message: "Username or password donot match"});
			}
			
		})
		.catch(function(error) {
			console.log(error);
		})
	
}

function jwtTokenGen(req, res, next) {
	/*
	 * Bearer token because user bears token
	 * sign token using payload below so that it can be decoded to get payload
	 * payload is user details (usually)
	 */
	console.log("inside jwt token generator");
	var payload = {
		email: req.body.email, 
		userType: req.userData.user_type,
		userId: req.userData.id
	}

	jwt.sign(payload, secretOrPrivateKey, {expiresIn: "10h"}, function(err, result) {
		var token = result;
		userController.fetchUserByUsername(req.body.email).then(function(result){
			if (result) {
				console.log("logged in user data");
				console.log(result.email);
				console.log(result.fullname);
				res.json(
						{
							"userToken": token,
							"user": result,
							"status":200,
							"message":"Login Success"
						}
					)		
			} else {
				next();	
			}
		});
	});

}

function isVendor(req, res, next) {
	console.log("*****************************Inside vendor validation ****************************");
	console.log(req.tokenInfo);

	if (req.tokenInfo.userType == UserTypeEnum.VENDOR) {
		next();
	} else {
		res.status(403);
		res.json({status: 403, message: "Forbidden because user type is :: " + req.tokenInfo.userType});
		return;
	}
}

function isAdmin(req, res, next) {
	console.log("*****************************Inside Admin validation ****************************");
	console.log(req.tokenInfo);

	if (req.tokenInfo.userType == UserTypeEnum.ADMIN) {
		next();
	} else {
		res.status(403);
		res.json({status: 403, message: "Forbidden because user type is :: " + req.tokenInfo.userType});
		return;
	}
}

function isUser(req, res, next) {
	console.log("*****************************Inside user validation ****************************");
	if (req.tokenInfo.userType == UserTypeEnum.USER) {
		next();
	} else {
		res.status(403);
		res.json({status: 403, message: "Forbidden because user type is :: " + req.tokenInfo.userType});
	}
}

function verifyToken(req, res, next) {
	/*
	 * req.headers.authorization 	
	 * To send from client: Bearer[space]token 
	 */
	 console.log(req.headers);
	 if (req.headers.authorization) {
     var token = req.headers.authorization.slice(
       7,
       req.headers.authorization.size
     );
     jwt.verify(token, secretOrPrivateKey, function (err, result) {
       if (result) {
         console.log("token verified");
         req.tokenInfo = result;
         next();
       } else if (err) {
         console.log("token not verified");
         res.status(403);
         res.json({ status: "403", message: "Forbidden" });
       }
     });
   } else {
     res.status(403);
     res.json({ status: 403, message: "Forbidden" });
   }
}

return {passwordChecker, validator, jwtTokenGen, verifyToken, isVendor, isUser, isAdmin};
})();