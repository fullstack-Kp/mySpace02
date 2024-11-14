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
import Loader from "./components/loader/Loader";

const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [isRegistered, setIsRegistered] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [profilePic, setProfilePic] = useState(DummyProfile);
  const [userDetails, setUserDetails] = useState({});
  const [loginErrorAlert, setLoginErrorAlert] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [registeredPeople, setRegisteredPeople] = useState([
    {
      email: "kannupriya6666@gmail.com",
      username: "kannu",
      password: "Test1234",
    },
  ]);

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
    registeredPeople,
    userDetails,
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
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  // Handle login
  const onLoginHandler = (loginDetails) => {
    // Check credentials and update the state if login is successful
    setShowLoader(true);
    setTimeout(() => {
      const registerDetails = registeredPeople.find(
        (people) =>
          people.email === loginDetails.username ||
          people.username === loginDetails.username
      );
      if (registerDetails) {
        const isPasswordCorrect =
          registerDetails.password === loginDetails.password;
        if (isPasswordCorrect) {
          setShowLoader(false);
          setIsLoggedIn(true);
          setPasswordError("");
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
        } else {
          setShowLoader(false);
          setPasswordError("Password is incorrect");
        }
      } else {
        setShowLoader(false);
        setLoginErrorAlert(true);
      }
    }, 1700);
  };
  const onRegisterHandler = (_registeredDetails) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setIsRegistered(true);
      setRegisteredPeople((prevValue) => [...prevValue, _registeredDetails]);
      setIsLoggedIn(true);
      setUserDetails(_registeredDetails);
      localStorage.setItem(
        "registrationList",
        JSON.stringify([...registeredPeople, _registeredDetails])
      );
    }, 1500);
  };

  const navigateToRegisterScreen = () => {
    setIsRegistered(false);
    localStorage.setItem("isRegistered", JSON.stringify(false));
  };

  if (!isRegistered) {
    return (
      <MyContext.Provider value={values}>
        <Register onRegisterHandler={onRegisterHandler} />;
        <Loader open={showLoader} />
      </MyContext.Provider>
    );
  }

  if (isRegistered && isLoggedIn === false) {
    return (
      <MyContext.Provider value={values}>
        <Login
          onLoginHandler={onLoginHandler}
          setLoginErrorAlert={setLoginErrorAlert}
          loginErrorAlert={loginErrorAlert}
          passwordError={passwordError}
          navigateToRegisterScreen={navigateToRegisterScreen}
        />
        <Loader open={showLoader} />
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
