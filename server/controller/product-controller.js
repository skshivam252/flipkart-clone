import { request, response } from "express"
import Products from "../models/product-schema.js"


export const getProducts=async (request,response)=>{
  try{
    const products= await Products.find({})
    response.status(200).json(products)
  }
  catch(err){
    response.status(500).json({"message": err.message})
  }
}

export const getProductById = async (request, response) => {
  try {
    const product = await Products.findOne({ 'id': request.params.id });
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({message:error.message});
  }
}