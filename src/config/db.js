const mongoose = require('mongoose')

const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_URL).then((res) => {
            console.log('MongoDB Connected');
        })
            .catch(err => {
                console.log(err);
            });
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectionDB