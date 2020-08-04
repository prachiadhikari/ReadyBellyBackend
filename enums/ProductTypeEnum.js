module.exports = (function() {
    'use strict';

    const ProductTypeEnum = {
        BURGER: "BURGER",
        CHINESE: "CHINESE",
        JAPANESE: "JAPANESE",
        MOMO: "MOMO",
        NEWARI: "NEWARI",
        PIZZA: "PIZZA",
        SWEETS: "SWEETS",
        BAKERY: "BAKERY",
        SOFTDRINKS: "SOFTDRINKS",
        HARDDRINKS: "HARDDRINKS",
        properties: {

        },
        exists: function (productType) {
            for (var key in ProductTypeEnum) {
                if(ProductTypeEnum[key] === productType) {
                    return true;
                }
            }
            return false;
        }
    };

    return ProductTypeEnum;
})();
