import { Backdrop, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const UploadProfileCard = ({ open, handleClose, handleButtonClick }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={handleClose}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom sx={{ color: "black", fontSize: 24 }}>
            Update your personal favourite picture 😍
          </Typography>
          <Button
            sx={{ width: "60%", marginTop: 8, marginBottom: 8 }}
            variant="contained"
            onClick={handleButtonClick}
          >
            Choose from File
          </Button>
        </CardContent>
      </Card>
    </Backdrop>
  );
};

export default UploadProfileCard;
