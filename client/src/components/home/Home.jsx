import { Box, styled } from "@mui/material";
import Banner from "./Banner";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { getProducts } from "../../redux/action/product-action.js";
import {useDispatch, useSelector} from 'react-redux'
import Slide from "./Slide.jsx";
import MidSlide from "./MidSlide.jsx";
import Midsection from "./MidSection.jsx";


const Component=styled(Box)`
  padding: 10px;
  background: #F2F2F2;
`
const Home=()=>{

  const {products}= useSelector(state=>state.getProducts)

  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])
  return (
    <>
      <NavBar />
      <Component>
        <Banner />
        <MidSlide products={products} title="Deal of the Day" timer={true}/>
        <Midsection/>
        <Slide products={products} title="Discount for you" timer={false} />
        <Slide products={products} title="Suggested Items" timer={false} />
        <Slide products={products} title="Trending offers" timer={true} />
      </Component>
      
    </>
    
  )
}

export default Home;