import { Button, Card, CardMedia, Typography } from "@mui/material";
import Pic from "../../assets/images/pic.png";
import { useState , useRef , useEffect } from "react";
import { MdUpload } from "react-icons/md";
import "./MainLayout.css";

export const MainLayout = ({ component }) => {

  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const fileInputRef = useRef(null);

  // Load saved image from localStorage on initial render
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setImageURL(savedImage); // Load image URL from local storage if available
    }
  }, []);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // setImageURL(URL.createObjectURL(selectedFile));
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImageURL(base64String);
      localStorage.setItem("uploadedImage", base64String); // Save to localStorage
    };
    reader.readAsDataURL(selectedFile);
  };

  // Function to handle button click to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file upload (e.g., sending it to an API)
  const handleUpload = () => {
    if (!file) {
      alert("No file selected");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);

    // Replace with actual upload code (e.g., API request)
    /*
    fetch("your_upload_endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully:", data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
    */

    alert("File ready to upload");
    URL.revokeObjectURL(imageURL);
  };


  
  return (
    <Card className="container" elevation={0}>
      <Typography variant="h6" className="logo">
        My Space
      </Typography>
      {component ? component : null}
      {/* <CardMedia className="personalImage" component="img" image={Pic} /> */}
      {imageURL && (
        // <Card style={{ marginTop: "20px" }}>
          <CardMedia
            className="personalImage"
            component="img"
            image={imageURL}
            alt="Uploaded Preview"
            // style={{ height: 200 }}
          />
        // </Card>
      )}
      <div className="blueContainer">
        {/* <div className="uploadButton"> */}
      {/* <Button sx={{display: 'flex' , alignItems: 'center' , backgroundColor: 'wheat' , top: '92%' , left: 4 , width: 50 , height: 50 }} > <MdUpload/></Button> */}
      {/* <Button variant="contained" sx={{display: 'flex' , alignItems: 'center' , backgroundColor: 'wheat' , top: '92%' , left: 4 , width: 50 , height: 50 }} onClick={handleButtonClick}>  
      </Button> */}
      <div style={{display: 'flex' , justifyContent: 'flex-start' , width: '100%', gap: 15 ,}}>
      <Button color="white"  sx={{ display: 'flex' , backgroundColor: 'white', top: 40, left:5 }} onClick={handleButtonClick}>
        Choose File 
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {file && <Typography variant="body1">Selected File: {file.name}</Typography>}
      <Button
        variant="contained"
        color="white"
        sx={{ display: 'flex' , backgroundColor: 'white', top: 40}}
        onClick={handleUpload}
        style={{ marginTop: "10px" }}
      >
        <MdUpload/>
      </Button>
      </div>
      {/* </div> */}
      </div>
     
    </Card>
  );
};
