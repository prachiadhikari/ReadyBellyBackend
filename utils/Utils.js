module.exports = (function() {
    let utilFunctions = {};
    
    utilFunctions.isNullOrUndefined = function (obj) {
        return obj === null || obj === undefined;
    }
    return utilFunctions;
})();