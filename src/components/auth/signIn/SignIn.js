import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { InputField } from "../../inputField";
import "./SignIn.css";

export const SignIn = ({
  onClickLogInHandler,
  setLoginErrorAlert,
  loginErrorAlert,
  passwordError,
  navigateToRegisterScreen,
}) => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const onChangeCheckbox = (event) => {
    setIsRememberMeChecked(event.target.checked);
  };

  const onClickHandler = () => {
    onClickLogInHandler?.(loginDetails);
  };

  const onChangeUsernameHandler = (event) => {
    setLoginDetails((prevValue) => ({
      ...prevValue,
      username: event.target.value,
    }));
  };

  const onChangePasswordHandler = (event) => {
    setLoginDetails((prevValue) => ({
      ...prevValue,
      password: event.target.value,
    }));
  };

  return (
    <>
      <div className="signin-container">
        <Typography variant="h4" className="signin-title">
          Login to your Personal Space
        </Typography>
        <Typography variant="subtitle1" className="signin-subtitle">
          Get access to curated personal space only for you
        </Typography>
        <InputField
          label="User name"
          placeholder="Enter username or email id"
          required
          onChange={onChangeUsernameHandler}
          value={loginDetails.username}
          className="username"
        />
        <InputField
          label="Enter your Password"
          placeholder="Type your password here"
          required
          onChange={onChangePasswordHandler}
          value={loginDetails.password}
          isPassword
          showError={!!passwordError}
          helperText={passwordError}
          className="password"
        />

        <div className="remember-me-container">
          <FormControlLabel
            control={
              <Checkbox
                onChange={onChangeCheckbox}
                checked={isRememberMeChecked}
              />
            }
            label={
              <Typography variant="body2" onClick={() => {}}>
                Remember me
              </Typography>
            }
          />
          <Typography
            variant="body2"
            style={{
              cursor: "pointer",
            }}
            onClick={navigateToRegisterScreen}
          >
            New here, please register!
          </Typography>
        </div>
        <Button
          variant="contained"
          className="signin-btn"
          onClick={onClickHandler}
        >
          Login
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={loginErrorAlert}
        onClose={() => setLoginErrorAlert(false)}
      >
        <Alert
          onClose={() => setLoginErrorAlert(false)}
          severity="error"
          variant="filled"
          sx={{ width: 500 }}
        >
          Please register to access your personal space.
        </Alert>
      </Snackbar>
    </>
  );
};
