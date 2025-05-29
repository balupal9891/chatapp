import mongoose from "mongoose";

const connectToMongo = async ()=>{
    
    try {
        const response = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGO CONNECTED");
    } catch (error) {
        console.log("MONGO ERROR");
    }
}


export default connectToMongo;