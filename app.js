const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
const connectDb = require('./src/config/db')
const mandiRouter = require('./src/routes/routes')

dotenv.config();
connectDb();
// ** expend the packages ***
const app = express()
app.use(bodyParser.json())
app.use(cors());

// ** Call Main Router **
app.use('/api', mandiRouter)

app.listen(process.env.PORT || 3000, () => {
    console.warn("Server Port is listening", process.env.PORT);
})

