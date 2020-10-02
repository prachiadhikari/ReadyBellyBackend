const PurchaseController = require("../../controller/PurchaseController.js");

module.exports = (function() {
    var routes = require("express").Router();
    var purchaseController = require("../../controller/PurchaseController.js");
    var authController = require("../../controller/AuthController");
    var PDFGenerator = require("../../utils/PDFGenerator");

    routes.post('/book', authController.verifyToken, authController.isUser, purchaseController.confirmBooking);
    routes.get('/all', authController.verifyToken, authController.isVendor,purchaseController.fetchAllPurchase);
    routes.get('/:userId/all',authController.verifyToken,authController.isUser, purchaseController.fetchAllByUserId);
    routes.get('/myp/:productId',authController.verifyToken,authController.isVendor, purchaseController.fetchAllByProductId);
    // routes.post('/:purchaseId/cancel', authController.verifyToken,authController.isUser, purchaseController.cancelPurchase);
    routes.post('/:purchaseId/status-update', authController.verifyToken, purchaseController.validateStatusForUpdate, purchaseController.statusUpdate);
    routes.post('/:purchaseId/payment-update', authController.verifyToken, purchaseController.validatePaymentForUpdate, purchaseController.paymentUpdate);

    routes.post('/booking/update', purchaseController.updateBooking);
    routes.get('/by/vendor/all', authController.verifyToken, authController.isVendor, purchaseController.getAllByVendor);
    routes.get('/by/user/all', authController.verifyToken, authController.isUser, purchaseController.getAllByUser);
    routes.get('/by/:userId/:purchasedDate', authController.verifyToken, purchaseController.fetchAllByCreatedDateAndUserIdAndDelivered);
   
    routes.get("/generate-invoice/:userId/:purchasedDate",authController.verifyToken,purchaseController.validaeForInvoice, PDFGenerator.createInvoice);

    
    return routes;
})();
