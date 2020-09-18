const { purchaseSchema } = require("../entity/PurchaseSchema");

module.exports = (function () {
  "use strict";

  const PurchaseSchema = require("../entity/PurchaseSchema");
  const PurchaseStatusEnum = require("../enums/PurchaseStatusEnum");
  const UserSchema = require("../entity/UserSchema.js");
  const ProductSchema = require("../entity/ProductSchema.js");
  const UserTypeEnum = require("../enums/UserTypeEnum");
  const Utils = require("../utils/Utils");

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  let isNullOrUndefined = (obj) => obj === null || obj === undefined;

  function confirmBooking(req, res) {
    console.log(req.body);
    if (isNullOrUndefined(req.body) || isEmpty(req.body)) {
      res.status(500);
      res.json({ status: 500, message: "Products not provided!" });
      return;
    }

    var bookings = req.body.map((booking) => {
      booking.userId = req.tokenInfo.userId;
      booking.status = PurchaseStatusEnum.PENDING;
      booking.price = booking.price * booking.quantity;
      return booking;
    });

    PurchaseSchema.purchaseSchema
      .bulkCreate(bookings, { returning: true })
      .then(function (success) {
        if (success) {
          console.log("Product successfully booked");
          res.json({
            status: 200,
            message: "Product (s) booked successfully",
            product: success,
          });
        } else {
          console.log("Product could not be booked");
          res.status(500);
          res.json({ message: "Could not book Product!!!", status: 500 });
        }
      })
      .catch(function (err) {
        console.log(err);
        console.log("err while booking product");
        res.status(500);
        res.json({ message: "Could not book Product!!!", status: 500 });
      });
  }

  function fetchAllPurchase(req, res, next) {
    console.log(req.params);
    var product = req.body;
    console.log(product);
    PurchaseSchema.purchaseSchema
      .findAll({
        include: [
          {
            model: UserSchema.userSchema,
            as: "user",
            attributes: ["id", "fullname", "address1", "phone"],
          },
        ],
      })
      .then(
        function (result) {
          console.log("result here");
          res.status(200);
          res.json({
            purchase: result,
            status: 200,
            message: "All purchase shown",
          });
        },
        function (err) {
          console.log(err);
          res.status(500);
          res.json({ status: 500, message: "Unable to fetch purchase." });
        }
      );
  }

  function fetchAllByUserId(req, res, next) {
    console.log(req.params);
    if (req.params.userId == undefined || req.params.userId === "") {
      res.status(500);
      res.json({ status: 200, message: "User id is required" });
    } else {
      PurchaseSchema.purchaseSchema
        .findAll({
          include: [
            {
              model: UserSchema.userSchema,
              as: "user",
              attributes: ["fullname"],
            },
          ],
          where: {
            userId: req.params.userId,
          },
        })
        .then(
          function (result) {
            res.status(200);
            res.json({
              purchase: result,
              status: 200,
            });
          },
          function (err) {
            res.status(500);
            res.json({ status: 500, message: "Unable to fetch purchases." });
          }
        );
    }
  }

  function fetchAllByProductId(req, res, next) {
    console.log(req.params);
    if (req.params.productId == undefined || req.params.productId === "") {
      res.status(500);
      res.json({ status: 200, message: "Product id is required" });
    } else {
      PurchaseSchema.purchaseSchema
        .findAll({
          include: [
            {
              model: UserSchema.userSchema,
              as: "user",
              attributes: ["id", "fullname", "address1", "phone"],
            },
          ],
          where: {
            productId: req.params.productId,
          },
        })
        .then(
          function (result) {
            res.status(200);
            res.json({
              purchase: result,
              status: 200,
            });
          },
          function (err) {
            res.status(500);
            res.json({ status: 500, message: "Unable to fetch purchases." });
          }
        );
    }
  }

  function cancelPurchase(req, res) {
    console.log(req.params);
    PurchaseSchema.purchaseSchema
      .update(
        {
          status: PurchaseStatusEnum.CANCELED,
        },
        {
          where: {
            id: req.params.purchaseId,
          },
        }
      )
      .then(
        function (result) {
          res.status(200);
          res.json({
            status: 200,
            message: "Successfully canceled " + result[0] + " purchase",
          });
        },
        function (err) {
          console.log(err);
          res.status(500);
          res.json({ status: 500, message: "Unable to cancel purchase" });
        }
      );
    P;
  }

  function statusUpdate(req, res) {
    console.log(req.params);
    var purchase = req.body;
    console.log(purchase);
    if(UserTypeEnum.USER === req.tokenInfo.userType) {
      PurchaseSchema.purchaseSchema
      .update(
        {
          status: req.body.status,
          userRemarks: req.body.feedback
        },
        {
          where: {
            id: req.params.purchaseId,
          },
        }
      )
      .then(success, error);
    } else {
      PurchaseSchema.purchaseSchema
      .update(
        {
          status: req.body.status,
          vendorRemarks: req.body.feedback
        },
        {
          where: {
            id: req.params.purchaseId,
          },
        }
      )
      .then(success, error);
    }
    
      let success = (success) => {
        res.status(200);
        res.json({
          status: 200,
          message: "Successfully updated purchase status",
        });
      }

      let error = (err) => {
        console.log(err);
        res.status(500);
        res.json({
          status: 500,
          message: "Unable to update purchase status",
        });
      }
  }

  function getAllByVendor(req, res, next) {
    PurchaseSchema.purchaseSchema
      .findAll({
        include: [
          {
            model: ProductSchema.productSchema,
            as: "product",
            attributes: ["name","image"],
            where: {
              userId: req.tokenInfo.userId,
            },
          },
          {
            model: UserSchema.userSchema,
            as: "user",
            attributes: ["fullname", "address1", "email", "phone", "mobile"],
          },
        ],
      })
      .then(
        function (result) {
          console.log("result here");
          res.status(200);
          res.json({
            products: result,
            status: 200,
            message: "All products shown for vendor",
          });
        },
        function (err) {
          console.log(err);
          res.status(500);
          res.json({
            status: 500,
            message: "Unable to fetch products for vendor",
          });
        }
      );
  }
  

  function getAllByUser(req, res, next) {
    PurchaseSchema.purchaseSchema
      .findAll({
        include: [
          {
            model: ProductSchema.productSchema,
            as: "product",
            attributes: ["name","image"],
            
          },
        ],
        where: {
          userId: req.tokenInfo.userId,
        },
      })
      .then(
        function (result) {
          console.log("result here");
          res.status(200);
          res.json({
            products: result,
            status: 200,
            message: "All purchase shown for user",
          });
        },
        function (err) {
          console.log(err);
          res.status(500);
          res.json({
            status: 500,
            message: "Unable to fetch purchase for user",
          });
        }
      );
  }

  function validateProductIdIsOfCurrentUser(userId, userType, purchaseId, res, next) {
    let success = (success, err) => {
      if (success) {
        next();
      } else {
         console.log(err);
        res.status(403);
        res.json({
          status: 403,
          message: "You can not update somebody else's purchase status",
        });
      }
    };

    let error = (error) => {
      console.log(error);
      res.status(500);
      res.json({
        status: 500,
        message: "Could not validate product id with current user",
      });
    };
    console.log("************HERE******");

    if (userType === UserTypeEnum.VENDOR) {
      PurchaseSchema.purchaseSchema
        .findOne({
          include: [
            {
              model: ProductSchema.productSchema,
              where: {
                userId: userId,
              },
            },
          ],
          where: {
            id: purchaseId,
          },
        })
        .then(success, error);
    } else {
      PurchaseSchema.purchaseSchema
        .findOne({
          where: {
            id: purchaseId,
            userId: userId,
          },
        })
        .then(success, error);
    }
  }

  function validateStatusForUpdate(req, res, next) {
    console.log("Inside validate Status For Update")
      console.log(req.body.status);
      console.log(req.tokenInfo.userType);
      console.log(req.tokenInfo.userId);
      console.log(req.tokenInfo.email);

        console.log(PurchaseStatusEnum.exists(req.body.status));
      if (!isNullOrUndefined(req.body.status) && PurchaseStatusEnum.exists(req.body.status)) {
      console.log("Status not empty")
        if (req.tokenInfo.userType === UserTypeEnum.VENDOR || (req.tokenInfo.userType === UserTypeEnum.USER && req.body.status === PurchaseStatusEnum.CANCELED)) {
        // verify if the product id sent is valid for current user 
        validateProductIdIsOfCurrentUser(req.tokenInfo.userId, req.tokenInfo.userType, req.params.purchaseId, res, next);
        return;
      }
    }
    res.status(500);
    res.json({status: 500, message: "Invalid Purchase Status."})
  }


  function validateProductIdOfCurrentUser(userId, userType, purchasedDate, res, next) {
    let success = (success, err) => {
      if (success) {
        next();
      } else {
         console.log(err);
        res.status(403);
        res.json({
          status: 403,
          message: "You can not show somebody else's purchase ",
        });
      }
    };

    let error = (error) => {
      console.log(error);
      res.status(500);
      res.json({
        status: 500,
        message: "Could not validate product id with current user",
      });
    };
    console.log("************HERE******");

    if (userType === UserTypeEnum.USER) {
      PurchaseSchema.purchaseSchema
        .findOne({
          include: [
            {
              model: ProductSchema.productSchema,
              as:"product",
              attributes:["name"]
            },
          ],
          where: {
            id: userId,
          },
        })
        .then(success, error);
    } else {
      PurchaseSchema.purchaseSchema
        .findOne({
          where: {
            id: purchasedDate,
            userId: userId,
          },
        })
        .then(success, error);
    }
  }
  function validaeForInvoice(req, res, next) {
    console.log("Inside validate ")
      
      console.log(req.tokenInfo.userType);
      console.log(req.tokenInfo.userId);
      console.log(req.tokenInfo.email);
        if (req.tokenInfo.userType === UserTypeEnum.USER ) {
        // verify if the product id sent is valid for current user 
        validateProductIdOfCurrentUser(req.tokenInfo.userId, req.tokenInfo.userType, req.params.purchaseId, res, next);
        return;
      
    }
    res.status(500);
    res.json({status: 500, message: "Invalid user ."})
  }


  

  

  function updateBooking(req, res, next) {
  console.log("inside update booking");
  var booking = req.body;
  PurchaseSchema.purchaseSchema.findOne({ 
    where: {
      id: booking.id
    } 
  }).then(function (previousBook) {
    if(!PurchaseStatusEnum.exists(booking.status)){
      res.status(400);
      res.json({status: 200, message: "status update failed.", "booking": booking})
    }

    if (previousBook) {
      previousBook.update({
        status: booking.status,
      }).then(function (product) {
        console.log("Successfuly updated");
        console.log(product);
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
    console.log("err while updating  booking status");
    res.status(500);
    res.json({ message: "Could not update booking status!!!", status: 500 })
  });
}

function fetchAllByCreatedDateAndUserIdAndDelivered(req, res, next) {
  console.log(req.params);
  console.log("***************************");
  if (Utils.isNullOrUndefined(req.params.userId)) {
    res.status(500);
    res.json({ status: 500, message: "User id is required" });
  } else if (Utils.isNullOrUndefined(req.params.purchasedDate)) {
    res.status(500);
    res.json({status: 500, message: "Purchase created date is required."});
  }else {
    return PurchaseSchema.purchaseSchema
      .findAll({
        include: [
          {
            model: UserSchema.userSchema,
            as: "user",
            attributes: ["fullname", "address1"],
          },
          {
            model: ProductSchema.productSchema,
            as: "product",
            attributes: ["name","price"]
          }
        ],
        where: {
          userId: req.params.userId,
          status: PurchaseStatusEnum.DELIVERED,
          createdAt: req.params.purchasedDate
        },
      });
  }
}

  return {
    confirmBooking,
    fetchAllPurchase,
    fetchAllByUserId,
    fetchAllByProductId,
    cancelPurchase,
    statusUpdate,

    getAllByVendor,
    getAllByUser,
    validateStatusForUpdate,
    updateBooking,validaeForInvoice,
    fetchAllByCreatedDateAndUserIdAndDelivered
  };
})();

