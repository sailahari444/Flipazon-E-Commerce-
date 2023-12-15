import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
const DeleteAccountDialog = (props) => {
  return (
    <div>
      <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, do you want to delete your account ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="text"
            color="info"
            onClick={() => props.setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="text"
            color="success"
            onClick={props.deleteHandler}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAccountDialog;
