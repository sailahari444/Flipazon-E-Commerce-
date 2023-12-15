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

import "../ProfileStyle.css";

const EditAddress = (props) => {
  //const [address, setAddress] = useState({});
  const [input, setInput] = useState(props.address);

  return (
    <Card className="editaddress-card" sx={{ backgroundColor: "#f5faff" }}>
      <div
        style={{
          fontWeight: "bold",
          marginTop: "1%",
          marginLeft: "3%",
          textAlign: "left",
        }}
      >
        EDIT ADDRESS
      </div>
      <CardContent>
        <form onSubmit={props.submitHandler}>
          <Grid
            container
            spacing={2}
            sx={{
              mt: "1px",
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
                focused
                value={input.houseNo}
                sx={{ backgroundColor: "white" }}
                onChange={(e) =>
                  setInput((prev) => {
                    return { ...prev, houseNo: e.target.value };
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="Street"
                variant="outlined"
                name="street"
                value={input.street}
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
                onChange={(e) =>
                  setInput((prev) => {
                    return { ...prev, street: e.target.value };
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="Locality"
                variant="outlined"
                name="locality"
                value={input.locality}
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
                onChange={(e) =>
                  setInput((prev) => {
                    return { ...prev, locality: e.target.value };
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="City"
                variant="outlined"
                name="city"
                value={input.city}
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
                onChange={(e) =>
                  setInput((prev) => {
                    return { ...prev, city: e.target.value };
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="text"
                label="State"
                variant="outlined"
                name="state"
                value={input.state}
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
                onChange={(e) =>
                  setInput((prev) => {
                    return { ...prev, state: e.target.value };
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="number"
                label="Pincode"
                variant="outlined"
                name="pincode"
                value={input.pincode}
                fullWidth
                required
                sx={{ backgroundColor: "white" }}
                onChange={(e) =>
                  setInput((prev) => {
                    return { ...prev, pincode: e.target.value };
                  })
                }
              />
            </Grid>
          </Grid>
          <Stack
            sx={{ mt: "15px", justifyContent: "flex-end" }}
            gap={3}
            direction={"row"}
          >
            <Button
              type="reset"
              variant="text"
              color="info"
              size="small"
              startIcon={<ClearIcon />}
              onClick={() => {
                props.setEdit(false);
              }}
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

export default EditAddress;
