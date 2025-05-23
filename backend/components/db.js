import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected`);
    }catch(e){
        console.error(e);
    }
}

export default connectDB;