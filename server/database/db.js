import mongoose from "mongoose";

export const Connection=async (USERNAME,PASSWORD)=>{
  const URL =`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.n2ktt94.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  try{
    await mongoose.connect(URL)
    console.log("Database Connected successfully")
  }
  catch(err){
    console.log('Error while connecting to database',err);
  }
}

export default Connection;