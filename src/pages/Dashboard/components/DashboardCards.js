import { BsThreeDotsVertical } from "react-icons/bs";
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { MdSchedule } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiHobbitDwelling } from "react-icons/gi";
import { MdMood } from "react-icons/md";

const DashboardCard = (props) =>{

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
   <Button className="dashboardBox" style={{ 
            backgroundImage: `linear-gradient(to right, ${props.color ?. [0]}, ${props.color?. [1]}) `
            }}>

                {
                    props.grow  === true ? <span className="chart"><TrendingUpIcon/></span> :
                    <span className="chart"><TrendingDownIcon/></span>
                }
            
      <div className="d-flex w-100">
        <div className="col1">
              <h4 className="text-white mb-0">My Schedule</h4>
              <span className="text-white"> Assigned Task : 7</span>
        </div>
           <div className="ml-auto">
            {
                props.icon 
                ?  
                <span className="icon">{props.icon ? props.icon : ''}
                </span> 
                : 
                ''
            }
            
           </div>
      </div> 

      <div className="d-flex align-items-center w-100 bottomEle">
        <h6 className="text-white mb-0 mt-0">Last week task</h6>
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
    </Button>
           
           
        </>
    )
}

export default DashboardCard