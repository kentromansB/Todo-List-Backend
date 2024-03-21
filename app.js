const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const userRouter = require("./routes/User");
const taskRouter = require("./routes/Task");
const UserController = require("./controllers/userController"); // Import userController

const app = express();
const port = process.env.PORT; // Use port from environment variable or default to 3000

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Middleware
app.use(
  cors({ origin: true, credentials: true, methods: "GET,POST,PUT,DELETE" })
);
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", taskRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
