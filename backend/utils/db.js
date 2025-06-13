import mongoose from "mongoose";
const uri = 'mongodb+srv://subhojeetdas2016:i58ezkeGLLGu0oVi@cluster0.f5uyx.mongodb.net/test?retryWrites=true&w=majority'
PORT = 3000
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