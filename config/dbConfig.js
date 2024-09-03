import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected...");
  } catch (err) {
    console.log("Database configuration failed.");
    console.error(err.message);
    process.exit(1); 
  }
};

export default connectDB;
