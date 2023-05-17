const router = require('express').Router();

//importing routes
const userRoute = require('./users');
const hotelRoute = require('./hotel');

//using routes
router.use('/user', userRoute);
router.use('/hotel', hotelRoute);

//exporting router
module.exports = router;