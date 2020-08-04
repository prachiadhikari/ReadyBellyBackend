module.exports = (function() {
    var routes = require("express").Router();
    var upload = require("../../controller/UploadController");
    // var path = require('path');
    routes.post("/", upload.single('imageFile'), (req, res) => {
        console.log(res.file);    
        res.status(200);
        console.log(__dirname);
        console.log(req.file);
        res.json(req.file);
        });
    
    return routes;
    })();