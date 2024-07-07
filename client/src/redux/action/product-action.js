import axios from "axios";
import { URL } from "../../constants/data.js";
import { GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS, GET_PRODUCT_DETAILS_FAIL, GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS } from "../constants/product-constant.js";



export const getProducts= ()=>async(dispatch) => {
  try{
    let {data}= await axios.get(`${URL}/products`);
    dispatch({type:GET_PRODUCTS_SUCCESS, payload: data})
  }
  catch(err){
    dispatch({type:GET_PRODUCTS_FAIL, payload: err.message})
    console.log("error while getting products", err.message);
  }
}

export const getProductDetails=(id)=>async(dispatch)=>{
  try{
    dispatch({type: GET_PRODUCT_DETAILS_REQUEST});
    
    const {data} = await axios.get(`${URL}/product/${id}`)
    dispatch({type: GET_PRODUCT_DETAILS_SUCCESS, payload: data});
  }
  catch(err){
    dispatch({ type: GET_PRODUCT_DETAILS_FAIL, payload: err.message });
  }
}