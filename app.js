var express = require("express");
var app = express();

app.set("view engine", "ejs");


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

var Places = require("./models/places");
var Comments = require("./models/comments");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/images"));

var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
//mongoose.connect("mongodb://localhost/YelpCamp"); //-- for local database
mongoose.connect("mongodb+srv://Srezz:E0Y550F4bZhiXLeX@cluster0-oshu0.mongodb.net/todolist?retryWrites=true&w=majority", {
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

app.get("/gaming/:id", function (req, res) {
    Places.findById(req.params.id).populate("comments").exec(function (err, place) {
        if (err) {
            console.log(err);
        } else {
            res.render("Places/gaming", {
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

app.get("/gaming", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("listofplaces", {
                show: 'gaming',
                allplaces: allplaces
            });
        }
    });
});


app.get("/hills", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("listofplaces", {
                show: 'hill',
                allplaces: allplaces
            });
        }
    });
});

app.get("/contact", function (req, res) {
    res.render("contact");
});


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
            cusine: req.body.cusine,
            payment_method: req.body.payment_method,
            cost_for_two: req.body.cost_for_two,
            musts_try: req.body.musts_try,
            gmap_src: req.body.gmap_src,
            features: req.body.features,
            open_timings: req.body.open_timings,
            identity: req.body.identity,
            io_location: req.body.io_location,

        }
        var nC = {
            author_name: req.body.comment_author,
            date: req.body.comment_date,
            content: req.body.comment_content
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
            content: req.body.comment_content
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



app.listen(process.env.PORT || 3000, process.env.ID, function (req, res) {
    console.log("Server has started for todoList at PORT 3000");
});