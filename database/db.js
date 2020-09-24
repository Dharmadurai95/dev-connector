const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(
  config.get("MONGO_URL"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected successfully");
  }
);
