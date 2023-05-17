const router = require('express').Router();
const multer = require('multer');
const { authCheck } = require('../helper/jwthelper');
const { multerStorage, multerFilter } = require('../helper/multerconf');

//Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });// const upload = multer({ dest: '/images/' });

  //importing controllers
const hotelCont = require('../controllers/hotel');

//using controllers
router.get('/',  hotelCont.getHotels);
router.post('/', upload.single("hotelpic"), hotelCont.addHotel);
router.patch('/:id', hotelCont.editHotel);

router.put('/', hotelCont.bookHotel);

router.get('/test', upload.single("testfile"), hotelCont.test)
// router.post('/book', authCheck, )

module.exports = router;