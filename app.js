const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

// import routes
const userRoutes = require("./routes/user");

connectDB();

// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
