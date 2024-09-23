const mongoose = require('mongoose')


const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
const Schema = mongoose.Schema;


const businessSchema = new Schema({
    businessName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: phoneNumberRegex 
    },
    alternateNumber: {
        type: String,
        trim: true,
        match: phoneNumberRegex 
    },
    image: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {timestamps: true})

module.exports = mongoose.model('Business-stores', businessSchema)