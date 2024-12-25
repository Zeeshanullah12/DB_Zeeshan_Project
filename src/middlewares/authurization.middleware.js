const { customError } = require('../utils')
const { tokenService } = require('../services/index')
const dotenv = require('dotenv');

dotenv.config();



const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) throw new customError.UnauthorizedError("Access token required!");

    const {user} = tokenService.validateToken(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user) throw new customError.UnauthorizedError("Invalid or expired token!");

    req.headers.user = user 
    next();
};

module.exports = authenticateToken;