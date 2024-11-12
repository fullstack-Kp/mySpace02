// CustomCardPage.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { AiFillEdit, AiFillSave } from "react-icons/ai";

const CustomCardPage = ({ color, icon, title, subtitle, options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const [cardSubtitle, setCardSubtitle] = useState(subtitle);
  const [data, setData] = useState("Some dynamic data here"); // Replace with actual dynamic data
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleOptionClick = (option) => {
    if (option.action) {
      option.action();
      setData(`Updated data for: ${option.label}`);
    }
    handleClose();
  };

  return (
    <div
      className="box graphBox"
      style={{
        background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`,
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <div className="d-flex align-items-center w-100 bottomEle">
        <div
          className="icon"
          style={{ fontSize: "24px", color: "#FFF", marginRight: "8px" }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          {isEditMode ? (
            <>
              <TextField
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                variant="outlined"
                size="small"
                style={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  marginBottom: "4px",
                }}
              />
              <TextField
                value={cardSubtitle}
                onChange={(e) => setCardSubtitle(e.target.value)}
                variant="outlined"
                size="small"
                style={{ backgroundColor: "white", borderRadius: "4px" }}
              />
            </>
          ) : (
            <>
              <h6 className="text-white mb-0 mt-0">{cardTitle}</h6>
              <small className="text-white">{cardSubtitle}</small>
            </>
          )}
        </div>
        <IconButton
          onClick={isEditMode ? handleSave : handleEditToggle}
          style={{ color: "white" }}
        >
          {isEditMode ? <AiFillSave /> : <AiFillEdit />}
        </IconButton>
        <Button className="ml-auto toggleIcon" onClick={handleClick}>
          <BsThreeDotsVertical />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} onClick={() => handleOptionClick(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div style={{ marginTop: "16px", color: "white" }}>
        <p>{data}</p>
      </div>
    </div>
  );
};

export default CustomCardPage;
