module.exports = (function() {
    var routes = require("express").Router();
    var contactController = require("../../controller/ContactController.js");
    var authController = require("../../controller/AuthController");


    routes.post('/add', contactController.validator, contactController.insertIntoContact);
    routes.get('/all', authController.verifyToken, authController.isAdmin, contactController.fetchAllContacts);
    routes.delete('/:id', authController.verifyToken, authController.isAdmin, contactController.deleteContact);
   
    return routes;
})();