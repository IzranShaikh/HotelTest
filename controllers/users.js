const { Users, Bookings } = require('../models');
const { signToken } = require('../helper/jwthelper');

//register
const reg = async (req, res) => {
    const { email } = req.body;
    await Users.findOne({ email: email })
        .exec()
        .then(user => {
            if (user) { return res.status(409).json({ message: "Account already Exists" }); }
            else {
                const register = new Users(req.body);
                register.save()
                    .then((doc) => {
                        return res.status(200).json({ message: "User Registered" });
                    })
                    // .catch((err) => { res.status(500).json({ error: err }) });
            }
        });
};

//login
const login = async (req, res) => {
    const { email, password } = req.body;
    await Users.findOne({ email: email, password: password })
        .then((user) => {
            if (!user) return res.status(401).json({ message: "Invalid Username or Password" });
            
            //valid use;
            let accessToken = signToken({ email: user.email, name: user.name }, process.env.ACCESS_TOKEN_SECRET, '5h');

            res.status(200).json({
                message: "Logged in as " + user.name,
                accessToken
            });

        });
}

const myBookings = async (req, res) => {
    await Bookings.find({ user: req.params.id })
        .populate('hotel', 'name location')
        .populate('user', 'name email')
        .then((re) => {
            res.status(200).json(re);
        })
        .catch(err => {
            res.status(500).json(err)
        })
};

const delBooking = async (req, res) => {
    await Bookings.deleteOne({ _id: req.params.id })
        .then((d) => {
            if (d.deletedCount > 0) return res.status(201).json({ "message": "Booking Cancelled" });
            return res.status(404).json({ "message": "Invalid Request" });
        })
        .catch(err => {
            res.status(500).json({ "message": err.message });
        })
};

module.exports = { reg, login, myBookings, delBooking }