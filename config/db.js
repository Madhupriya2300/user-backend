const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.CONNECTION_STRING;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection error:"));

db.once("open", () => {
    console.log("DB Connected Successfully");
});