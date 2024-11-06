import Button from '@mui/material/Button';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { MdSchedule } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiHobbitDwelling } from "react-icons/gi";
import { MdMood } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import {MyContext} from '../../App'

const Sidebar = () => {


    const [activeTab , setActiveTab] = useState(0)
    const context = useContext(MyContext)

    const isOpenTab = (index) =>
    {
        return setActiveTab(index)
    }
  return(
    <>
     <div className="sidebar">
      <ul>
        <li>
        <Link to="/">
        <Button className={`w-100 ${activeTab==0 ? 'active' : ''}`} onClick={isOpenTab}> 
        <span className='icon'> <LuLayoutDashboard/></span>
          Dashboard 
        <span className='arrow'><FaArrowRight/></span>
        </Button>
        </Link>
        </li>
        <li>
        <Link to="/">
        <Button className={`w-100 ${activeTab==1 ? 'active' : ''}`} onClick={isOpenTab}> 
        <span className='icon'> <MdSchedule/></span>
           My Schedule 
        <span className='arrow'><FaArrowRight/></span>
        </Button>
        </Link>
        </li>
        <li>
        <Link to="/">
        <Button className={`w-100 ${activeTab==2 ? 'active' : ''}`} onClick={isOpenTab}> 
        <span className='icon'> <MdOutlineAttachMoney/></span>
           Finance
        <span className='arrow'><FaArrowRight/></span>
        </Button>
        </Link>
        </li>
        <li>
        <Link to="/">
        <Button className={`w-100 ${activeTab==3 ? 'active' : ''}`} onClick={isOpenTab}> 
        <span className='icon'> <GiHobbitDwelling/></span>
           Hobbies
        <span className='arrow'><FaArrowRight/></span>
        </Button>
        </Link>
        </li>
        <li>
        <Link to="/">
        <Button className={`w-100 ${activeTab==4 ? 'active' : ''}`} onClick={isOpenTab}> 
        <span className='icon'> <MdMood/></span>
           Mood
        <span className='arrow'><FaArrowRight/></span>
        </Button>
        </Link>
        </li>

        <li>
        <Link to="/">
        <Button className={`w-100 ${activeTab==5 ? 'active' : ''}`} onClick={isOpenTab}> 
        <span className='icon'> <CiCreditCard1/></span>
           Your Own Card
        <span className='arrow'><FaArrowRight/></span>
        </Button>
        </Link>
        </li>
    
      
       
        
      </ul>

      <br/>

     <div className='logoutWrapper'>
      <div className='logoutBox'>
      <Button variant="contained"> <MdLogout/>Logout</Button>
      </div>
      </div>
     </div>
    
    </>
  )
}

export default Sidebar;