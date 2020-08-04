module.exports = (function() {
    let emailTemplates = {};

    emailTemplates.getUserApprovalEmailHtml = function (user) {
        return "Hi, " + user.fullname  + ", <br /><br />" +
        "A user with type <b>" + user.user_type + "</b> is created for username <b>" + user.email + "</b>. " +
        "Please, log in using your configured password. <br /> <br /> Please, let us know if you have any concerns!" +
        "<br /> <br />Thank You! <br /> City Sports Team" 
    }

    return emailTemplates;
})();