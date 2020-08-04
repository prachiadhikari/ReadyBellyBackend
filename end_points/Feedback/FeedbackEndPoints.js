
module.exports = (function() {
    var routes = require("express").Router();
    var feedbackController = require("../../controller/FeedbackController.js");
    var authController = require("../../controller/AuthController");


    routes.post('/add', authController.verifyToken, feedbackController.validator, feedbackController.insertIntoFeedback);
   
    
    return routes;
})();