const UserModel = require("../models/user.model");
const { customError, encryptionHelper } = require("../utils");
const { crudService, tokenService } = require("../services/index");

// ===================================================
// *********** Fetch All the User Data ***********
// ===================================================
exports.fetchUser = async (req, res, next) => {
  try {
    const user = await UserModel.find({ is_delete: false });
    if (!user) throw new customError.NotFoundError("User not found!");

    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// ===================================================
// ************** Upload User Image  *************
// ===================================================
exports.uploadUserImage = async (req, res, next) => {
  try {
    let file = req.file;
    if (!file)
      throw new customError.NotFoundError(
        "No file uploaded or invalid file type!"
      );

    res.status(200).json({
      message: "File uploaded successfully!",
      filePath: `../assets/images/${req.file.filename}`,
    });
  } catch (err) {
    next(err);
  }
};

// ===================================================
// **************** Register User  ***************
// ===================================================
exports.createUser = async (req, res, next) => {
  try {
    let payload = req.body;
    const user = await UserModel.findOne({ email: payload.email });
    if (user) throw new customError.NotFoundError("Email already exsist!");

    payload.password = await encryptionHelper.hash(payload.password);
    const addUser = await crudService.create(UserModel, payload);
    if (!addUser)
      throw new customError.NotFoundError("User creation fail!");

    res.status(200).json({
      success: true,
      result: {
        userName: addUser.userName,
        email: addUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// =================================================
// **************** Login User  *******************
// =================================================
exports.login = async (req, res, next) => {
  try {
    let payload = req.body;

    const user = await UserModel.findOne({
      email: payload.email,
      isDeleted: false,
    });
    if (!user)
      throw new customError.NotFoundError("Email does not exsist!");
    if (user?.isApproved && user?.isApproved == true)
      throw new customError.UnauthorizedError(
        "Access denied: approval pending!"
      );

    isMatch = await encryptionHelper.compareHash(
      payload.password,
      user.password
    );
    if (!isMatch)
      throw new customError.UnauthorizedError("Invalid credentials!");

    delete user.password;
    const payloadData = {
      id: user._id,
      username: user.userName,
      email: user.email,
      userName: user.userName,
    };

    const tokens = await tokenService.generateAuthToken(payloadData);
    if (!tokens) throw new Error("Token was not generated..");

    res.status(200).json({ success: true, result: user, tokens: tokens });
  } catch (err) {
    next(err);
  }
};

// =================================================
// ************ Update User  ******************
// =================================================
exports.updateUser = async (req, res, next) => {
  try {
    let _id = req.params.id;
    let payload = req.body;

    const user = await UserModel.findOne({
      _id: _id,
      email: payload.email,
      isDeleted: false,
    });
    if (!user)
      throw new customError.NotFoundError("User does not exsist!");

    payload.updatedAt = new Date();
    const adduser = await crudService.updateById(
      UserModel,
      _id,
      payload
    );
    if (!adduser)
      throw new customError.NotFoundError("User updation fail!");

    res.status(200).json({
      success: true,
      result: {
        userName: adduser.userName,
        email: adduser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
