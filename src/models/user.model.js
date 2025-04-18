const mongoose = require('mongoose')


const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    cnic: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        match: phoneNumberRegex
    },
    alternateNumber: {
        type: String,
        required: false,
        match: phoneNumberRegex
    },
    userAddress: {
        type: String,
        required: true,
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
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    isApproved: {
        type: String,
        required: true,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

module.exports = mongoose.model('Users', userSchema)