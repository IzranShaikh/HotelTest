const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'hotels'},
    occupancy: { 
        adults: { type: String },
        children: { type: String }
     },
    rooms: { type: String }
});

module.exports = mongoose.model("bookings", bookingSchema);