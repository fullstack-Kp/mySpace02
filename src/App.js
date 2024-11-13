import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Register } from "./pages/Register";
import MySchedule from "./pages/MySchedule";
import MyFinance from "./pages/MyFinance";
import MyMood from "./pages/MyMood";
import MyHabit from "./pages/MyHabit";
import CustomCardPage from "./pages/CustomCardPage";
import { Login } from "./pages/Login";
import DummyProfile from "./assets/images/pic.png";

const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [isRegistered, setIsRegistered] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({});
  const [registedDetails, setRegisteredDetails] = useState({});
  const [profilePic, setProfilePic] = useState(DummyProfile);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.setItem("isRegistered", JSON.stringify(true));
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    setIsRegistered(true);
    setIsLoggedIn(false);
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    themeMode,
    setThemeMode,
    handleLogout,
    profilePic,
    setProfilePic,
  };

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [isToggleSidebar, themeMode]);

  //find if user is logged in or not
  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
    setIsRegistered(JSON.parse(localStorage.getItem("isRegistered")));
  }, []);

  // Handle login
  const onLoginHandler = (loginDetails) => {
    // Check credentials and update the state if login is successful
    // This is a basic check, you might want to replace this with an API call
    if (
      loginDetails.username === "user" &&
      loginDetails.password === "password"
    ) {
      setIsLogin(true);
      setLoginDetails(loginDetails);
    } else {
      alert("Invalid credentials!");
    }
  };
  const onRegisterHandler = (_registeredDetails) => {
    setIsRegistered(true);
    setRegisteredDetails({ ..._registeredDetails });
  };

  if (!isRegistered) {
    return (
      <MyContext.Provider value={values}>
        <Register onRegisterHandler={onRegisterHandler} />;
      </MyContext.Provider>
    );
  }

  if (isRegistered && isLoggedIn === false) {
    return (
      <MyContext.Provider value={values}>
        <Login />
      </MyContext.Provider>
    );
  }

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <div className="main d-flex ">
          <div
            className={`sidebarWrapper ${isToggleSidebar === true ? "toggle" : ""}`}
          >
            <Sidebar />
          </div>
          <div
            className={`content ${isToggleSidebar === true ? "toggle" : ""}`}
          >
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/schedule" element={<MySchedule />} />
              <Route path="/finance-tracker" element={<MyFinance />} />
              <Route path="/habit-tracker" element={<MyHabit />} />
              <Route path="/mood-card" element={<MyMood />} />
              <Route path="/custom-card" element={<CustomCardPage />} />
            </Routes>
          </div>
        </div>
        <Header />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
