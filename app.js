var express = require("express");
var app = express();
var Swal = require('sweetalert2');
app.set("view engine", "ejs");


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

var Places = require("./models/places");
var Comments = require("./models/comments");
var userEntry = require("./models/userentry");
var faq = require("./models/faq");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/images"));

var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
//mongoose.connect("mongodb://localhost/YelpCamp"); //-- for local database
mongoose.connect("mongodb://127.0.0.1:27017/Papaspot", {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('Error', err.message);
});


var methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/ohcheatday", function (req, res) {
    res.render("restraunts/ohcheatday");
});


app.get("/restaurant/:id", function (req, res) {
    Places.findById(req.params.id).populate("comments").exec(function (err, place) {
        if (err) {
            console.log(err);
        } else {
            res.render("Places/restaurants", {
                place: place
            });
        }
    });
});

app.get("/entertainment/:id", function (req, res) {
    Places.findById(req.params.id).populate("comments").exec(function (err, place) {
        if (err) {
            console.log(err);
        } else {
            res.render("Places/entertainment", {
                place: place
            });
        }
    });
});

app.get("/hill/:id", function (req, res) {
    Places.findById(req.params.id).populate("comments").exec(function (err, place) {
        if (err) {
            console.log(err);
        } else {
            res.render("Places/hill", {
                place: place
            });
        }
    });
});


app.get("/restaurants", function (req, res) {
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

app.get("/entertainment", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("listofplaces", {
                show: 'entertainment',
                allplaces: allplaces
            });
        }
    });
});


app.get("/outing", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("listofplaces", {
                show: 'outing',
                allplaces: allplaces
            });
        }
    });
});

app.get("/faq", function (req, res) {
    faq.find({}, function(err, allFaq) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("faq/faq", {faqs: allFaq});
        }
    })
});

app.post("/faq/new", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var question = req.body.question;
    var newFaq = {
        question: question
    };
    faq.create(newFaq, function(err, newFaq) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(newFaq);
            res.redirect("/faq");
        }
    })
});

app.get("/faq/editByAdmin", function(req, res) {
    faq.find({}, function(err, allFaq) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("faq/editFaq", {faqs: allFaq});
        }
    })
});

app.put("/faq/editByAdmin/:id", function(req, res) {
    const answer = req.body.answer;
    faq.findByIdAndUpdate(req.params.id, {answer: answer}, function(err, updatedFaq) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(updatedFaq);
            res.redirect("/faq/editByAdmin");
        }
    })
});

app.delete("/faq/editByAdmin/:id", function(req, res) {
    faq.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/faq/editByAdmin");
        }
    })
})

app.get("/kadabra", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("enter/restaurant", {
                allplaces: allplaces
            });
        }
    });

});

app.post("/kadabra/restaurant/new/:id", function (req, res) {
    if (req.params.id === '1') {
        var nP = {
            name: req.body.name,
            type: req.body.type,
            rating: req.body.rating,
            nearby: req.body.nearby,
            cuisine: req.body.cuisine,
            payment_method: req.body.payment_method,
            cost_for_two: req.body.cost_for_two,
            musts_try: req.body.musts_try,
            gmap_src: req.body.gmap_src,
            features: req.body.features,
            open_timings: req.body.open_timings,
            identity: req.body.identity,
            io_location: req.body.io_location,
            ac: req.body.ac,
            crowd: req.body.crowd,
            mode_of_transport: req.body.mode_of_transport,
            eta: req.body.eta
        }
        var nC = {
            author_name: req.body.comment_author,
            date: req.body.comment_date,
            content: req.body.comment_content,
            insta_id: req.body.insta_id
        }

        Comments.create(nC, function (err, newcomment) {
            if (err) {
                console.log(err);
            } else {
                newcomment.save();
                Places.create(nP, function (err, newplace) {
                    if (err) {
                        console.log(err);

                    } else {
                        newplace.comments.push(newcomment);
                        newplace.save();
                    }
                });
            }
        });
    } else if (req.params.id === '2') {
        var nC = {
            author_name: req.body.comment_author,
            date: req.body.comment_date,
            content: req.body.comment_content,
            insta_id: req.body.insta_id
        }

        Comments.create(nC, function (err, newcomment) {
            if (err) {
                console.log(err);
            } else {
                Places.findById(req.body.place, function (err, foundplace) {
                    if (err) {
                        console.log(err);
                    } else {
                        newcomment.save();
                        foundplace.comments.push(newcomment);
                        foundplace.save();
                    }
                });
            }
        });
    }
    res.redirect("/");
});

app.post("/comments/request/:id", function (req, res) {
    console.log(req.body);
    var nC = {
        author_name: req.body.comment_author,
        date: req.body.comment_date,
        content: req.body.comment_content,
        faq_question: req.body.faq_question,
        faq_answer: req.body.faq_answer,
        name_of_place: req.body.name_of_place
    }

    userEntry.create(nC, function (err, newcomment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/restaurant/" + req.params.id)
        }
    });
});

app.get("/lifehacks", function (req, res) {
    res.render("lifehacks");
});

app.listen(process.env.PORT || 3000, process.env.ID, function (req, res) {
    console.log("Server has started for Papaspot at PORT 3000");
});