import mongoose from "mongoose";

module.exports = (async function dbConfig() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("connected to database");
    return;
  } catch (err) {
    console.log(err);
  }
})();
