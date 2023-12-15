import React, { useState } from "react";

import { Button } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import cloud_error from "../../../assets/images/cloud-error.svg";

const TryAgain = () => {
  const clickHandler = () => {
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        backgroundColor: "lightgray",
        minHeight: "95vh",
      }}
    >
      <img src={cloud_error} alt="cloud error" width="500" height="300" />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h5>Something went wrong</h5>
        <Button
          type="button"
          variant="contained"
          endIcon={<RefreshIcon />}
          onClick={clickHandler}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default TryAgain;
