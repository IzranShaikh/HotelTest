const { Hotels, Bookings } = require('../models/');

const getHotels = async (req, res) => {
    await Hotels.find()
        .select('name location image rating rooms')
        .then((re) => {
            res.status(200).json(re);
        });
};

const addHotel = async (req, res) => {
    const { name, location, rating, rooms } = req.body;
    const hotel = new Hotels({
        name: name,
        location: location,
        rating: rating,
        rooms: rooms,
        image: req.file.filename
    });
    await hotel.save()
        .then((re) => {
            res.status(200).json({ "message": "Hotel Added", data: re });
        })
        .catch((err) => {
            res.status(500).json({ "message": err.message });
        })
};

const editHotel = (req, res) => {
    const update = req.body;
    let query = { _id: req.params.id };
    Hotels.updateOne(query, update)
        .then((upr) => {
            if (upr.modifiedCount > 0 || upr.matchedCount > 0) return res.status(201).json({ "message": "Hotel Edited" });
            return res.status(404).json({ "message": "Invalid Request" });
        })
        .catch((err) => {
            res.status(500).json({ "message": err.message });
        })
};


const bookHotel = async (req, res) => {
    const booking = new Bookings(req.body);
    await booking.save()
        .then((data) => {
            res.status(201).json({
                "message": "Booking Successful",
                data
            })        
        })
        .catch(err => {
            res.status(500).json({
                "message": "Error while booking",
                "error": err
            })
        })
};

const test = (req, res) => {
    console.log(req.file)
    res.send(req.body);
}


module.exports = { getHotels, addHotel, editHotel, bookHotel, test };