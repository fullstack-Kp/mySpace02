import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import { InputField } from "../../inputField";
import "./SignIn.css";

export const SignIn = ({onClickLogInHandler}) => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  })

  const onChangeCheckbox = (event) => {
    setIsRememberMeChecked(event.target.checked);
  };

  const onClickHandler = () => {
    alert(`${loginDetails.password} ${loginDetails.username}`)
    onClickLogInHandler?.(loginDetails)
  }

  const onChangeUsernameHandler = (event) => {
    setLoginDetails((prevValue)=> ({
      ...prevValue,
      username: event.target.value
    }))
  }

  const onChangePasswordHandler = (event) => {
    setLoginDetails((prevValue)=> ({
      ...prevValue,
      password: event.target.value
    }))
  }

  return (
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
        <Typography variant="body2" onClick={() => {}}>
          Forgot Password ?
        </Typography>
      </div>
      <Button variant="contained" className="signin-btn" onClick={onClickHandler}>Login</Button>
    </div>
  );
};
