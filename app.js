var express = require("express");
var app = express();
var Swal = require('sweetalert2');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

app.set("view engine", "ejs");


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

var nodemailer = require('nodemailer');
//MODELS
var Admin = require("./models/admin");
var Places = require("./models/places");
var Comments = require("./models/comments");
var userEntry = require("./models/userentry");
var faq = require("./models/faq");

//ROUTES
var adminRoutes = require("./routes/admin");
var faqRoutes = require("./routes/faq");
var staticRoutes = require("./routes/static");
var placesRoutes = require("./routes/places");
var articlesRoutes = require("./routes/articles");
app.use(adminRoutes);
app.use(faqRoutes);
app.use(staticRoutes);
app.use(placesRoutes);
app.use(articlesRoutes);


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/images"));

var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
// 
//mongoose.connect("mongodb://localhost/YelpCamp"); //-- for local database
const db = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Papaspot";
// mongodb+srv://Srezz:E0Y550F4bZhiXLeX@cluster0-oshu0.mongodb.net/todolist?retryWrites=true&w=majority
mongoose.connect(db, {
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
    res.render("index", {
        message: ""
    });
});

// ------Passport Config--------------
app.use(require("express-session")({
    secret: "Some random static text",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// ------------------Middleware-------------------

const isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.render("admin/error");
}

// ------------------Middleware-------------------

//EDIT PLACE ROUTES

app.get("/kadabra/edit", function (req, res) {
    Places.find({}, function (err, allplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("edit/place", {
                allplaces: allplaces
            });
        }
    });
});

app.get("/kadabra/edit/:id", function (req, res) {
    Places.findById(req.params.id, function (err, foundplace) {
        if (err) {
            console.log(err);
        } else {
            res.render("edit/editplacebyid", {
                foundplace: foundplace
            })
        }
    });
});

app.post("/kadabra/edit/:id", function (req, res) {
    var nP = {
        name: req.body.name,
        type: req.body.type,
        sub_type: req.body.sub_type,
        rating: req.body.rating,
        nearby: req.body.nearby,
        cuisine: req.body.cuisine,
        payment_method: req.body.payment_method,
        cost_for_two: req.body.cost_for_two,
        must_try: req.body.must_try,
        gmap_src: req.body.gmap_src,
        features: req.body.features,
        open_timings: req.body.open_timings,
        identity: req.body.identity,
        io_location: req.body.io_location,
        ac: req.body.ac,
        crowd: req.body.crowd,
        mode_of_transport: req.body.mode_of_transport,
        eta: req.body.eta,
        website: req.body.website
    }
    Places.findByIdAndUpdate(req.params.id, nP, function (err, updatedplace) {
        if (err) {
            console.log(err);
        } else {
            console.log("++++++++++++++++++++");
            console.log(updatedplace);
        }
    });
    res.redirect("/kadabra/edit");
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
            sub_type: req.body.sub_type,
            rating: req.body.rating,
            nearby: req.body.nearby,
            cuisine: req.body.cuisine,
            payment_method: req.body.payment_method,
            cost_for_two: req.body.cost_for_two,
            must_try: req.body.must_try,
            gmap_src: req.body.gmap_src,
            features: req.body.features,
            open_timings: req.body.open_timings,
            identity: req.body.identity,
            io_location: req.body.io_location,
            ac: req.body.ac,
            crowd: req.body.crowd,
            mode_of_transport: req.body.mode_of_transport,
            eta: req.body.eta,
            website: req.body.website
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
    var nC = {
        author_name: req.body.comment_author,
        date: req.body.comment_date,
        content: req.body.comment_content,
        faq_question: req.body.faq_question,
        faq_answer: req.body.faq_answer,
        name_of_place: req.body.name_of_place,
        insta_id: req.body.insta_id
    }

    userEntry.create(nC, function (err, newcomment) {
        if (err) {
            console.log(err);
        } else {
            console.log(newcomment);
            res.redirect("/restaurant/" + req.params.id)
        }
    });
});

app.put("/faq/editByAdmin/:id", function (req, res) {
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

app.delete("/faq/editByAdmin/:id", function (req, res) {
    faq.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/faq/editByAdmin");
        }
    })
});



app.post("/mail/send", function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'papaspot1234@gmail.com',
            pass: 'Asdfghjkl123!'
        }
    });

    var mailOptions = {
        from: 'websitetest4334@gmail.com',
        to: 'papaspot1234@gmail.com',
        subject: 'Inquiry in VIT Atlas',
        text: 'Inquiry by - ' + req.body.name + '|||||||||||||||||||||||||||| Phone Number -' + req.body.phonenumber + '||||||||||||||||||||||| Email Address - ' + req.body.email + '||||||||||||||||||||||||| Inquiry  - ' + req.body.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect("/#contactpage");
});

app.listen(process.env.PORT || 3000, process.env.ID, function (req, res) {
    console.log("Server has started for Papaspot at PORT 3000");
});