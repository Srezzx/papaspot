var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//MODELS
var Admin = require("../models/admin");
var Places = require("../models/places");
var Comments = require("../models/comments");
var userEntry = require("../models/userentry");
var faq = require("../models/faq");




//FAQ ROUTES
router.get("/faq", function (req, res) {
    faq.find({}, function (err, allFaq) {
        if (err) {
            console.log(err);
        } else {
            res.render("faq/faq", {
                faqs: allFaq
            });
        }
    })
});

router.post("/faq/new", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var question = req.body.question;
    var newFaq = {
        question: question
    };
    faq.create(newFaq, function (err, newFaq) {
        if (err) {
            console.log(err);
        } else {
            console.log(newFaq);
            res.redirect("/faq");
        }
    })
});

router.get("/faq/editByAdmin", function (req, res) {
    faq.find({}, function (err, allFaq) {
        if (err) {
            console.log(err);
        } else {
            res.render("faq/editFaq", {
                faqs: allFaq
            });
        }
    })
});

router.put("/faq/editByAdmin/:id", function (req, res) {
    const answer = req.body.answer;
    faq.findByIdAndUpdate(req.params.id, {
        answer: answer
    }, function (err, updatedFaq) {
        if (err) {
            console.log(err);
        } else {
            console.log(updatedFaq);
            res.redirect("/faq/editByAdmin");
        }
    })
});


router.delete("/faq/editByAdmin/:id", function (req, res) {
    faq.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/faq/editByAdmin");
        }
    })
})


module.exports = router;