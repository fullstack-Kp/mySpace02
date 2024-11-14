import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { InputField } from "../../inputField";
import "./Signup.css";

export const SignUp = ({ onClickRegisterHandler }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const onRegister = () => {
    if (validateForm()) {
      onClickRegisterHandler?.(loginDetails);
      localStorage.setItem("isRegistered", JSON.stringify(true));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userDetails", JSON.stringify(loginDetails));
    } else {
      setShowAlert(true);
    }
  };
  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { email: "", username: "", password: "" };

    // Email validation
    if (!loginDetails.email || !validateEmail(loginDetails.email)) {
      newErrors.email = "Please enter a valid email address.";
      formIsValid = false;
    }

    // Username validation
    if (loginDetails.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters long.";
      formIsValid = false;
    }

    // Password validation
    if (loginDetails.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <>
      <div className="signup-container">
        <Typography variant="h4" className="signup-title">
          Register
        </Typography>
        <Typography variant="subtitle1" className="signup-subtitle">
          to get access to your curated personal space
        </Typography>
        <InputField
          label="Email address"
          placeholder="Enter email id"
          required
          name="email"
          onChange={handleChange}
          value={loginDetails.email}
          className="signup-email"
          helperText={errors.email}
          showError={!!errors.email}
        />
        <InputField
          label="User name"
          placeholder="Enter username"
          required
          name="username"
          onChange={handleChange}
          value={loginDetails.username}
          className="signup-username"
          helperText={errors.username}
          showError={!!errors.username}
        />
        <InputField
          label="Password"
          placeholder="Type your password here"
          required
          name="password"
          onChange={handleChange}
          value={loginDetails.password}
          isPassword
          className="password"
          helperText={errors.password}
          showError={!!errors.password}
        />

        <Button variant="contained" className="signup-btn" onClick={onRegister}>
          Register
        </Button>
      </div>
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
          Please fix the errors before submitting.
        </Alert>
      </Snackbar>
    </>
  );
};
