var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//MODELS
var Admin = require("../models/admin");
var Places = require("../models/places");
var Comments = require("../models/comments");
var userEntry = require("../models/userentry");
var faq = require("../models/faq");


router.get("/restaurant/:id", function (req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    Places.findById(id).populate("comments").exec(function (err, place) {
        if (err) {
            console.log(err);
        } else {
            res.render("Places/restaurants", {
                place: place
            });
        }
    });
});

router.get("/hangouts/:id", function (req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    Places.findById(id).populate("comments").exec(function (err, place) {
        if (err) {
            console.log(err);
        } else {
            res.render("Places/hangouts", {
                place: place
            });
        }
    });
});

router.get("/utilities/:id", function (req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    Places.findById(id).populate("comments").exec(function (err, place) {
        if (err) {
            console.log(err);
        } else {
            res.render("Places/utilities", {
                place: place
            });
        }
    });
});


router.get("/restaurants", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("listofplaces", {
                show: 'restaurant',
                allplaces: allplaces
            });
        }
    });

});

router.get("/hangouts", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("listofplaces", {
                show: 'hangouts',
                allplaces: allplaces
            });
        }
    });
});


router.get("/utilities", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("listofplaces", {
                show: 'utilities',
                allplaces: allplaces
            });
        }
    });
});




module.exports = router;