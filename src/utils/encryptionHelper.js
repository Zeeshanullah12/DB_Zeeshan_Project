const bcrypt = require('bcrypt');

const defaultRounds = 12;


const hash = async (str, rounds = defaultRounds) => {
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(str, salt);
};


const compareHash = async (str, hash) => {
    return bcrypt.compare(str, hash);
};


const randomNumberGenerator = (length = 6) => {
    const max = Math.pow(10, length) - 1;
    const min = Math.pow(10, length - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


const addSalt = (str) => {
    const randomSalt = randomNumberGenerator(4);
    return `${str}_${randomSalt}`;
};


module.exports = {
    hash,
    compareHash,
    randomNumberGenerator,
    addSalt,
};
