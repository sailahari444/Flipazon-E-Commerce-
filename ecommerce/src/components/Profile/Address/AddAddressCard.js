import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";

import { toast } from "react-toastify";
import { service } from "../../../services/Service";
import "../ProfileStyle.css";
import apiCalls from "../../../Calls/apiCalls";
import { useNavigate } from 'react-router-dom';

const AddAddressCard = (props) => {
  //const [address, setAddress] = useState({});
  const navigate=useNavigate();
  //cancels the adding address card
  const deleteHandler = () => {
    props.setAdd(false);
    console.log("Add Address cancelled");
  };

  //addAddress Submit Handler - adds new address in database
  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const newAddressData = {
      profileId: props.givenProfileId,
      houseNo: data.get("houseNo").trim(),
      street: data.get("street").trim(),
      locality: data.get("locality").trim(),
      city: data.get("city").trim(),
      state: data.get("state").trim(),
      pincode: parseInt(data.get("pincode")),
    };

    const result = apiCalls.addAddress(newAddressData);
    result
      .then((res) => {
        if (res.status == 201) {
          //console.log(res);
          console.log("new Address added");
          toast.success("Address added Successfully", {
            position: "bottom-right",
            autoClose: 3000,
          });

          // adding to new address to addressList state
          props.setAddressList((prev) => {
            return [...prev, res.data];
          });
          props.setAdd(false);
        }
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

  return (
    <Card
      elevation={22}
      className="addAddressCard"
      sx={{
        width: "60%",
        backgroundColor: "#f5faff",
        border: 4,
        borderColor: "lightblue",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          marginTop: "1%",
          marginLeft: "3%",
          textAlign: "left",
        }}
      >
        ADD A NEW ADDRESS
      </div>
      <CardContent>
        <form onSubmit={submitHandler}>
          <Grid
            container
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="House Number"
                variant="outlined"
                name="houseNo"
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="Street"
                variant="outlined"
                name="street"
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="Locality"
                variant="outlined"
                name="locality"
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="City"
                variant="outlined"
                name="city"
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="State"
                variant="outlined"
                name="state"
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="number"
                label="Pincode"
                variant="outlined"
                name="pincode"
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          </Grid>
          <Stack
            sx={{ mt: "15px", justifyContent: "flex-end" }}
            gap={3}
            direction={"row"}
          >
            <Button
              type="button"
              variant="text"
              color="info"
              size="small"
              startIcon={<ClearIcon />}
              onClick={deleteHandler}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="small"
              endIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAddressCard;
