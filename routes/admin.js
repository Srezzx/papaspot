var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require("passport");

//MODELS
var Admin = require("../models/admin");
var Places = require("../models/places");
var Comments = require("../models/comments");
var userEntry = require("../models/userentry");
var faq = require("../models/faq");



// -----------Admin Authentication------------------

router.get("/admin-login", function (req, res) {
    res.render("admin/login");
});

// router.get("/admin-signup", function (req, res) {
//     res.render("admin/signup");
// });

router.post("/admin-login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/admin-login",
}), function (req, res) {});


// router.post("/admin-signup", function (req, res) {
//     const username = req.body.username;
//     Admin.findOne({
//             username: username
//         })
//         .then(admin => {
//             if (admin) {
//                 return res.render("admin/error");
//             } else {
//                 Admin.register({
//                     username: username
//                 }, req.body.password, function (err, admin) {
//                     if (err) {
//                         console.log(err);
//                         return res.redirect("/admin-signup");
//                     } else {
//                         passport.authenticate("local")(req, res, function () {
//                             res.redirect("/kadabra");
//                         });
//                     }
//                 });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.redirect("/admin-signup");
//         })
// });

// -----------Admin Authentication------------------






module.exports = router;