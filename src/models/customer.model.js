const mongoose = require('mongoose')


const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
const Schema = mongoose.Schema;


const customerSchema = new Schema({
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
    address: {
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
    image: {
        type: String,
        // required: true,
    },
    Business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Businessstore',
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Businessstore',
        required: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Businessstore',
        required: false
    },
    deletedAt: {
        type: Date
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Businessstore',
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Customer', customerSchema)