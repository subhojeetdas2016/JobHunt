import mongoose from "mongoose";
const uri = 'mongodb+srv://subhojeetdas2016:SUbhojeet592u@cluster0.f5uyx.mongodb.net/'
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo connected successfully");
    }
    catch (err) {
        console.error(err);
    }
}

export default connectDb;