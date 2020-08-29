var mongoose = require("mongoose");

var commentsSchema = new mongoose.Schema({
    author_name: String,
    content: String,
    date: String,

});

module.exports = mongoose.model("Comments", commentsSchema);