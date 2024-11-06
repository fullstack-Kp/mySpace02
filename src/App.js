
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useEffect } from 'react';
import { useState } from 'react';

const MyContext = createContext()



function App() {

  const [isToggleSidebar , setIsToggleSidebar] = useState(false)
  const [themeMode , setThemeMode] = useState(true)


const values = {
  isToggleSidebar,
  setIsToggleSidebar,
  themeMode,
  setThemeMode

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



  return (
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
     </Routes>
      </div>
    </div>
    <Header/>
    </MyContext.Provider>
    </BrowserRouter>

  );
}

export default App;
export {MyContext}