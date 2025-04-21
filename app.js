const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./src/config/db");
const mainRoutes = require("./src/routes/routes");
const errorHandler = require("./src/middlewares/errorHandler.middleware");
const imageUpload = require("./src/utils/imageUploadHelper");

dotenv.config();
connectDb();

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(imageUpload.upload);  // Handles image upload before parsing JSON
app.use(cors());
app.use(express.json());  // Use express.json() instead of bodyParser.json()
app.use("/assets/images", express.static(imageUpload.serveImages));

// ** Call Main Router **
app.use("/api", mainRoutes);


// *** Use the error-handling middleware ***
app.use(errorHandler);


app.listen(process.env.PORT || 3000, () => {
  console.warn("Server Port is listening", process.env.PORT);
});
