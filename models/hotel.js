const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({

    name: { type: String },
    location: { type: String },
    rating: { type: String },
    image: { type: String },
    rooms: { type: String }

});

module.exports = mongoose.model("hotels", hotelSchema);