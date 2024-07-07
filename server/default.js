import Products from "./models/product-schema.js"
import { products } from "./constants/data.js"

const defaultData=async ()=>{
  try{
    // await Products.deleteMany({});
    await Products.insertMany(products);
    console.log("Data inserted successfully")
  }
  catch(err){
    console.log("Error while inserting default data", err.message)
  }
}

export default defaultData;