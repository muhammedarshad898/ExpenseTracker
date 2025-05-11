import mongoose from "mongoose";
const MONGO_URI:any = process.env.MONGO_URI;

const mongoDBConnection=async()=>{
  await mongoose.connect(MONGO_URI).then(res=>{
        console.log("server is Connected to the MongoDB")
    }).catch(err=>{
        console.log(err)
    })
}

export default mongoDBConnection;
