var mongoose = require("mongoose");

var placesSchema = new mongoose.Schema({
    name: String,
    type: String,
    rating: Number,
    nearby: String,
    cusine: String,
    payment_method: String,
    cost_for_two: String,
    must_try: String,
    gmap_src: String,
    features: String,
    io_location: String,
    identity: String,
    open_timings: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],


});

module.exports = mongoose.model("Places", placesSchema);