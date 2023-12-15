import React, { useState, useEffect, useContext } from "react";

import {
  TextField,
  Box,
  InputAdornment,
  Grid,
  IconButton,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

import { toast } from "react-toastify";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./ProfileStyle.css";

import TryAgain from "./Error/TryAgain";
import password_bg from "../../assets/images/password-bg.jpg";
import { service } from "../../services/Service";
import { ProfileIdContext } from "../../App";
import apiCalls from "../../Calls/apiCalls";

const ChangePassword = () => {
  const profileId=JSON.parse(localStorage.getItem('profileId'));
  const givenProfileID = profileId;

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [profileData, setProfileData] = useState({
    userName: "",
    userGender: "",
    userEmail: "",
    userMobNo: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errorMatch, setErrorMatch] = useState({
    newNold: false,
    newNconfirm: false,
  });
  const [incorrect, setIncorrect] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let result = apiCalls.getProfileById(givenProfileID);
    result
      .then((res) => {
        setProfileData(res.data);
        setLoadError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadError(true);
      });
  }, []);

  //Password Change Handler - checks whether password follows the rules or not
  //Password should include at least 8 characters and no spaces.
  const passwordHandler = (e) => {
    setErrorMatch({ newNold: false, newNconfirm: false });
    setIncorrect(false);

    const passwordPattern = /^(?!.*\s).{8,20}$/;

    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
      if (!passwordPattern.test(e.target.value)) {
        e.target.value.length === 0
          ? setError((prev) => {
              return { ...prev, oldPassword: false };
            })
          : setError((prev) => {
              return { ...prev, oldPassword: true };
            });
      } else {
        setError((prev) => {
          return { ...prev, oldPassword: false };
        });
      }
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
      if (!passwordPattern.test(e.target.value)) {
        e.target.value.length === 0
          ? setError((prev) => {
              return { ...prev, newPassword: false };
            })
          : setError((prev) => {
              return { ...prev, newPassword: true };
            });
      } else {
        setError((prev) => {
          return { ...prev, newPassword: false };
        });
      }
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //const data = new FormData(e.currentTarget);
    // console.log(oldPassword, newPassword, confirmPassword);

    if (newPassword !== confirmPassword) {
      setIncorrect(false);
      setErrorMatch((prev) => {
        return { newNold: false, newNconfirm: true };
      });
    } else if (newPassword === oldPassword) {
      setIncorrect(false);
      setErrorMatch((prev) => {
        return { newNconfirm: false, newNold: true };
      });
    } else if (newPassword !== oldPassword && newPassword === confirmPassword) {
      setErrorMatch({
        newNold: false,
        newNconfirm: false,
      });
      let result = apiCalls.changePassword({
        email: profileData.userEmail,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      result
        .then((res) => {
          console.log("then", res);
          if (res.status === 200) {
            setIncorrect(false);
            toast.success("Updated Successfully", {
              position: "bottom-right",
              autoClose: 3000,
            });
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log("error", err);
          console.log(err.response.status); //404
          console.log(err.response.statusText); //"Not Found"
          if (
            err.response.status === 400 &&
            err.response.statusText === "Bad Request"
          ) {
            const bool =
              err.response.data.message ===
              "Unable to change password. Entered old password is invalid!!!";

            setIncorrect(bool);
          } else if (
            err.response.status === 404 &&
            err.response.statusText === "Not Found"
          ) {
            console.log(err.response.data.message);
          }
        });
    }
  };

  if (loadError) {
    return <TryAgain />;
  }

  return (
    <Box
      className="changePassword-box"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${password_bg})`,
        backgroundSize: "cover",
      }}
    >
      <Card
        elevation={10}
        className="changePassword-card"
        sx={{
          minWidth: 275,
          maxWidth: "50%",
          mt: "3%",
          borderRadius: 3,
        }}
      >
        <div className="changePassword-header">
          <Typography variant="h5">Change Password</Typography>
          <span
            style={{ fontStyle: "normal", marginLeft: "6px", marginTop: "3px" }}
          >
            {profileData.userEmail}
          </span>
        </div>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <form onSubmit={submitHandler}>
            <Grid container gap={2}>
              <Grid item xs={12}>
                <TextField
                  type={showPassword.oldPassword ? "text" : "password"}
                  label="Current Password"
                  variant="standard"
                  name="oldPassword"
                  required
                  placeholder="Enter Current password"
                  sx={{ width: "60%" }}
                  value={oldPassword}
                  error={error.oldPassword}
                  onChange={passwordHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => {
                              return {
                                ...prev,
                                oldPassword: !prev.oldPassword,
                              };
                            })
                          }
                        >
                          {showPassword.oldPassword ? (
                            <VisibilityOffIcon
                              color={error.oldPassword ? "error" : "info"}
                            />
                          ) : (
                            <VisibilityIcon
                              color={error.oldPassword ? "error" : "info"}
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
                  type={showPassword.newPassword ? "text" : "password"}
                  label="New Password"
                  variant="standard"
                  name="newPassword"
                  required
                  placeholder="Enter New password"
                  sx={{ width: "60%" }}
                  value={newPassword}
                  error={error.newPassword}
                  onChange={passwordHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => {
                              return {
                                ...prev,
                                newPassword: !prev.newPassword,
                              };
                            })
                          }
                        >
                          {showPassword.newPassword ? (
                            <VisibilityOffIcon
                              color={error.newPassword ? "error" : "info"}
                            />
                          ) : (
                            <VisibilityIcon
                              color={error.newPassword ? "error" : "info"}
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
                  type="password"
                  label="Confirm New Password"
                  variant="standard"
                  name="confirmPassword"
                  required
                  placeholder="Re-Enter New password"
                  sx={{ width: "60%" }}
                  value={confirmPassword}
                  error={error.confirmPassword}
                  onChange={passwordHandler}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "5%",
                mb: "1%",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="info"
                disabled={error.oldPassword || error.newPassword}
              >
                Update Password
              </Button>
              {error.oldPassword || error.newPassword ? (
                <span className="password-error">
                  Must Contain 8 - 20 Characters and No Spaces
                </span>
              ) : (
                ""
              )}
              {errorMatch.newNconfirm ? (
                <span className="password-error">Passwords don't Match</span>
              ) : (
                ""
              )}
              {errorMatch.newNold ? (
                <span className="password-error">
                  Use different password | New password cannot be same as the
                  old password
                </span>
              ) : (
                ""
              )}
              {incorrect ? (
                <span className="password-error">
                  Incorrect Password, Please Enter Correct Old Password
                </span>
              ) : (
                ""
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChangePassword;
