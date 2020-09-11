var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//MODELS
var Admin = require("../models/admin");
var Places = require("../models/places");
var Comments = require("../models/comments");
var userEntry = require("../models/userentry");
var faq = require("../models/faq");



router.get("/lifehacks", function (req, res) {
    res.render("lifehacks");
});

router.get("/hackathons", function (req, res) {
    res.render("hackathons");
});

router.get("/googledrive", function (req, res) {
    res.render("googledrive");
});

router.get("/shopping", function (req, res) {
    res.render("shopping");
});




module.exports = router;