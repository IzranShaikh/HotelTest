const router = require('express').Router();
const { authCheck } = require('../helper/jwthelper');

//importing controllers
const userCont = require('../controllers/users');

//using controllers
router.post('/register', userCont.reg)
router.post('/login', userCont.login);
router.get('/:id', userCont.myBookings);
router.delete('/:id', userCont.delBooking);
router.get('/test', authCheck, (req, res) => { res.status(200).json({ "message": "AUTH WORKING" }) });

module.exports = router;