const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
let db;
if (process.env.NODE_ENV !== "test") {
  db = mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Production Database Connected");
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting database!!!.");
    });
} else {
  db = mongoose
    .connect(process.env.MONGO_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Test Database Connected");
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting database!!!.");
    });
}
module.exports = db;
