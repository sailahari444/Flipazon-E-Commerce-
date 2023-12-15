import { service } from "./services/Service";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { setCookie } from "./utils/Cookie";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./components/Checkout/Checkout";
import ProductListing from "./components/ProductListing/ProductListing";
import AuthService from "./Auth/AuthService";
import ProductView from './components/ProductView/ProductView';
import OrderService from './components/OrderService/OrderService';
import WishList from "./components/WishList/WishList";
import WishListDetails from "./components/WishList/WishListDetails";
import Register from "./components/Profile/Register";
import MyProfile from "./components/Profile/MyProfile";
import MyAddress from "./components/Profile/MyAddress";
import ChangePassword from "./components/Profile/ChangePassword";
import { Toaster } from "react-hot-toast";
import Login from './pages/Login/Login'
import Footer from './components/Footer/Footer';
import Homepage from './components/HomePage/Homepage';
import OrderPlaced from './components/OrderPlaced/OrderPlaced';
import Error500 from './components/ExceptionPages/Error500/Error500';
import ExceptionHandler from './ExceptionHandler/ExceptionHandler';

const ProfileIdContext = createContext();
function App() {
  // AuthService.login("testMail@gmail.com", "testPassword");
  // const [profileId, setProfileId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  return (<>
    {isLoaded && <ProfileIdContext.Provider
      className="App">
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <div className="main-body" style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myaddress" element={<MyAddress />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          {/* <Route path="/products" element={<ProductListing />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productView" element={<ProductView/>}/>
          <Route path="/orders" element={<OrderService/>}/>
          <Route path="/wishlist" element={<WishListDetails />} />
          <Route path="/wishlist/:id" element={<WishList />} />
          <Route path="/products" element={<Homepage />} />
          <Route path="/orderPlaced" element={<OrderPlaced />} />
          {/* <Route path="/Error500" element={<Error500 />} /> */}
          <Route path="/exceptionHandler" element={<ExceptionHandler />} />
        </Routes>
        </div>
        <Footer/>
        <Toaster/>
      </BrowserRouter>
    </ProfileIdContext.Provider>}
    </>
  );
}

export { App, ProfileIdContext };
