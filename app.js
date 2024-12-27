const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./src/config/db");
const mandiRouter = require("./src/routes/routes");
const errorHandler = require("./src/middlewares/errorHandler.middleware");
const imageUpload = require("./src/utils/imageUploadHelper");

dotenv.config();
connectDb();

// ** expend the packages ***
const app = express();
app.use(imageUpload.upload);  // Handles image upload before parsing JSON
app.use(cors());
app.use(bodyParser.json());
app.use("/assets/images", express.static(imageUpload.serveImages));
// ** Call Main Router **
app.use("/api", mandiRouter);

// *** Use the error-handling middleware ***
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.warn("Server Port is listening", process.env.PORT);
});
