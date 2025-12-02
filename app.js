const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/mongo");
const mainRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connect
connectDB();

// CORS
app.use(cors());

// Routes
app.use("/v1", mainRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
