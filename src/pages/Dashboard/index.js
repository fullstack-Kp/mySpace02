import DashboardCard from "./components/DashboardCards"
import { MdSchedule } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiHobbitDwelling } from "react-icons/gi";
import { MdMood } from "react-icons/md";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from '@mui/material/Button';
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];


export const options = {
 
  'backgroundColor' : 'transparent',
  legendTextStyle: { color: '#FFF' },
    titleTextStyle: { color: '#FFF' },
    hAxis: {
      color: '#FFF',
    }
};




const Dashboard = () => {

 




  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const ITEM_HEIGHT = 48;


  return(
    <>
     <div className="right-content w-100">
      <div className="row dashboardBoxWrapperRow">
        <div className="col-md-8">
          <div className="dashboardBoxWrapper d-flex">
            <DashboardCard color={["#1da256" , "#48d483"]} icon={<MdSchedule/>} grow={true}/>
            <DashboardCard color={["#C012e2" , "#eb64fe"]} icon={<MdOutlineAttachMoney/>} />
            <DashboardCard color={["#2c78e5" , "#60aff5"]} icon={<GiHobbitDwelling/>}/>
            <DashboardCard color={["#e1950e" , "#f3cd29"]} icon={<MdMood/>} />
           </div>
        </div>


        <div className="col-md-4 pl-0">
        <div className="box graphBox">
        <div className="d-flex align-items-center w-100 bottomEle">
        <h6 className="text-white mb-0 mt-0">Your Own Card</h6>
        <div className="d-flex w-100">
        <Button className="ml-auto toggleIcon" onClick={handleClick}><BsThreeDotsVertical/></Button>
        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        
          <MenuItem  onClick={handleClose}>
          Last week Schedule
          </MenuItem>
          <MenuItem  onClick={handleClose}>
          Last Day Schedule 
          </MenuItem>
        
      </Menu>
        </div>
        
      </div>
      
        </div>
      </div>
      </div>





    {/* <div className="card shadow border-0 p-3 mt-4">
    <h3 className="hd"> Best Days</h3>



    <div className="row">
      <div className="col">
        <h4>SHOW BY</h4>
      </div>
    </div>
    </div> */}

     
      
     </div>
    </>
  )
}

export default Dashboard