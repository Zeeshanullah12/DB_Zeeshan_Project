const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
};

const generateAuthToken = (payload) => {
    const accessToken = generateToken(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = generateToken(payload, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN);
    return {
        accessToken,
        accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES_IN,
        refreshToken,
    };
};

const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

const validateToken = (token, secret) => {
    try {
        let token_ = token.split(" ")[1]
        const decoded = jwt.verify(token_, secret);
        return { valid: true, user: decoded };
    } catch (error) {
        throw new Error(`Token validation error: ${error.message}`);
    }
};


module.exports = {
    generateAuthToken,
    verifyToken,
    validateToken
};
