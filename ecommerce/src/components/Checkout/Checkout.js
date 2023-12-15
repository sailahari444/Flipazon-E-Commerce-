import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Link, useNavigate } from "react-router-dom";
import { service } from "../../services/Service";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import apiCalls from "../../Calls/apiCalls";
import { toast } from "react-toastify";
import ExceptionHandler from '../../ExceptionHandler/ExceptionHandler';

import {
  removeFromCart,
  getTotals,
} from "../../redux/features/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import "./Checkout.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [addresses, setaddresses] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const cart = useSelector((state) => state.cart);
  // const Items = useSelector(cartItems);
  const dispatch = useDispatch();
  const profileId = JSON.parse(localStorage.getItem("profileId"));
  const [selectaddress, setSelectaddress] = useState("");

  const [address, setaddress] = useState({
    profileId: profileId,
    houseNo: "",
    street: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
  });

  const setSubTotal = () => {
    var sum = 0.0;
    if (cartItems != null) {
      const total = cartItems.map((item) => {
        sum = sum + item.product.productPrice * item.quantity;
      });
    }
    // console.log(sum)
    // setCartTotal(sum)hii
    return sum;
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setaddress({ ...address, [e.target.name]: value });
  };

  const saveAddress = (e) => {
    e.preventDefault();
    setaddress((prevAddress) => {
      return { ...prevAddress, profileId: profileId };
    });
    console.log(address);
    apiCalls
      .addAddress(address)
      .then((response) => {
        console.log(response);
        console.log(address);
        handleClose();
        toast.success(`Address Saved Successfully`, {
          position: "bottom-left",
        });
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
  };
  useEffect(() => {
    async function getData() {
      apiCalls
        .getAddress(profileId)
        .then((res) => {
          setaddresses(res.data);
          console.log(address);
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
  }, [profileId]);
  const [addressId, setAddressId] = useState(1);

  useEffect(() => {
    async function getCartItems() {
      const res = await apiCalls.getProducts(profileId).then((result) => {
        return result.data;
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
      setCartItems(res.productDetailsDtoList);
      return res;
    }
    getCartItems();

    // ProductDetailsList.push("Pd "+productDetails)
  }, []);
  const addlist = addresses.map((address) => {
    const tempAdd =
      "#" +
      address.houseNo +
      " " +
      address.street +
      ", " +
      address.locality +
      ", " +
      address.city +
      ", " +
      address.state +
      ".";

    return (
      <div>
        <FormControlLabel
          value={tempAdd}
          onClick={() => {
            setSelectedOption(tempAdd);
            setAddressId(address.addressId);
          }}
          control={<Radio />}
          label={tempAdd}
        />
      </div>
    );
  });

  function MyFormControlLabel() {
    setSelectaddress(selectedOption);
    setAddressId(addressId);
  }

  const proceedToBuy = () => {
    const prodList = cartItems.map((item) => {
      return {
        price: item.product.productPrice,
        quantity: item.quantity,
        productId: item.product.productId,
      };
    });

    const data = {
      orderLineItemsDtoList: prodList,
      addressId: addressId,
      profileId: profileId,
    };
    // console.log(data)
    apiCalls.placeOrder(data).then((res)=>{
    // console.log(res.data)
    apiCalls.deleteCartItems(profileId).catch((err) => {
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
    const dat=res.data
    // console.log(dat)
    navigate('/orderPlaced',{
        state:{
          orderId:dat
        }
      })
    // console.log(res)
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
    <div className="checkout-background">
      <div className="card-header">
        <h4 className="text-center">CHECKOUT</h4>
      </div>

      <div className="py-4">
        <div className="container">
          <div className="row" style={{ alignItems: "flex-start" }}>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h4 className="text-center">Order Summary</h4>
                </div>
                <div className="checkout-products-background1">
                  {cartItems?.map((cartItem) => (
                    <div className="cart-item" key={cartItem.product.productId}>
                      <div className="productNameDesc">
                        <h5>
                          <b>{cartItem.product.productName}</b>
                        </h5>
                        <p>{cartItem.product.productDescription}</p>
                        <div className="py-2"></div>
                      </div>
                      <div className="col-md-25">
                        <div className="cart-product">
                          &nbsp;&nbsp;&nbsp;
                          <img
                            src={cartItem.product.productImageUrl[0]}
                            alt={cartItem.product.productName}
                            height="600"
                            width="600"
                          />
                          <div>
                            <div>
                              <div className="count">
                                <div className="py-2"></div>
                                Qty : {cartItem.quantity}
                              </div>
                            </div>
                            <div className="cart-product-total-price">
                              &#x20b9;
                              {cartItem.product.productPrice *
                                cartItem.quantity}
                            </div>
                          </div>
                          <div className="edit">
                            <Link to="/cart">
                              <button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  class="bi bi-pencil-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h4 className="text-center">Select a Delivery address</h4>
                </div>
                <div className="addresses-background">
                  <div className="py-3"></div>
                  <div style={{ marginLeft: 10 }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        {addlist}
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="py-2"></div>
                  <button
                    type="button"
                    className="use-this-address1"
                    variant="outlined"
                    onClick={MyFormControlLabel}
                  >
                    Use this Address
                  </button>
                  <div className="py-2"></div>
                  <button
                    className="handleclickbutton1"
                    type="button"
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    Click to Add New Address
                  </button>
                </div>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    Enter the Details
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <div className="card-body">
                      <div className="col-md-15">
                        <div className="form-group mb-3">
                          <label>House Number</label>
                          <input
                            type="text"
                            name="houseNo"
                            className="form-control"
                            value={address.houseNo}
                            onChange={(a) => handleChange(a)}
                          />
                        </div>
                      </div>
                      <div className="col-md-15">
                        <div className="form-group mb-3">
                          <label>Street</label>
                          <input
                            type="text"
                            name="street"
                            className="form-control"
                            value={address.street}
                            onChange={(a) => handleChange(a)}
                          />
                        </div>
                      </div>
                      <div className="col-md-15">
                        <div className="form-group mb-3">
                          <label>Locality</label>
                          <input
                            type="text"
                            name="locality"
                            className="form-control"
                            value={address.locality}
                            onChange={(a) => handleChange(a)}
                          />
                        </div>
                      </div>
                      <div className="col-md-15">
                        <div className="form-group mb-3">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            value={address.city}
                            onChange={(a) => handleChange(a)}
                          />
                        </div>
                      </div>
                      <div className="col-md-15">
                        <div className="form-group mb-3">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            className="form-control"
                            value={address.state}
                            onChange={(a) => handleChange(a)}
                          />
                        </div>
                      </div>
                      <div className="col-md-15">
                        <div className="form-group mb-3">
                          <label>PinCode</label>
                          <input
                            type="number"
                            name="pincode"
                            className="form-control"
                            value={address.pincode}
                            onChange={(a) => handleChange(a)}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <button
                      type="button"
                      className="use-this-address1"
                      autoFocus
                      onClick={saveAddress}
                    >
                      Save Address
                    </button>
                  </DialogActions>
                </BootstrapDialog>
              </div>
              <div className="py-4"></div>

              <div className="col-md-12">
                <div className="card">
                  <div className="delivery-background">
                    <div className="card-header">
                      <h5>Delivered To : </h5>
                      <p>{selectaddress}</p>
                    </div>
                    <div className="placeorder">
                      <div className="cart-checkout">
                        <div className="py-3"></div>
                        <div className="subtotal">
                          <span>Shipping</span>
                          <span className="amount">&#x20b9;100</span>
                        </div>
                        <div className="subtotal">
                          <span>Tax</span>
                          <span className="amount">&#x20b9;100</span>
                        </div>
                        <div className="subtotal">
                          <span>Subtotal</span>
                          <span className="amount">
                            &#x20b9;{setSubTotal()}
                          </span>
                        </div>
                        <hr></hr>
                        <div className="subtotal">
                          <span>Total Price</span>
                          <span className="amount">
                            &#x20b9;{setSubTotal() + 200}
                          </span>
                        </div>
                        <div className="py-2"></div>
                        <p>Continue to Place Order</p>
                        <button onClick={proceedToBuy}>
                          <b>Proceed To Buy</b>
                        </button>
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
                            <div className="py-4"></div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
