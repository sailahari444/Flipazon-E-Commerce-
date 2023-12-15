
import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import  {useNavigate} from "react-router-dom";

import { service } from "../../services/Service";
import { setCookie } from "../../utils/Cookie";
import { ProfileIdContext } from "../../App"
import { Notification, notifySuccess, notifyError } from "../../utils/Notification";

import login from "../../assets/images/login.png";
import logo from "../../assets/images/logo.png";
import AuthService from '../../Auth/AuthService';
import cartImage from "./cart.png";

import "./Login.css";
import { fontWeight } from "@mui/system";

function Login() {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  function onSubmit() {
    textFieldOnChange()
    fetchUserToken();
  }
  function textFieldOnChange() {
    setError(false);
    setNameHelperText("");
    setPasswordHelperText("");
  }
 
  const handleSubmit=()=>{
    fetchUserToken()
  }

  async function fetchUserToken() {
    const authRequest = {
      userEmail: name,
      userPassword: password,
    };
    AuthService.login(name,password).then((res)=>{
      if(res=="Success"){
        navigate('/products')
      }
    }).catch(
      (err) => {
            // setError(true);
            notifyError("Invalid Credentaials")
          });
    // service
    //   .authenticate(JSON.stringify(authRequest))
    //   .then((res) => {
    //     setProfileId(res.data.profileId)
    //     setCookie("token", res.data.token);
    //     notifySuccess("Welcome Back");
    //     console.log("success", res.data);
    //     navigate('/products')
    //   })
    //   .catch((err) => {
    //     setError(true);
    //     setNameHelperText("Incorrect UserName");
    //     setPasswordHelperText("Incorrect Password");
    //     notifyError("Invalid Credentaials")
    //   });
  }

  return (
    <div className="loginClass">
    <div className="form" >
        <div className="input-container">
          <label className="label"><p className="textCon">Username: </p></label>
          <input
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="label"><p className="textCon">Password: </p></label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" id="login-btn" onClick={handleSubmit}>
          Login
        </button>
      </div>
      </div>
  );
}

export default Login;
