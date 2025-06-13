import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("Connecting to:", process.env.MONGO_URI); // Add this temporarily

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};

export default connectDb;
