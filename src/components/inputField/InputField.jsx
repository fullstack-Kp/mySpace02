import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./InputField.css";

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  inputType = "text",
  isPassword = false,
  className,
  helperText,
  showError,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(isPassword);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={`${className}`}>
      <Typography variant="body1" className="label">
        {label}
      </Typography>
      <TextField
        sx={{
          width: "100%",
        }}
        placeholder={placeholder}
        variant="outlined"
        id="custom-input-field"
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        helperText={helperText}
        error={showError}
        type={showPassword ? "password" : inputType}
        slotProps={{
          input: {
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />
    </div>
  );
};
