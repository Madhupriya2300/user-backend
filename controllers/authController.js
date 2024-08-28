const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const moment = require('moment-timezone');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { firstname, lastname, emailid, mobileno, role, password } = req.body;
        const createddate = moment().tz('Asia/Kolkata').format('DD-MM-YYYY hh:mm a')
        const existingUser = await users.findOne({ emailid });
        if (existingUser) {
            return res.send({ statusCode: 400, message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new users({
            firstname,
            lastname,
            emailid,
            mobileno,
            role,
            password: hashedPassword,
            createddate
        });

        await newUser.save();
        res.send({ statusCode: 200, message: "Signup successfully" });
    } catch (error) {
        res.send({ statusCode: 400, message: "Error creating user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { emailid, password } = req.body;
        const user = await users.findOne({ emailid });
        if (!user) {
            return res.send({ statusCode: 204, message: "Invalid Email id or Password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({ statusCode: 204, message: "Invalid Email id or Password" });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.send({ statusCode: 200, token: token, role: user.role, message: "Login successfully" });
    } catch (error) {
        res.send({ statusCode: 400, message: "Error logging in", error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        await users.find({}).then((result) => {
            if (result?.length > 0) {
                res.send({ statusCode: 200, message: "Success", result: result });
            } else {
                res.send({ statusCode: 204, message: "No Records Found" });
            }
        });

    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
}


module.exports = {
    signup,
    login,
    getUsers,
};