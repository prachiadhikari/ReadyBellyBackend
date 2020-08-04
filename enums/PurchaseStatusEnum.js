module.exports = (function() {
    'use strict';

    const PurchaseStatusEnum = {
        PENDING: "PENDING",
        DELIVERED: "DELIVERED",
        CANCELED: "CANCELED",
        PROCESSING: "PROCESSING",
        properties: {

        },
        exists: function (purchaseStatus) {
            for (var key in PurchaseStatusEnum) {
                if(PurchaseStatusEnum[key] === purchaseStatus) {
                    return true;
                }
            }
            return false;
        }
    };

    return PurchaseStatusEnum;
})();
