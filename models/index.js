const userM = require('./users');
const hotelM = require('./hotel');
const bookingM = require('./booking');

module.exports = {
    Users: userM,
    Hotels: hotelM,
    Bookings: bookingM
};