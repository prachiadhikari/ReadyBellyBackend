module.exports = (function() {
    var routes = require("express").Router();
    var productController = require("../../controller/ProductController.js");
    var authController = require("../../controller/AuthController");


    routes.post('/add', authController.verifyToken, authController.isVendor, productController.validator, productController.insertIntoProduct);
    routes.get('/:userId/all', productController.fetchAllByUserId);
    routes.get('/myp/:productId', productController.fetchAllByProductId);
    routes.get('/all', productController.fetchAllProducts);
    routes.delete('/:id', authController.verifyToken, productController.deleteProduct);
    routes.put('/update', authController.verifyToken, productController.validator, productController.updateIntoProduct);
    routes.get('/searchProduct/:search',productController.searchProduct);
    
    return routes;
})();