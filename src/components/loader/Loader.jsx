import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ open }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress size={50} thickness={3} />
    </Backdrop>
  );
};

export default Loader;
