var express = require("express");
var app = express();

app.set("view engine", "ejs");


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/public"));

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
    res.render("ohcheatday");
})

app.listen(process.env.PORT || 3000, process.env.ID, function (req, res) {
    console.log("Server has started for todoList at PORT 3000");
});