import { Button,Typography } from "@mui/material";
import { useState } from "react";
import { InputField } from "../../inputField";
import "./Signup.css";

export const SignUp = ({onClickRegisterHandler}) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    username: "",
    password: ""
  })


  const onClickHandler = () => {
    onClickRegisterHandler?.(loginDetails)
  }

  const onChangeEmailHandler = (event) => {
    setLoginDetails((prevValue)=> ({
      ...prevValue,
      email: event.target.value
    }))
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
        onChange={onChangeEmailHandler}
        value={loginDetails.email}
        className="signup-email"
      />
      <InputField
        label="User name"
        placeholder="Enter username"
        required
        onChange={onChangeUsernameHandler}
        value={loginDetails.username}
        className="signup-username"
      />
      <InputField
        label="Password"
        placeholder="Type your password here"
        required
        onChange={onChangePasswordHandler}
        value={loginDetails.password}
        isPassword
        className="password"
      />

      <Button variant="contained" className="signup-btn" onClick={onClickHandler}>Register</Button>
    </div>
  );
};
