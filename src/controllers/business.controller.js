const BusinessModel = require("../models/business.model");
const { customError, encryptionHelper } = require("../utils");
const { crudService, tokenService } = require("../services/index");

exports.fetchBusiness = async (req, res, next) => {
  try {
    const business = await BusinessModel.find({ isDeleted: false });
    if (!business) throw new customError.NotFoundError("Business not found!");

    res.status(200).json({ success: true, business });
  } catch (err) {
    next(err);
  }
};

exports.createBusiness = async (req, res, next) => {
  try {
    let payload = req.body;
    const business = await BusinessModel.findOne({ email: payload.email });
    if (business) throw new customError.NotFoundError("Email already exsist!");

    payload.password = await encryptionHelper.hash(payload.password);
    const addBusiness = await crudService.create(BusinessModel, payload);
    if (!addBusiness)
      throw new customError.NotFoundError("Business creation fail!");

    res.status(200).json({
      success: true,
      result: {
        businessName: addBusiness.businessName,
        userName: addBusiness.userName,
        email: addBusiness.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    let payload = req.body;

    const business = await BusinessModel.findOne({
      email: payload.email,
      isDeleted: false,
    });
    if (!business)
      throw new customError.NotFoundError("Email does not exsist!");
    if (business?.isApproved && business?.isApproved == true)
      throw new customError.UnauthorizedError(
        "Access denied: approval pending!"
      );

    isMatch = await encryptionHelper.compareHash(
      payload.password,
      business.password
    );
    if (!isMatch)
      throw new customError.UnauthorizedError("Invalid credentials!");

    delete business.password;
    const payloadData = {
      id: business._id,
      username: business.userName,
      email: business.email,
      businessName: business.businessName,
    };

    const tokens = await tokenService.generateAuthToken(payloadData);
    if (!tokens) throw new Error("Token was not generated.");

    res.status(200).json({ success: true, result: business, tokens: tokens });
  } catch (err) {
    next(err);
  }
};
