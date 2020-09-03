const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String
    }
}) 

module.exports = mongoose.model('faq', faqSchema);