import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import EditAddress from "./EditAddress";
import DialogDeleteAddress from "./DialogDeleteAddress";
import { service } from "../../../services/Service";
import apiCalls from "../../../Calls/apiCalls";
import { useNavigate } from 'react-router-dom';

const AddressCard = (props) => {
  //   {
  //     "addressId": "0ae94260-88e2-12bd-8188-e303999d0005",
  //     "profileId": "0ae94260-88e2-12bd-8188-e30137950004",
  //     "houseNo": "1/2-bc",
  //     "street": "gardens",
  //     "locality": "Gachibowli",
  //     "city": "hyderabad",
  //     "state": "telengana",
  //     "pincode": 500075
  // }

  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate=useNavigate();
  //Deletes the address from database
  const deleteHandler = () => {
    setAnchorEl(null);
    setDialogOpen(false);
    const result = apiCalls.deleteAddress(
      props.address.profileId,
      props.address.addressId
    );
    result
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);

          //newAddressList (without deleted address) is added to the addressList state
          const newAddressList = props.addressList.filter((address1) => {
            return address1.addressId !== props.address.addressId;
          });

          props.setAddressList(newAddressList);
          setEdit(false);
          toast.error("Address is Deleted", {
            position: "bottom-right",
            autoClose: 2000,
          });
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
  //Updates address
  const submitHandler = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    const data = new FormData(e.currentTarget);
    const newAddressData = {
      ...props.address,
      houseNo: data.get("houseNo").trim(),
      street: data.get("street").trim(),
      locality: data.get("locality").trim(),
      city: data.get("city").trim(),
      state: data.get("state").trim(),
      pincode: parseInt(data.get("pincode")),
    };

    const result = apiCalls.updateAddress(newAddressData);

    result
      .then((res) => {
        if (res.status === 200) {
          console.log("address is edited");

          //Updates edited address data to addressList state
          let newAddressList = props.addressList.map((address1) => {
            if (address1.addressId === props.address.addressId) {
              return { ...address1, ...newAddressData };
            } else {
              return address1;
            }
          });

          props.setAddressList(newAddressList);
          setEdit(false);
          toast.success("Address is Updated Successfully", {
            position: "bottom-right",
            autoClose: 3000,
          });
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

  const menuEditHandler = (e) => {
    setEdit(true);
    setAnchorEl(null);
  };
  const menuDeleteHandler = (e) => {
    setDialogOpen(true);
    setAnchorEl(null);
  };

  return (
    <Card
      elevation={edit ? 22 : 3}
      variant="elevation"
      className="addressCard"
      sx={{
        width: "60%",
        border: edit ? 4 : 0,
        borderColor: edit ? "lightblue" : "",
      }}
    >
      <>
        {!edit ? (
          <div>
            <CardContent className="addresscard-content">
              <div className="addresscard-header">
                <div>
                  <div className="addresscard-address-content">
                    <Typography variant="body1">
                      {`${props.address.houseNo}, ${props.address.street}, ${props.address.locality}, ${props.address.city}, ${props.address.state}`}
                      <span style={{ fontWeight: "bold" }}>
                        {` - ${props.address.pincode}`}
                      </span>
                    </Typography>
                  </div>
                </div>

                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <MoreVertIcon />
                </IconButton>
              </div>
            </CardContent>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={menuEditHandler}>Edit</MenuItem>
              <MenuItem onClick={menuDeleteHandler}>Delete</MenuItem>
            </Menu>
          </div>
        ) : (
          <EditAddress
            address={props.address}
            edit={edit}
            setEdit={setEdit}
            submitHandler={submitHandler}
            deleteHandler={deleteHandler}
          />
        )}
      </>
      <DialogDeleteAddress
        open={dialogOpen}
        setOpen={setDialogOpen}
        deleteHandler={deleteHandler}
      />
    </Card>
  );
};

export default AddressCard;
