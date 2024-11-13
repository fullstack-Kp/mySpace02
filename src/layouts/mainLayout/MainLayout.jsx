import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import Pic from "../../assets/images/pic.png";
import { useState, useRef, useEffect, useContext } from "react";
import { MdUpload } from "react-icons/md";
import Edit from "@mui/icons-material/Edit";

import DummyProfile from "../../assets/images/pic.png";
import Logo from "../../assets/images/logo.png";
import "./MainLayout.css";
import UploadProfileCard from "../../components/cards/uploadProfileCard";
import { MyContext } from "../../App";

export const MainLayout = ({ component }) => {
  const [imageURL, setImageURL] = useState(DummyProfile);
  const [showUploadPic, setShowUploadPic] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef(null);
  const { setProfilePic, profilePic } = useContext(MyContext);
  // Load saved image from localStorage on initial render
  useEffect(() => {
    if (profilePic) {
      setImageURL(profilePic);
    }
  }, [profilePic]);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile?.type?.includes("image")) {
      setShowAlert(true);
      return;
    }
    setProfilePic(URL.createObjectURL(selectedFile));
  };

  // Function to handle button click to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 0,
        }}
        className="container"
        elevation={0}
      >
        <Typography variant="h6" className="logo">
          My Space
        </Typography>
        <Box component="image" sx={{ height: 54 }} alt="Logo" src={Logo} />
        {component ? component : null}
        {imageURL && (
          <div
            style={{
              position: "relative",
              display: "flex",
            }}
          >
            <CardMedia
              className="personalImage"
              component="img"
              image={imageURL}
              alt="Uploaded Preview"
            />

            <Edit
              style={{
                position: "relative",
                top: 120,
                right: -340,
                cursor: "pointer",
                color: "#0A2FB6",
              }}
              sx={{
                fontSize: 40,
              }}
              onClick={() => setShowUploadPic(true)}
            />
          </div>
        )}
        <div className="blueContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              gap: 15,
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <UploadProfileCard
          open={showUploadPic}
          handleClose={() => setShowUploadPic(false)}
          handleButtonClick={handleButtonClick}
        />
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showAlert}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="error"
          variant="filled"
          sx={{ width: 500 }}
        >
          Please select image only
        </Alert>
      </Snackbar>
    </>
  );
};
