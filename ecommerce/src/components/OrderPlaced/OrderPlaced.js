import {React,useState} from 'react'
import './OrderPlaced.css'
import { useNavigate,useLocation } from "react-router-dom";


function OrderPlaced() {
  const location=useLocation();
  const navigate=useNavigate();
  const[orderId,setOrderId]=useState(location.state.orderId)

  const goHome=()=>{
    navigate('/products')
  }
  
  const goToMyOrders=()=>{
    navigate('/orders')
  }

  return (
    <div className='orderPlaced'>
      <h1>Thank You For Your Purchase</h1>
      <h1>Your order # is: {orderId}</h1>
      <div>
        <input type="button" value="Continue Shopping" className='button' onClick={goHome}/>
        <input type="button" value="View My Orders" className='button' onClick={goToMyOrders} />
      </div>
    </div>
  )
}

export default OrderPlaced