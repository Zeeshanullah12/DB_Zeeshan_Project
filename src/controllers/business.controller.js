const BusinessModel = require('../models/business.schema')

exports.fetchBusiness = (req, res, next) => {
    BusinessModel.find().then(businessAccount => {
        console.log(businessAccount);
        res.status(200).json({
            message: "Successfully fetch",
            accounts: businessAccount
        })
    }).catch(err => {
        console.log(err);
    })
}  

exports.createBusiness = (req, res, next) => {
    const business = new BusinessModel({
        email: req.body.email
    })
    
    business.save().then(businessAccount => {
        console.log(businessAccount);
        res.status(201).json({
            message: "Create Successfully",
            accounts: businessAccount
        })
    }).catch(err => {
        console.log(err);
    })
}  