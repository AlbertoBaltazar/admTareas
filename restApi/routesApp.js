var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.render("index.jade");
});
router.get("/responsables", function(req, res) {
    res.render("responsables.jade");
});

module.exports = router;
