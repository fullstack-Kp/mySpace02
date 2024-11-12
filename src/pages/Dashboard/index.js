import { MdSchedule, MdOutlineAttachMoney, MdMood } from "react-icons/md";
import { GiHobbitDwelling } from "react-icons/gi";
import { useState } from "react";

import CustomCardPage from "../CustomCardPage";

import DashboardCard from "./components/DashboardCards";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
  backgroundColor: "transparent",
  legendTextStyle: { color: "#FFF" },
  titleTextStyle: { color: "#FFF" },
  hAxis: {
    color: "#FFF",
  },
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

  const [customCardConfig, setCustomCardConfig] = useState({
    color: ["#e1950e", "#f3cd29"],
    // eslint-disable-next-line react/react-in-jsx-scope
    icon: <MdMood />,
    title: "Customizable Card",
    subtitle: "Track your own data",
    // options: [
    //   { label: "Last Week Schedule", action: () => console.log("Last Week Schedule") },
    //   { label: "Last Day Schedule", action: () => console.log("Last Day Schedule") },
    // ],
    options: [
      {
        label: "Show Last Week Data",
        action: () => console.log("Showing last week's data"),
      },
      {
        label: "Show Last Month Data",
        action: () => console.log("Showing last month's data"),
      },
      { label: "Reset Data", action: () => console.log("Data reset") },
    ],
  });

  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardCard
                color={["#1da256", "#48d483"]}
                icon={<MdSchedule />}
                grow={true}
                title="My Schedule"
                subtitle="Schedule Records"
                route="/schedule"
              />
              <DashboardCard
                color={["#C012e2", "#eb64fe"]}
                icon={<MdOutlineAttachMoney />}
                title="Finance Tracker"
                subtitle="Finance Records"
                route="/finance-tracker"
              />
              <DashboardCard
                color={["#2c78e5", "#60aff5"]}
                icon={<GiHobbitDwelling />}
                title="Habit Tracker"
                subtitle="habit records"
                route="/habit-tracker"
              />
              <DashboardCard
                color={["#e1950e", "#f3cd29"]}
                icon={<MdMood />}
                title="Mood Tracker"
                subtitle="mood records"
                route="/mood-card"
              />
              {/* <CustomCardPage color={["#e1950e" , "#f3cd29"]} icon={<MdMood/>} title="Mood Tracker"
                    subtitle="mood records"  route="/mood-card"/> */}
            </div>
          </div>

          <div className="col-md-4 pl-0">
            {/* <div className="box graphBox">
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
      
        </div> */}
            <CustomCardPage
              color={customCardConfig.color}
              icon={customCardConfig.icon}
              title={customCardConfig.title}
              subtitle={customCardConfig.subtitle}
              options={customCardConfig.options}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
