const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("DB Online");
  } catch (error) {
    throw new Error("Error a la hora de iniciar a la base de datos");
  }
};

module.exports = {
  dbConnection,
};
