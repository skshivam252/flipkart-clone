import axios from 'axios';
import { URL } from '../constants/data.js';
export const authenticateSignup=async(data)=>{
  try{
    return await axios.post(`${URL}/signup`, data)
  }
  catch(err){
    console.log('Error while calling signup api', err)
  }
}

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data)
  }
  catch (err) {
    console.log('Error while calling login api', err)
    return err.response;
  }
}


export const payUsingPaytm= async(data)=>{
  try{
    let response=await axios.post(`${URL}/payment`,data);
    return response.data;
  }
  catch(error){
    console.log(`Error while calling payment api ${error}`)
  }
}