import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "dirz7npcv", // Fallback for testing
    api_key: process.env.API_KEY || "514732626343441",
    api_secret: process.env.API_SECRET || "LaYiyCEjMRZk7QlIdDuaog_IK84",
});

console.log("Cloudinary Config:");
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("API_KEY:", process.env.API_KEY);
console.log("API_SECRET:", process.env.API_SECRET);

export default cloudinary;
