const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    emailid: {
        type: String,
    },
    mobileno: {
        type: String,
    },
    role: {
        type: String, //User, Admin, Guest
    },
    password: {
        type: String,
    },
    createddate: {
        type: String,
    }
});

const CollectionName = 'users';

module.exports = mongoose.model('users', usersSchema, CollectionName);