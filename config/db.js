import mongoose from "mongoose";
const connectDb = async () =>{
    try{
        const conn =await mongoose.connect(process.env.MONGODB_COMPUS)
        console.log(`mongodb connected ${mongoose.connection.host}`)
    }
        catch(error){
            console.log(`error hai mongo mai ${error}`)
        }
    }
export default connectDb;