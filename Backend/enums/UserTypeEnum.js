module.exports = (function() {
    'use strict';

    const UserTypeEnum = {
        ADMIN: "ADMIN",
        USER: "USER",
        VENDOR: "VENDOR",
        properties: {

        },
        exists: function (userType) {
            for (var key in UserTypeEnum) {
                if(UserTypeEnum[key] === userType) {
                    return true;
                }
            }
            return false;
        }
    };

    return UserTypeEnum;
})();
