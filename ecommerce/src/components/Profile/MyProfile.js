import React, { useState, useEffect, useContext } from "react";

import {
  TextField,
  Avatar,
  Box,
  InputAdornment,
  Grid,
  Typography,
  Button,
  Stack,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { toast } from "react-toastify";

import "./ProfileStyle.css";
import DialogDeleteAccount from "./MyProfile/DialogDeleteAccount";
import TryAgain from "./Error/TryAgain";

import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

import profile_pic_male from "../../assets/images/profile-pic-male.svg";
import profile_pic_female from "../../assets/images/profile-pic-female.svg";

import { service } from "../../services/Service";
import { ProfileIdContext } from "../../App";
import apiCalls from "../../Calls/apiCalls";
import authHeader from './../../Auth/AuthHeader';
import AuthService from "../../Auth/AuthService";

const MyProfile = () => {
  const profileId=JSON.parse(localStorage.getItem('profileId'));

  const givenProfileID = profileId;
  const navigate = useNavigate();
  const [loadError, setLoadError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const [error, setError] = useState({
    userMobNo: false,
    mobNoExists: false,
    emailExists: false,
  });

  //Default Profile data which is used for resetting the fields when cancel button is clicked.
  const [defaultProfile, setDefaultProfile] = useState({
    profileId: "",
    userName: "",
    userGender: "",
    userEmail: "",
    userMobNo: "",
  });

  //current profile data which is used for contolling the input fields
  const [profileData, setProfileData] = useState({
    profileId: "",
    userName: "",
    userGender: "",
    userEmail: "",
    userMobNo: "",
  });

  //renders once
  useEffect(() => {
    // returns the entire data along with profile data, status code, status text ...
    let result2 = apiCalls.getProfileById(givenProfileID);
    result2
      .then((res) => {
        // console.log("initial profile", res);
        setDefaultProfile(res.data);
        setProfileData(res.data);
        setLoadError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadError(true);
      });
  }, []);

  //UserName Change Handler
  const userNameHandler = (e) => {
    setProfileData((prev) => {
      return { ...prev, userName: e.target.value };
    });
  };

  //UserEmail Change Handler - checks whether the current Email is present in the database
  const userEmailHandler = (e) => {
    setProfileData((prev) => {
      return { ...prev, userEmail: e.target.value };
    });
    setError((prev) => {
      return { ...prev, emailExists: false };
    });
  };

  const mobnoHandler = (e) => {
    //Mobile Number Handler - checks whether mobile number has exactly 10 numbers/digits or not
    setProfileData((prev) => {
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

  //Form submit handler - updates the profile data
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newprofileData = {
      profileId: profileData.profileId,
      userName: data.get("userName").trim(),
      userGender: data.get("userGender").trim(),
      userEmail: data.get("userEmail").trim(),
      userMobNo: data.get("userMobNo").trim(),
    };

    const result = apiCalls.updateProfile(newprofileData);
    result
      .then((res) => {
        console.log("updated data", res);
        if (res.status == 200) {
          console.log("successfully updated");
          setDefaultProfile(res.data);
          toast.success("Updated Successfully", {
            position: "bottom-right",
            autoClose: 3000,
          });
          setEdit(false);
          setError({
            userMobNo: false,
            mobNoExists: false,
            emailExists: false,
          });

          //Navigate to HOME Page
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          const emailExists = err.response.data.message.includes(
            `Profile with EmailId ${newprofileData.userEmail} already exists`
          );
          const mobNoExists = err.response.data.message.includes(
            `Profile with this mobile number already exists`
          );

          setError((prev) => {
            return {
              ...prev,
              emailExists: emailExists,
              mobNoExists: mobNoExists,
            };
          });
        }
      });
  };

  //Deletes the current profile
  const deleteHandler = () => {
    setDeleteAccountDialogOpen(false);
    const result = apiCalls.deleteProfileById(givenProfileID);
    result
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          toast.error("Your Account is Deleted", {
            position: "bottom-right",
            autoClose: 2000,
          });
          AuthService.logout()
          navigate('/')
          //Should navigate to login page as the current profile is deleted
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const deleteAccountDialogHandler = () => {
    setDeleteAccountDialogOpen(true);
  };
  if (loadError) {
    return <TryAgain />;
  }

  return (
    <Box
      className="myprofile-box"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        className="myprofile-card"
        elevation={20}
        sx={{
          minWidth: 300,
          maxWidth: "60%",
          mt: "1%",
          borderRadius: 3,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 65,
              height: 65,
              border: 3,
              borderColor: "green",
            }}
            src={
              defaultProfile.userGender === "male"
                ? profile_pic_male
                : profile_pic_female
            }
          />
          <Typography variant="h5" sx={{ fontSize: "30px", mb: 3 }}>
            Profile Information
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={3} name="myprofile">
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="User Name"
                  variant="outlined"
                  name="userName"
                  required
                  sx={{ width: "60%", backgroundColor: "white" }}
                  value={profileData.userName}
                  onChange={userNameHandler}
                  InputProps={{
                    readOnly: !edit,
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
                  error={error.emailExists}
                  helperText={
                    error.emailExists
                      ? "Email has already been taken, use Different Email"
                      : ""
                  }
                  value={profileData.userEmail}
                  onChange={userEmailHandler}
                  required
                  sx={{ width: "60%", backgroundColor: "white" }}
                  InputProps={{
                    readOnly: !edit,
                    endAdornment: (
                      <InputAdornment position="end">
                        {error.emailExists ? (
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
                  type="text"
                  label="Mobile Number"
                  variant="outlined"
                  name="userMobNo"
                  error={error.userMobNo || error.mobNoExists}
                  helperText={
                    (error.userMobNo
                      ? "Must Contain exactly 10 Digits - [0-9]"
                      : "") ||
                    (error.mobNoExists
                      ? "Mobile Number has already been taken, use Different Mobile Number"
                      : "")
                  }
                  value={profileData.userMobNo}
                  onChange={mobnoHandler}
                  required
                  sx={{ width: "60%", backgroundColor: "white" }}
                  InputProps={{
                    readOnly: !edit,
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
                  value={profileData.userGender}
                  onChange={(e) =>
                    setProfileData((prev) => {
                      return { ...prev, userGender: e.target.value };
                    })
                  }
                  InputProps={{ readOnly: !edit }}
                  required
                  select
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Stack
              sx={{ mb: 4, pt: "20px", justifyContent: "center" }}
              gap={3}
              direction={"row"}
            >
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={deleteAccountDialogHandler}
                startIcon={<PersonRemoveOutlinedIcon />}
              >
                Delete Account
              </Button>
              {edit ? (
                <>
                  <Button
                    type="reset"
                    variant="contained"
                    color="info"
                    className="cancel"
                    endIcon={<ClearIcon />}
                    onClick={() => {
                      setProfileData(defaultProfile);
                      setError({
                        userMobNo: false,
                        mobNoExists: false,
                        emailExists: false,
                      });
                      setEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="submit"
                    disabled={
                      error.emailExists || error.mobNoExists || error.userMobNo
                    }
                    endIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="small"
                  className="edit"
                  endIcon={<EditIcon fontSize="small" />}
                  onClick={() => setEdit(true)}
                >
                  Edit
                </Button>
              )}
            </Stack>
          </form>
        </CardContent>
        <DialogDeleteAccount
          open={deleteAccountDialogOpen}
          setOpen={setDeleteAccountDialogOpen}
          deleteHandler={deleteHandler}
        />
      </Card>
    </Box>
  );
};

export default MyProfile;
