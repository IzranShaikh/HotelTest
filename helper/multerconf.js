const multer = require('multer');

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${ Math.floor(Math.random() * (100000000 - 800000) + 800000) }.${ext}`);
    },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "png" || "jpg") {
        cb(null, true);
    } else {
        cb(new Error("Not an Image File!!"), false);
    }
};

module.exports = { multerStorage, multerFilter };