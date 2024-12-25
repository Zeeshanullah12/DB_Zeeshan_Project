const CustomerModel = require('../models/customer.model')
const { customError } = require('../utils')
const { crudService } = require('../services/index')


// ===================================================
// *********** Fetch All the Customer Data ***********
// ===================================================
exports.fetchCustomers = async (req, res, next) => {
    try {
        const { id } = req.headers.user;

        const customer = await CustomerModel.find({ Business: id, 'is_delete': false });
        if (!customer.length > 0) throw new customError.NotFoundError("Customers not found!")

        res.status(200).json({ success: true, customer });
    } catch (err) {
        next(err)
    }
}


// ===================================================
// **************** Register Customer  ***************
// ===================================================
exports.addCustomer = async (req, res, next) => {
    try {
        let payload = req.body;
        const { id } = req.headers.user;

        const customer = await CustomerModel.findOne({ Business: id, email: payload.email });
        if (customer) throw new customError.NotFoundError("Email already exsist!")

        payload.Business = id
        payload.createdBy = id

        const customerModel = await crudService.create(CustomerModel, payload)
        if (!customerModel) throw new customError.NotFoundError("Customer creation fail!")

        res.status(200).json({ success: true, result: customerModel });
    } catch (err) {
        next(err)
    }
}


// =================================================
// ************ Update Customer  ******************
// =================================================
exports.updateCustomer = async (req, res, next) => {
    try {
        let _id = req.params.id;
        let payload = req.body

        const customer = await CustomerModel.findOne({ _id: _id, email: payload.email, isDeleted: false });
        if (!customer) throw new customError.NotFoundError("Customer does not exsist!")

        payload.updatedAt = new Date()
        const addBusiness = await crudService.updateById(CustomerModel, _id, payload)
        if (!addBusiness) throw new customError.NotFoundError("Business updation fail!")

        res.status(200).json({ success: true, result: { businessName: addBusiness.businessName, userName: addBusiness.userName, email: addBusiness.email } });
    } catch (err) {
        next(err)
    }
}