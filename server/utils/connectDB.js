const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_DB_SERVER_URL)
    .then((c) =>
      console.log(
        ` DB connected successfully: ${c.connection.host} `.bgGreen.black
      )
    )
    .catch((err) =>
      console.log(` DB connected failed: ${err.message} `.bgRed.black)
    );
};

module.exports = { connectDB };
