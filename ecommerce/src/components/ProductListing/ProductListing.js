import React from 'react'
import ProductCard from './ProductCard'
import './ProductListing.css';
import 'bootstrap/dist/css/bootstrap.css';
const profileId=JSON.parse(localStorage.getItem('profileId'));

function ProductListing() {
  return (
    
    <div className='card' >
        <ProductCard/>
    </div>
  )
}

export default ProductListing