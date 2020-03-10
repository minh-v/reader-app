import mongoose from "mongoose";

//connecting to db on robo3t
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
