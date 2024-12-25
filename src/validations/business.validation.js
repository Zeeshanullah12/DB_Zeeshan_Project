const joi = require('joi')

const businessValidationSchema = joi.object({
    businessName: joi.string().required().min(4).max(100).message({
        'string.empty': 'Business name is required',
        'string.min': 'Business name must be at least 4 characters long',
        'string.max': 'Business name must be less than 100 characters long',
    }),
    businessCity: joi.string().required().min(4).max(100).message({
        'string.empty': 'City name is required',
        'string.min': 'City name must be at least 4 characters long',
        'string.max': 'City name must be less than 100 characters long',
    }),
    businessLocation: joi.string().required().min(4).max(100).message({
        'string.empty': 'Location name is required',
        'string.min': 'Location name must be at least 4 characters long',
        'string.max': 'Location name must be less than 100 characters long',
    }),
    cnic: joi.string().required().min(10).max(100).message({
        'string.empty': 'CNIC name is required',
        'string.min': 'CNIC name must be at least 10 characters long',
        'string.max': 'CNIC name must be less than 100 characters long',
    }),
    image: joi.string().required().messages({
        'string.empty': 'Image is required'
    }),
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
    userAddress: joi.string().required().messages({
        'string.empty': 'Address is required',
    }),
    email: joi.string().required().email().lowercase().message({
        'string.empty': 'Email is required',
        'string.email': 'Email is not valid'
    }),
    password: joi.string().required().min(6).message({
        'string.empty': 'Password name is required',
        'string.min': 'Password name must be at least 6 characters long'
    }),
})


const updateBusinessValidation = joi.object({
    businessName: joi.string().optional().min(4).max(100).message({
        'string.min': 'Business name must be at least 4 characters long',
        'string.max': 'Business name must be less than 100 characters long',
    }),
    businessCity: joi.string().optional().min(4).max(100).message({
        'string.min': 'City name must be at least 4 characters long',
        'string.max': 'City name must be less than 100 characters long',
    }),
    businessLocation: joi.string().optional().min(4).max(100).message({
        'string.min': 'Location name must be at least 4 characters long',
        'string.max': 'Location name must be less than 100 characters long',
    }),
    cnic: joi.string().optional().min(10).max(100).message({
        'string.min': 'CNIC name must be at least 10 characters long',
        'string.max': 'CNIC name must be less than 100 characters long',
    }),
    userName: joi.string().optional().alphanum().min(4).max(100).message({
        'string.min': 'User name must be at least 4 characters long',
        'string.max': 'User name must be less than 100 characters long',
    }),
    firstName: joi.string().optional().min(4).max(100).message({
        'string.min': 'First name must be at least 4 characters long',
        'string.max': 'First name must be less than 100 characters long',
    }),
    lastName: joi.string().optional().min(3).max(100).message({
        'string.min': 'Last name must be at least 3 characters long',
        'string.max': 'Last name must be less than 100 characters long',
    }),
    phoneNumber: joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional().min(11).max(13).message({
        'string.min': 'Phone Number must be at least 11 characters long',
        'string.max': 'Phone Number must be less than 13 characters long',
        'string.pattern.base': 'Phone number is not valid'
    }),
    alternateNumber: joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional().min(11).max(13).message({
        'string.min': 'Phone Number must be at least 11 characters long',
        'string.max': 'Phone Number must be less than 13 characters long',
        'string.pattern.base': 'Phone number is not valid'
    }),
    userAddress: joi.string().optional().messages({
        'string.empty': 'Address is required'
    })
})


const businessLoginValidation = joi.object({
    email: joi.string().required().email().lowercase().message({
        'string.empty': 'Email is required',
        'string.email': 'Email is not valid'
    }),
    password: joi.string().required().min(6).message({
        'string.empty': 'Password name is required',
        'string.min': 'Password name must be at least 6 characters long'
    }),
})


module.exports = {
    businessValidationSchema,
    businessLoginValidation,
    updateBusinessValidation
}