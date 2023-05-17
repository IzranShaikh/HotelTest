const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
mongoose.connect("mongodb+srv://" + process.env.DBUSER + ":" + process.env.DBPASS + "@personalcluster.73asn.mongodb.net/" + process.env.DB + "?retryWrites=true&w=majority");

app.use(cors());
app.use(express.json({ limit: '50mb' }));

//Routes
const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App running on port " + port));