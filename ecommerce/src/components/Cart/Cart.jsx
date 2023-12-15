import "./Cart.css";
import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, redirect,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiCalls from "../../Calls/apiCalls";
import { ProfileIdContext } from "../../App";
import ExceptionHandler from '../../ExceptionHandler/ExceptionHandler';

function Cart() {
  const profileId=JSON.parse(localStorage.getItem('profileId'));
  const cart = useSelector((state) => state.cart);
  const navigate= useNavigate();
  // console.log(props);
  // console.log(window.location.pathname);
  // const Items = useSelector(cartItems);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    async function getCartItems() {
      const res = await apiCalls.getProducts(profileId).then((result) => {
        var res= result.data;
        // console.log("Here")
        setCartId(res.cartId);
        setCartItems(res.productDetailsDtoList);
      return res;
      }).catch((err) => {
        // console.log(err)
        const error=err
        // console.log(typeof(err))
        navigate('/exceptionHandler',{
          state:{
            code:error.response.status,
            // message:error.response.data,
            path:window.location.pathname
          }
        }
        // ,{
        //   state:{
        //     err:err
        //   }
        // }
        )
        return
        // props.handleBearerToken(null);
      });
    }
    getCartItems();

    // ProductDetailsList.push("Pd "+productDetails)
  }, []);

  const updatingCart = () => {
    const updatedList = cartItems.map((item) => {
      return {
        productId: item.product.productId,
        quantity: item.quantity,
      };
    });
    // console.log(updatedList);
    const data = {
      cartId: cartId,
      profileId: profileId,
      productDetailsList: updatedList,
    };
    apiCalls.updateCart(data).then((res)=>{
      toast.success(`Updated Cart`, {
        position: "bottom-left",
      });
    }).catch((err) => {
      // console.log(err)
      const error=err
      // console.log(typeof(err))
      navigate('/exceptionHandler',{
        state:{
          code:error.response.status,
          // message:error.response.data,
          path:window.location.pathname
        }
      }
      // ,{
      //   state:{
      //     err:err
      //   }
      // }
      )
      return
      // props.handleBearerToken(null);
    });
    
  };

  const setTotal = () => {
    var sum = 0.0;
    if (cartItems != null) {
      const total = cartItems.map((item) => {
        sum = sum + item.product.productPrice * item.quantity;
      });
    }
    // console.log(sum)
    // setCartTotal(sum)
    return sum;
  };

  const handleDecreaseCart = (key) => {
    const updatedList = cartItems.map((item) => {
      if (item.product.productId === key) {
        if (item.quantity - 1 == 0) {
          setCartItems((prevCartItems) => {
            // Filter out the item to be removed
            const updatedCartItems = prevCartItems.filter(
              (item) => item.product.productId !== key
            );
            return updatedCartItems;
          });
        } else {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setCartItems(updatedList);
  };

  const handleRemoveFromCart = (key) => {
    // console.log(cartItems);
    if (cartItems.length == 1) {
      // console.log("Here");
      handleClearCart();
    } else {
      setCartItems((prevCartItems) => {
        // Filter out the item to be removed
        const updatedCartItems = prevCartItems.filter(
          (item) => item.product.productId !== key
        );
        return updatedCartItems;
      });
      updatingCart();
    }
    toast.error(`Product removed from cart`, {
      position: "bottom-left",
    });
  };

  const handleIncreaseCart = (key) => {
    const updatedList = cartItems.map((item) => {
      if (item.product.productId === key) {
        // console.log(item)
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    // console.log(updatedList);
    setCartItems(updatedList);
  };
  const handleClearCart = () => {
    apiCalls.deleteCartItems(profileId).then(()=>{
      toast.error("Cart cleared", { position: "bottom-left" });
      setCartItems([])
      return redirect("/cart");
    }).catch((err) => {
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
   
  };

  return (
    <div className="cart-background">
      <div className="card-header">
        <h4 className="text-center">SHOPPING CART</h4>
      </div>
      <div className="cart-container">
        <div className="col-md-20">
          <div className="card">
            {cartItems === null ? (
              <div>
                <p>Your cart is currently empty</p>
                <div className="start-shopping">
                  <Link to="/products">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Start Shopping</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="card-header">
                  <div className="titles">
                    <h3 className="product-title">Product</h3>
                    <h3 className="price">Price</h3>
                    <h3 className="quantity">Quantity</h3>
                    <h3 className="total">Total</h3>
                  </div>
                </div>
                <div className="cart-items">
                  {cartItems?.map((cartItem) => (
                    <div className="cart-item" key={cartItem.product.productId}>
                      <div className="cart-product">
                        <img
                          src={cartItem.product.productImageUrl[0]}
                          alt={cartItem.product.productName}
                        />
                        <div>
                          <h3>{cartItem.product.productName}</h3>
                          <p>{cartItem.product.productDescription}</p>
                          <button
                            onClick={() =>
                              handleRemoveFromCart(cartItem.product.productId)
                            }
                          >
                            REMOVE &nbsp;
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              color="black"
                              fill="currentColor"
                              class="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="cart-product-price">
                        &#x20b9;{cartItem.product.productPrice}
                      </div>
                      <div className="cart-product-quantity">
                        <button
                          onClick={() =>
                            handleDecreaseCart(cartItem.product.productId)
                          }
                        >
                          -
                        </button>
                        <div className="count">{cartItem.quantity}</div>
                        <button
                          onClick={() =>
                            handleIncreaseCart(cartItem.product.productId)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-product-total-price">
                        &#x20b9;
                        {cartItem.product.productPrice * cartItem.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleClearCart()}>
              CLEAR CART
            </button>
            <button
              className="save-cart"
              onClick={() => updatingCart(cartItems)}
            >
              SAVE CART
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">&#x20b9;{setTotal()} </span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <Link to="/checkout">
                <button>CHECK OUT</button>
              </Link>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
