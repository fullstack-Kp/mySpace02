
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import {Register } from "./pages/Register"
import {Login}  from "./pages/Login"
import MySchedule from "./pages/MySchedule"
import MyFinance from "./pages/MyFinance"
import MyMood from "./pages/MyMood"
import MyHabit from "./pages/MyHabit"
import CustomCardPage from './pages/CustomCardPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyContext = createContext()



function App() {

  const [isToggleSidebar , setIsToggleSidebar] = useState(false)
  const [themeMode , setThemeMode] = useState(true)


  const handleLogout = () => {
    // Perform any other cleanup, such as removing tokens or clearing local storage
    localStorage.removeItem("userToken"); // Adjust this key as needed
    setIsRegistered(false); // Set registration state to false
  };


const values = {
  isToggleSidebar,
  setIsToggleSidebar,
  themeMode,
  setThemeMode,
  handleLogout

}


useEffect(()=>{
 if(themeMode===true){
  document.body.classList.remove('dark')
  document.body.classList.add('light')
  localStorage.setItem('themeMode' , 'light')
 }
 else{
  document.body.classList.remove('light')
  document.body.classList.add('dark')
  localStorage.setItem('themeMode' , 'dark')
 }
  
}, [isToggleSidebar , themeMode])

 const [isRegistered, setIsRegistered] = useState(false);


const [isLogin , setIsLogin] = useState(true)
const [loginDetails, setLoginDetails] = useState({});
  const [registedDetails, setRegisteredDetails] = useState({});


  



  // const onLoginHandler = (_loginDetails) => {
  //   setIsLogin(true)
  //   setLoginDetails({ ..._loginDetails });
  // };

  // Handle login
  const onLoginHandler = (loginDetails) => {
    // Check credentials and update the state if login is successful
    // This is a basic check, you might want to replace this with an API call
    if (loginDetails.username === 'user' && loginDetails.password === 'password') {
      setIsLogin(true);
      setLoginDetails(loginDetails);
    } else {
      alert('Invalid credentials!');
    }
  };
  const onRegisterHandler = (_registeredDetails) => {
    setIsRegistered(true);
    setRegisteredDetails({ ..._registeredDetails });
  };

  


  return  isRegistered ? (
    <BrowserRouter>
    <MyContext.Provider value={values}>
    <div className='main d-flex '>
      <div className={`sidebarWrapper ${isToggleSidebar===true ? 'toggle' : ''}`}>
        <Sidebar/>
      </div>
      <div className={`content ${isToggleSidebar===true ? 'toggle' : ''}`}>
      <Routes>
        <Route path="/" exact={true}  element={<Dashboard/>}/>
         <Route path="/dashboard" exact={true}  element={<Dashboard/>}/> 
         <Route path="/schedule" element={<MySchedule />} />
              <Route path="/finance-tracker" element={<MyFinance />} />
              <Route path="/habit-tracker" element={<MyHabit />} />
              <Route path="/mood-card" element={<MyMood />} />
              <Route path="/custom-card" element={<CustomCardPage />} />    
     </Routes>
      </div>
    </div>
    <Header/>
    </MyContext.Provider>
    </BrowserRouter>

  ) : (
    <>
    <Register onRegisterHandler={onRegisterHandler} /> 
    
    </>
  );
}

export default App;
export {MyContext}