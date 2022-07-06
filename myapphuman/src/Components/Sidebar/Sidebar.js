import React, { useState } from "react";
import "./SidebarStyle.css";
import Logo from "../../assets/Images/Human.png";
import { SidebarData } from "../Data/Data";

function Sidebar() {

  const [selected, setSelected] = useState(0);

  return (

    <div className='sidebar'>
      {/* logo */}

      <div className="logo">
        <img src={Logo} />
      </div>

      <div className="menu">

        {SidebarData.map((item, index) => {

          return (

            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        
       </div>
    </div>
  );
};

export default Sidebar;
