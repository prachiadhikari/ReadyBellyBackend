module.exports = ( function() {
    'use strict';
    var routes = require("express").Router();
    var userEndPoints = require("./User/UserEndpoints");
    var productEndPoints = require("./Product/ProductEndPoints");
    var uploadEndPoints = require("./Upload/UploadEndpoint");
    var purchaseEndPoints = require("./Purchase/PurchaseEndPoints");
    var feedbackEndPoints = require("./Feedback/FeedbackEndPoints");
    var contactEndPoints = require("./Contact/ContactEndPoints");

    

    routes.use("/user", userEndPoints);
    routes.use("/product", productEndPoints);
    routes.use("/upload", uploadEndPoints);
    routes.use("/purchase", purchaseEndPoints);
    routes.use("/feedback", feedbackEndPoints);
    routes.use("/contact", contactEndPoints);


    return routes;
})();