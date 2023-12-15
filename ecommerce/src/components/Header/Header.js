import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/images/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AuthService from "../../Auth/AuthService";

const Header = () => {
  const navigate = useNavigate();
  // const [login, setLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [cartCount,setCartCount]=useState(0)
  const open = Boolean(anchorEl);
  // console.log(localStorage.getItem('profileId'))
  // if(localStorage.getItem('profileId')){
  //   // setLogin(false)
  //   console.log("true")

  // }
  // const getcartCount=()=>{
  //   if(localStorage.getItem('profileId')){
  //     const profileId=localStorage.getItem('profileId');
  //     apiCalls.getProducts(profileId).then((res)=>{
  //     console.log(res.data.productDetailsDtoList)
  //   })
  //   }
  //   else{
  //     setCartCount(0)
  //   }
    
  // }
  // cartCount()
  const onlogoClick = () => {
    // console.log("logo clicked");
    //home
    if(localStorage.getItem('profileId')){
      navigate("/products");
    }
    else{
      navigate("/");
    }
    
  };
  const onSignup = () => {
    // console.log("Sign Up Clicked");
    navigate("/register");
  };

  const myProfileHandler = () => {
    setAnchorEl(null);
    navigate("/myprofile");
  };
  const myAddressHandler = () => {
    setAnchorEl(null);
    navigate("/myaddress");
  };
  const changePasswordHandler = () => {
    setAnchorEl(null);
    navigate("/changepassword");
  };
  const myOrdersHandler = () => {
    setAnchorEl(null);
    navigate("/orders");
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    // console.log("logout clicked");
    AuthService.logout()
    navigate("/");
  };

  const openWishList=()=>{
    navigate('/wishlist')
  }
  const openCart=()=>{
    navigate('/cart')
  }

  return (
    <div style={{ marginBottom: "5%" }}>
      <AppBar elevation={1} position="absolute">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={onlogoClick}>
            <img src={logo} width={150} />
          </IconButton>
          <div>
            {/* {!localStorage.getItem('profileId')? ( */}
              {!localStorage.getItem('profileId')? (
              <Button
                sx={{
                  color: "whitesmoke",
                  fontWeight: "Bold",
                  fontSize: "18px",
                }}
                onClick={onSignup}
              >
                Sign Up
              </Button>
            ) : (
              <div>
                <IconButton color="inherit" size="large" onClick={openWishList}>
                  <Badge badgeContent={0} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" size="large" onClick={openCart}>
                  <Badge badgeContent={0} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </div>
            )}
          </div>
        </Toolbar>
        <Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null);
            }} 
          >
            <MenuItem onClick={myProfileHandler}>My Profile</MenuItem>
            <MenuItem onClick={myAddressHandler}>My Address</MenuItem>
            <MenuItem onClick={changePasswordHandler}>Change Password</MenuItem>
            <MenuItem onClick={myOrdersHandler}>My Orders</MenuItem>
            <MenuItem
              onClick={logoutHandler}
              sx={{ backgroundColor: "#f5f5f5", mb: -1 }}
            ><LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </AppBar>
    </div>
  );
};

export default Header;
