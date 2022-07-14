import React, { useState } from "react";
import "./SidebarStyle.css";
import Logo from "../../assets/Images/Human.png";
import { SidebarData } from "../Data/Data";
import { Link } from "react-router-dom"


function Sidebar() {

  const [selected, setSelected] = useState(0);

  return (

    <div className='sidebar'>

      <div className="logo">
        <img src={Logo} />
      </div>

      <div className="menu">

        {SidebarData.map((item, index) => {

          return (

            
            <Link onClick={() => setSelected(index)} 
            className={selected === index ? "menuItem active" : "menuItem"} 
            to={item.link}> 
              <item.icon />
              <span>{item.heading}</span>
              </Link>
            
            
            
           

          );
        })}

      </div>
    </div>
  );
};

export default Sidebar;
