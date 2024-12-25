const joi = require('joi');

const customerValidationSchema = joi.object({
    userName: joi.string().required().alphanum().min(4).max(100).message({
        'string.empty': 'User name is required',
        'string.min': 'User name must be at least 4 characters long',
        'string.max': 'User name must be less than 100 characters long',
    }),
    firstName: joi.string().required().min(4).max(100).message({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 4 characters long',
        'string.max': 'First name must be less than 100 characters long',
    }),
    lastName: joi.string().required().min(3).max(100).message({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 3 characters long',
        'string.max': 'Last name must be less than 100 characters long',
    }),
    phoneNumber: joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required().min(11).max(13).message({
        'string.empty': 'Phone Number is required',
        'string.min': 'Phone Number must be at least 11 characters long',
        'string.max': 'Phone Number must be less than 13 characters long',
        'string.pattern.base': 'Phone number is not valid'
    }),
    alternateNumber: joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional().min(11).max(13).message({
        'string.empty': 'Phone Number is required',
        'string.min': 'Phone Number must be at least 11 characters long',
        'string.max': 'Phone Number must be less than 13 characters long',
        'string.pattern.base': 'Phone number is not valid'
    }),
    address: joi.string().required().messages({
        'string.empty': 'Address is required',
    }),
    image: joi.string().required().messages({
        'string.empty': 'Address is required',
    }),
    email: joi.string().required().email().lowercase().message({
        'string.empty': 'Email is required',
        'string.email': 'Email is not valid'
    }),
});


module.exports = {
    customerValidationSchema
}
