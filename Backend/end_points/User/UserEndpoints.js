module.exports = (function() {
    var routes = require("express").Router();
    var userController = require("../../controller/UserController.js");
    var authController = require("../../controller/AuthController");


routes.post('/registration', userController.validator, userController.checkEmail, userController.generateHash);
routes.post('/login', authController.validator, authController.passwordChecker, authController.jwtTokenGen);
routes.get('/all', authController.verifyToken, authController.isAdmin, userController.fetchAllUsers);
routes.post('/:userId/approve', authController.verifyToken, authController.isAdmin, userController.approveUser);
routes.delete('/:id', authController.verifyToken, authController.isAdmin, userController.deleteUser);
routes.get('/profile/:userId', authController.verifyToken, userController.fetchAllByUserId);
routes.put('/update', authController.verifyToken, userController.validator, userController.updateUsers);
return routes;
})();