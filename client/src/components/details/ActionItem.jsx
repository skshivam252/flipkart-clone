import { Box, Button, styled } from "@mui/material";

import {ShoppingCart as Cart, FlashOn as Flash} from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action/cart-actions";
import { useState } from "react";
import { payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";


const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('md')]: {
    padding: '20px 40px'
  }
}))

const Image = styled('img')({
  padding: '15px 20px',
  border: '1px solid #f0f0f0',
  width: '85%'
});

const StyledButton = styled(Button)(({ theme }) => ({
  width: '48%',
  height: '50px',
  borderRadius: '2px',
  [theme.breakpoints.down('lg')]: {
    width: '46%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '48%'
  }
}))



const ActionItem=({product})=>{
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const [quantity, setQuantity]= useState(1);

  const addItemToCart=()=>{
    dispatch(addToCart(product.id, quantity));
    navigate('/cart');
  }

  const buyNow= async()=>{
    let response = await payUsingPaytm({amount: 500, email: 'skshivam252@gmail.com'})
    let information={
      action: 'https://securegw-stage.paytm.in/order/process',
      params: response
    }
    // post(information)
  }

  return(
    <LeftContainer>
      <Image src={product.detailUrl} alt="product" />
      <StyledButton variant="contained" onClick={()=> addItemToCart()} style={{marginRight: 10, background: '#ff9f00'}}><Cart/>Add to Cart</StyledButton>
      <StyledButton variant="contained" onClick={buyNow()} style={{background: '#fb541b'}}><Flash/>Buy Now</StyledButton>
    </LeftContainer>
  )
}

export default ActionItem;