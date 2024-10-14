import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("Database connected succesfully...");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

export default connectDB;
