import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { service } from "../../services/Service";
import { setCookie } from "../../utils/Cookie";
import { ProfileIdContext } from "../../App"

import {
  TextField,
  Avatar,
  Box,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  Button,
  Link,
  MenuItem,
  CardActions,
  CardMedia,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import registerImage from "../../assets/images/register.png";
import ErrorIcon from "@mui/icons-material/Error";

import { toast } from "react-toastify";
import AuthService from "../../Auth/AuthService";
import { Notification, notifySuccess, notifyError } from "../../utils/Notification";

const Register = () => {
  // const profileContext = useContext(ProfileIdContext);
  // console.log(profileContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    userName: "",
    userPassword: "",
    userGender: "",
    userEmail: "",
    userMobNo: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    userPassword: false,
    userMobNo: false,
    mobNoExists: false,
    emailExits: false,
  });

  //UserName Change Handler
  const userNameHandler = (e) => {
    setProfile((prev) => {
      return { ...prev, userName: e.target.value };
    });
  };
  //UserEmail Change Handler
  const userEmailHandler = (e) => {
    setProfile((prev) => {
      return { ...prev, userEmail: e.target.value };
    });
    setError((prev) => {
      return { ...prev, emailExits: false };
    });
  };
  //Password Change Handler - checks whether password follows the rules or not
  //Password should include at least 8 characters and no spaces.
  const passwordHandler = (e) => {
    setProfile((prev) => {
      return { ...prev, userPassword: e.target.value };
    });
    const passwordPattern = /^(?!.*\s).{8,20}$/;

    if (!passwordPattern.test(e.target.value)) {
      setError((prev) => {
        return { ...prev, userPassword: true };
      });
    } else {
      setError((prev) => {
        return { ...prev, userPassword: false };
      });
    }
  };
  //Mobile Number Handler - checks whether mobile number has exactly 10 numbers/digits or not
  const mobnoHandler = (e) => {
    setProfile((prev) => {
      return { ...prev, userMobNo: e.target.value };
    });

    const mobnoPattern = /^[0-9]{10}$/;
    if (!mobnoPattern.test(e.target.value)) {
      setError((prev) => {
        return { ...prev, mobNoExists: false, userMobNo: true };
      });
    } else {
      setError((prev) => {
        return { ...prev, mobNoExists: false, userMobNo: false };
      });
    }
  };
  async function fetchUserToken(em,ps) {
    const authRequest = {
      userEmail: em,
      userPassword: ps,
    };
    AuthService.login(em,ps);
    service
      .authenticate(JSON.stringify(authRequest))
      .then((res) => {
        setCookie("token", res.data.token);
        notifySuccess("Welcome Back");
        console.log("success", res.data);
        navigate('/products')
      })
      .catch((err) => {
        setError(true);
      });
  }
  //Form Sumbit Handler - registers the currentProfile data in database
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const currentProfile = {
      userName: data.get("userName").trim(),
      userPassword: data.get("userPassword").trim(),
      userGender: data.get("userGender").trim(),
      userEmail: data.get("userEmail").trim(),
      userMobNo: data.get("userMobNo").trim(),
    };

    

    let result = service.register(currentProfile);
    // AuthService.login(currentProfile.userEmail,currentProfile.userPassword);
    
    result
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          setError({
            userPassword: false,
            userMobNo: false,
            mobNoExists: false,
            emailExits: false,
          });
          toast.success("Registration Successful", {
            position: "bottom-right",
            autoClose: 3000,
          });
          fetchUserToken(currentProfile.userEmail,currentProfile.userPassword)
          console.log("successfully registered");
          
          navigate('/products')
          
          // navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 400) {
          const emailExits =
            err.response.data.errorCode === "USER_EMAIL_ALREADY_EXITS" ||
            err.response.data.message.includes(
              "Profile with this Email Id already exists"
            );

          const mobNoExists = err.response.data.message.includes(
            "Profile with this mobile number already exists"
          );
          setError((prev) => {
            return {
              ...prev,
              emailExits: emailExits,
              mobNoExists: mobNoExists,
            };
          });
        } else {
          console.log("Register error :", err.message);
        }
      });
  };

  return (
    <Card
      className="registerform"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "rgb(240, 243, 243)"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "-10%",
          }}
        >
          <Typography variant="h4" color={"GrayText"} sx={{marginTop:"60px"}}>
            Create Account
          </Typography>
          <CardMedia
            id="register-image"
            component="img"
            image={registerImage}
            alt="register image"
            loading="lazy"
          />
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            id="signup-avatar"
            sx={{
              mt: "1%",
              bgcolor: "primary.main",
              width: 50,
              height: 50,
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography
            id="signup-text"
            variant="h5"
            sx={{ fontSize: "33px", mb: 3 }}
          >
            Sign up
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={3} name="register">
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="User Name"
                  variant="outlined"
                  name="userName"
                  id="username-input"
                  required
                  sx={{ width: "60%", backgroundColor: "white" }}
                  value={profile.userName}
                  onChange={userNameHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon color="info" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  name="userEmail"
                  id="useremail-input"
                  required
                  sx={{ width: "60%", backgroundColor: "white" }}
                  value={profile.userEmail}
                  error={error.emailExits}
                  helperText={
                    error.emailExits
                      ? "Email has already been taken , use Different Email"
                      : ""
                  }
                  onChange={userEmailHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {error.emailExits ? (
                          <ErrorIcon color="error" />
                        ) : (
                          <EmailIcon color="info" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  name="userPassword"
                  id="userpassword-input"
                  required
                  sx={{ width: "60%", backgroundColor: "white" }}
                  value={profile.userPassword}
                  error={error.userPassword}
                  helperText={
                    error.userPassword
                      ? "Must Contain 8 - 20 Characters and No Spaces"
                      : ""
                  }
                  onChange={passwordHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon
                              color={error.userPassword ? "error" : "info"}
                            />
                          ) : (
                            <VisibilityIcon
                              color={error.userPassword ? "error" : "info"}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Mobile Number"
                  variant="outlined"
                  name="userMobNo"
                  id="usermobno-input"
                  required
                  sx={{ width: "60%", backgroundColor: "white" }}
                  value={profile.userMobNo}
                  error={error.userMobNo || error.mobNoExists}
                  helperText={
                    (error.userMobNo
                      ? "Must Contain exactly 10 Digits - [0-9]"
                      : "") ||
                    (error.mobNoExists
                      ? "Mobile number has already been taken , use Different Mobile Number"
                      : "")
                  }
                  onChange={mobnoHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {error.userMobNo || error.mobNoExists ? (
                          <ErrorIcon color="error" />
                        ) : (
                          <PhoneIcon color="info" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Gender"
                  name="userGender"
                  id="usergender-input"
                  sx={{ width: "30%", backgroundColor: "white" }}
                  select
                  value={profile.userGender}
                  onChange={(e) => {
                    setProfile((prev) => {
                      return { ...prev, userGender: e.target.value };
                    });
                  }}
                  required
                >
                  <MenuItem value="male" id="male">
                    Male
                  </MenuItem>
                  <MenuItem value="female" id="female">
                    Female
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By continuing, you agree to Flipazon's{" "}
                  <Typography variant="caption" color="blue">
                    Terms of Use
                  </Typography>{" "}
                  and{" "}
                  <Typography variant="caption" color="blue">
                    Privacy Policy
                  </Typography>{" "}
                  .
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ pt: "20px" }}>
              <Button
                type="submit"
                id="register-sumbit-button"
                variant="contained"
                disabled={error.userPassword || error.userMobNo}
                endIcon={<PersonAddAlt1Icon />}
              >
                Register
              </Button>
            </Box>
          </form>
          <CardActions>
            <Grid container justifyContent="center" sx={{ mb: 4, mt: 3 }}>
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </CardActions>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Register;
