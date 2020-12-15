
// Require Mongoose
const mongoose = require('mongoose');

// Connect To Database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
}

connectToDatabase();
