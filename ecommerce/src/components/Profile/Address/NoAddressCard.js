import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

const NoAddressCard = () => {
  return (
    <Card
      elevation={10}
      sx={{
        width: "70%",
        maxHeight: "280px",
        backgroundColor: "rgb(238, 230, 230)",
      }}
    >
      <CardContent>
        <Typography variant="h6">No Address Available</Typography>
      </CardContent>
    </Card>
  );
};

export default NoAddressCard;
