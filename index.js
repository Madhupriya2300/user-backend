const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
    credentials: true, 
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Welcome...");
});

const users = require('./routes/auth');
app.use('/api', users);

app.listen(process.env.PORT || 3001, () => {
    console.log('Server Connected');
});