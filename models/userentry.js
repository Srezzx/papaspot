var mongoose = require("mongoose");

var userentrySchema = new mongoose.Schema({
    author_name: String,
    content: String,
    date: String,
    faq_question: String,
    faq_answer: String,
    name_of_place: String,
    insta_id: String

});

module.exports = mongoose.model("userEntry", userentrySchema);