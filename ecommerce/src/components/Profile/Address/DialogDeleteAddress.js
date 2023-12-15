import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
const DialogDeleteAddress = (props) => {
  return (
    <div>
      <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>Delete Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, do you want to delete this address ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="text"
            color="info"
            onClick={() => props.setOpen(false)}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            variant="text"
            color="success"
            onClick={props.deleteHandler}
          >
            YES,DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogDeleteAddress;
