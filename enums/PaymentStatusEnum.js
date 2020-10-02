module.exports = (function() {
    'use strict';

    const PaymentStatusEnum = {
        CANCELLED: "CANCELLED",
        CASH_ON_DELIVERY: "CASH ON DELIVERY",
        PAID: "PAID",
        properties: {

        },
        exists: function (paymentStatus) {
            for (var key in PaymentStatusEnum) {
                if(PaymentStatusEnum[key] === paymentStatus) {
                    return true;
                }
            }
            return false;
        }
    };

    return PaymentStatusEnum;
})();
