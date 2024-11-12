import { Link } from "react-router-dom"
import logo  from "../../assets/images/logo.png"
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { useContext, useState } from "react";
import {MyContext} from '../../App'
import { MdOutlineMenu } from "react-icons/md";
import { useEffect } from "react";

const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpenNotification);
  const [imageURL, setImageURL] = useState(null);
  

const context = useContext(MyContext)


useEffect(() => {
  // Retrieve the saved image from localStorage
  const savedImage = localStorage.getItem("uploadedImage");
  if (savedImage) {
    setImageURL(savedImage);
  }
}, []);

  const handleOpenMyAcc = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorEl(null);
  };


  const handleOpenNotifications = () => {
    setIsOpenNotification(true);
  }
  const handleCloseNotifications = () => {
    setIsOpenNotification(false);
  };
    return(
        <>
         <header className="d-flex align-items-center">
         <div className="container-fluid">
          <div className="row d-flex align-items-center w-100">
            {/* Logo Wrapper */}
           <div className="col-sm-2 part1">                                         
           <Link to={'/'} className="d-flex align-items-center logo  ">
              <img src={logo} />
              <span className="ml-2"> MySpace </span>
            </Link>
           </div>

           <div className="col-sm-3 d-flex align-items-center part2 pl-4">
             <Button className="rounded-circle mr-3" onClick={()=>context.setIsToggleSidebar(!context.isToggleSidebar)}>
              {
                context.isToggleSidebar===false ?  <MdMenuOpen/> : <MdOutlineMenu/>
              }
             </Button>
             <SearchBox/>
           </div>

           <div className="col-sm-7 d-flex align-items-center justify-content-end part3 ">
           <Button className="rounded-circle mr-3" onClick={()=>context.setThemeMode(!context.themeMode)}><MdLightMode/></Button>
           <Button className="rounded-circle mr-3"><MdDarkMode/></Button>
           <div className="dropdownWrapper position-relative " >
           <Button className="rounded-circle mr-3" onClick={handleOpenNotifications} ><IoIosNotificationsOutline/></Button>
           <Menu
        anchorEl={isOpenNotification}
        className="notifications"
        id="notifications"
        open={openNotifications}
        onClose={handleCloseNotifications}
        onClick={handleCloseNotifications}
       
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        <MenuItem onClick={handleCloseNotifications}>
          <ListItemIcon>
            <IoIosNotificationsOutline fontSize="small" />
          </ListItemIcon>
          My Notifications 
        </MenuItem>
      </Menu>
           </div>
          

           <div className="myAccWrapper">
            <Button className="myAcc d-flex align-items-center" onClick={handleOpenMyAcc}>
            <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMyAcc}
        onClose={handleCloseMyAcc}
        onClick={handleCloseMyAcc}
       
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        <MenuItem onClick={handleCloseMyAcc}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem onClick={handleCloseMyAcc}>
          <ListItemIcon>
          <PersonAdd fontSize="small" />
          </ListItemIcon>
          Reset Password
        </MenuItem>
        <MenuItem onClick={handleCloseMyAcc}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
              <div className="userImg">
                <span className="rounded-circle">
                {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/> */}
                <img src={imageURL} alt="Uploaded"/>
                 </span>
             </div>

             <div className="userInfo">
             <h4>Kannu Priya</h4>
             <p className="mb-0"> @priya1234</p>
          </div>
           </Button>
         </div>

        

           </div>
          </div>
         </div>
         </header>
        </>
    )
}

export default Header