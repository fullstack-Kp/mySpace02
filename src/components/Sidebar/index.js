import Button from "@mui/material/Button";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import {
  MdSchedule,
  MdLogout,
  MdOutlineAttachMoney,
  MdMood,
} from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { GiHobbitDwelling } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { MyContext } from "../../App";

const Sidebar = () => {
  // const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const { handleLogout } = useContext(MyContext);

  //  const handleLogout = () => {
  //    // Clear any user-related data from localStorage or sessionStorage
  //    localStorage.removeItem("userToken"); // Remove any user authentication token, adjust key name as needed
  //    localStorage.removeItem("uploadedImage"); // Remove any stored images if necessary
  //    sessionStorage.clear(); // Clear session storage if needed

  //    // Redirect to the login page or a public area of the app
  //    navigate(" "); // Adjust this path based on your app's routing
  //  };

  const isOpenTab = (index) => {
    return setActiveTab(index);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/dashboard">
              <Button
                className={`w-100 ${activeTab == 0 ? "active" : ""}`}
                onClick={() => handleTabClick(0)}
              >
                <span className="icon">
                  {" "}
                  <LuLayoutDashboard />
                </span>
                Dashboard
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/schedule">
              <Button
                className={`w-100 ${activeTab == 1 ? "active" : ""}`}
                onClick={() => handleTabClick(1)}
              >
                <span className="icon">
                  {" "}
                  <MdSchedule />
                </span>
                My Schedule
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/finance-tracker">
              <Button
                className={`w-100 ${activeTab == 2 ? "active" : ""}`}
                onClick={() => handleTabClick(2)}
              >
                <span className="icon">
                  {" "}
                  <MdOutlineAttachMoney />
                </span>
                Finance
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/habit-tracker">
              <Button
                className={`w-100 ${activeTab == 3 ? "active" : ""}`}
                onClick={() => handleTabClick(3)}
              >
                <span className="icon">
                  {" "}
                  <GiHobbitDwelling />
                </span>
                Hobbies
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/mood-card">
              <Button
                className={`w-100 ${activeTab == 4 ? "active" : ""}`}
                onClick={() => handleTabClick(4)}
              >
                <span className="icon">
                  {" "}
                  <MdMood />
                </span>
                Mood
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab == 5 ? "active" : ""}`}
                onClick={() => handleTabClick(5)}
              >
                <span className="icon">
                  {" "}
                  <CiCreditCard1 />
                </span>
                Your Own Card
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Button>
            </Link>
          </li>
        </ul>

        <br />

        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained" onClick={handleLogout}>
              {" "}
              <MdLogout />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
