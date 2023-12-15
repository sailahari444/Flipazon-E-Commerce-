import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

import "./ProfileStyle.css";
import TryAgain from "./Error/TryAgain";

import AddIcon from "@mui/icons-material/Add";
import AddressCard from "./Address/AddressCard";
import AddAddressCard from "./Address/AddAddressCard";
import NoAddressCard from "./Address/NoAddressCard";

import { service } from "../../services/Service";
import { ProfileIdContext } from "../../App";
import apiCalls from "../../Calls/apiCalls";

const MyAddress = () => {
  const profileId=JSON.parse(localStorage.getItem('profileId'));
  const givenProfileId = profileId; //needs profile id from context Hook
  const [add, setAdd] = useState(false);
  const [loadError, setLoadError] = useState({
    address: false,
    profile: false,
  });
  //addressList contains - all address associated with profileId
  const [addressList, setAddressList] = useState([]);
  const [profileData, setProfileData] = useState({
    profileId: "",
    userName: "",
    userGender: "",
    userEmail: "",
    userMobNo: "",
  });

  useEffect(() => {
    //retrives all address with profileId
    const result = apiCalls.getAddress(givenProfileId);
    result
      .then((res) => {
        setAddressList(res.data);
        setLoadError((prev) => {
          return { ...prev, address: false };
        });
      })
      .catch((err) => {
        console.log(err.message);
        setLoadError((prev) => {
          return { ...prev, address: true };
        });
      });

    apiCalls
      .getProfileById(givenProfileId)
      .then((res) => {
        setProfileData(res.data);
        setLoadError((prev) => {
          return { ...prev, profile: false };
        });
      })
      .catch((err) => {
        console.log(err);
        setLoadError((prev) => {
          return { ...prev, profile: true };
        });
      });
  }, []);

  //Iterating over addressList - generating address cards
  const addressCards = addressList.map((address, ind) => {
    const date = new Date();

    return (
      <AddressCard
        key={address.addressId + date.toString()}
        index={ind}
        address={address}
        profileData={profileData}
        addressList={addressList}
        setAddressList={setAddressList}
      />
    );
  });

  if (loadError.address || loadError.profile) {
    return <TryAgain />;
  }

  return (
    <div style={{ backgroundColor: "lightgray", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Stack
          direction="row"
          gap={3}
          sx={{ width: "80%", justifyContent: "space-between", mb: 3, mt: 2 }}
        >
          <Typography variant="h5" sx={{}}>
            Manage Addresses
          </Typography>
          <Button
            type="button"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setAdd(true);
            }}
          >
            Add Address
          </Button>
        </Stack>
        <Box
          sx={{
            width: "100%",
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          gap={2}
        >
          {add ? (
            <AddAddressCard
              setAdd={setAdd}
              addressList={addressList}
              setAddressList={setAddressList}
              givenProfileId={givenProfileId}
            />
          ) : (
            ""
          )}
          {addressList.length === 0 && !add ? <NoAddressCard /> : ""}
          {addressCards}
        </Box>
      </Box>
    </div>
  );
};

export default MyAddress;
