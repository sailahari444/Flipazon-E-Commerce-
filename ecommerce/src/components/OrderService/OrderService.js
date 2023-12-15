import React, { useState, useEffect } from 'react';
// import { service } from "../../services/Service";
import "./OrderService.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typewriter from 'typewriter-effect';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, Link } from '@mui/material';
import AddRating from '../AddRating/Addrating';
import apiCalls from '../../Calls/apiCalls';
// import ExceptionHandler from '../../ExceptionHandler/ExceptionHandler'
import { useNavigate } from 'react-router-dom';


const OrderService = () => {

  const profileId=JSON.parse(localStorage.getItem('profileId'));
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    async function getData() {
      apiCalls
        .getOrders(profileId)
        .then((res) => {
          // console.log(res.data);
          setOrderDetails(res.data);
          // localStorage.setItem('ordDetail',res.data)
          // console.log(orderDetails);
        })
        .catch((err) => {
          const error=err
          navigate('/exceptionHandler',{
            state:{
              code:error.response.status,
              // message:error.response.data,
              path:window.location.pathname
            }
          }
          )
          return
        });
    }
    getData();
  }, []);


  let total;
  const totalPrices = [];
  for (let order of orderDetails) {
    total = 0;
    for (let product of order['orderLineItemsDtos']) {
      total += product.price * product.quantity;
    }
    totalPrices.push(total);
  }
  let index = 0;

  return (

    <div className='orderCardHome'>
      <h1>Order History
        <AccessTimeIcon className='avatar' />
      </h1>
      <Typewriter
        options={{
          strings: ["Give ratings to the Products"],
          autoStart: true,
          loop: true,
          cursor: "",
          wrapperClassName: "typewriterpara",
          delay: 2,
        }}
      />

      {
        orderDetails.map((element) => (
          <div className='orderCard' key={element.orderId}>
            <span id='orderSpan'>
              <ul>
                <li><h4 style={{fontWeight:"bold"}}>Order ID <Grid3x3Icon className='avatarItems' />{element.orderId}</h4></li>
                <li><h5>Order Date: <CalendarMonthIcon className='avatarItems' />{new Date(element.orderPlacedDateTime).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</h5> </li>
              </ul>
            </span>
            {element.orderLineItemsDtos.map((items) => (
              <OrderCard
                key={items.orderId}
                price={(items.price*items.quantity)}
                quantity={items.quantity}
                productId={items.productId}
              />
            ))
            }
            <div className='div1'>
              <h2>Total Price ₹{totalPrices[index++]}</h2>
            </div>
          </div>
        ))
      }
    </div>
  )
}

const OrderCard = ({ price, quantity, productId }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate=useNavigate();


  async function getProductData() {
    apiCalls
      .getProductDetail(productId)
      .then((res) => {
        setProductDetails(res.data);
        setLoaded(true);
        // console.log(productDetails.productImageUrl[0])
        // localStorage.setItem('prodDetail',res.data)
        // console.log(productDetails)
      })
      .catch((err) => {
        const error=err
        navigate('/exceptionHandler',{
          state:{
            code:error.response.status,
            // message:error.response.data,
            path:window.location.pathname
          }
        }
        )
        return
      });
  }

  useEffect(() => {
    getProductData();
  }, []);

  // useEffect(()=>{
  //   console.log(productDetails)
  // },[productDetails])
  let content = <></>;
  if(loaded){
    content = <div className='orderItems'>
    <div className='image'>
      
       <img src={productDetails.productImageUrl[0]} />
    </div>
    <div className='productItems'>
      <h2>{productDetails.productName}</h2>
      
      <p>{productDetails.productDescription}</p>
      <h5>Price ₹{price}</h5>
      <h5>Qty {quantity}</h5>
      <span>
        <AddRating className='addrating' productId={productDetails.productId}/>
        {/* <AddRating className='addrating' /> */}
      </span>
    </div>
  </div>;
  }
  return (
    content
  )
};


export default OrderService;