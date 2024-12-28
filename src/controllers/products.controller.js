const { customError } = require("../utils");
const path = require('path');
const fs = require('fs');


// ===================================================
// *********** Fetch All the Fruit Data ***********
// ===================================================
exports.fetchFruits = async (req, res, next) => {
    const filePath = path.join(__dirname, '../', 'data', 'fruit.json');

    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            throw new customError.NotFoundError("Fruit not found!");
        }

        try {
            const fruits = JSON.parse(data);
            res.status(200).json({ success: true, fruits });
        } catch (err) {
            next(err);
        }
    });
};



// ===================================================
// *********** Fetch All the Vegetable Data ***********
// ===================================================
exports.fetchVegitables = async (req, res, next) => {
    const filePath = path.join(__dirname, '../', 'data', 'vegitable.json');

    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            throw new customError.NotFoundError("Fruit not found!");
        }

        try {
            const vegitable = JSON.parse(data);
            res.status(200).json({ success: true, vegitable });
        } catch (err) {
            next(err);
        }
    });
};