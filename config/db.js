const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Baptiste:Baptiste7@cluster0-qzh6z.mongodb.net/nodeApi?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log("mongoDB connected");
  } catch (error) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
