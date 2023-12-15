import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import "./WishList.css"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate, useParams } from 'react-router';
import { useContext } from 'react';
import { ProfileIdContext } from '../../App';
import toast from 'react-hot-toast';
import apiCalls from '../../Calls/apiCalls';

const WishList = () => {
    const profileId=JSON.parse(localStorage.getItem('profileId'));
    const [wishList, setWishList] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    // const profileId=JSON.parse(localStorage.getItem('profileId'));

    useEffect(() => {
        async function getData() {
            apiCalls
                .getWishlistByWishlistId(params.id)
                .then((res) => {
                    setWishList(res.data);
                    setIsLoaded(true);
                    console.log(res.data);
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

    const addProductToCart = (productId) => {
        console.log(productId);
        const jsonData = {
            profileId: profileId,
            productDetails: {
                productId: productId,
                quantity: 1
            }
        }
        console.log(jsonData);
        apiCalls.sendProducts(JSON.stringify(jsonData));
        toast.success("Product added to cart Successfully")
    }

    const deleteProduct = (productId) => {
        const jsonData = {
            wishlistId: params.id,
            productId: productId
        }
        apiCalls.deleteWishListService(jsonData);
        const newProductsList = wishList.products.filter(i => i.productId !== productId);
        setWishList((prevWishlist) => (
            {
                ...prevWishlist,
                products: newProductsList
            }
        ));
        toast.success("Product Deleted Successfully")
    }

    const deleteWLhandler = () => {
        const res = window.confirm('Are you sure you want to delete the wishlist?');
        if(res){
            apiCalls.deleteWLService(params.id);
            toast.success('Wishlist deleted successfully!');
            navigate(-1);
        }
    }

    return (
        <div className='home'>
            <h1>{wishList.wishlistName} WishList <ShoppingCartCheckoutIcon /></h1>
            <Button onClick={deleteWLhandler}>Delete WishList</Button>
            {isLoaded && wishList.products.map((i) => (
                <div className='wishlistCard' key={i.productId}>
                    <div className='image'>
                        <img src={i.productImageUrl[0]} alt="Img" />
                    </div>
                    <div className='productDetails'>
                        <h2>{i.productName}</h2>
                        {/* <p>{i.productDescription}</p>    */}
                        <p>If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. </p>
                        <h5>Price ₹{i.productPrice}</h5>
                        <span>
                            <Button onClick={addProductToCart.bind(null,i.productId)}>Add To Cart <ShoppingBagIcon /></Button>
                            <Button onClick={deleteProduct.bind(null, i.productId)}><DeleteIcon /> Remove</Button>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WishList