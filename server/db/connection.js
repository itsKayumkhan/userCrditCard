import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGODB_URL;

 const connection = async () => {
 
  try {
    await mongoose.connect(URL);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};

export default connection;