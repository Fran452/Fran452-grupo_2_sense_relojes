import React from "react";
import Human from "../../assets/Images/Human.png";
import "./SidebarStyle.css"


function Sidebar() {

	return (

		<div className="Sidebar">


			<div className="logo">
				<img src={Human} alt=" " />
			</div>

			<div className= "menu">
				<div className="menuItem active">

					<div>
					<i class="fa-solid fa-house"></i>
					</div>
					<span>Dashboard</span>

					<div>
					<i class="fa-solid fa-users"></i>
					</div>
					<span>Usuarios</span>

					<div>
					<i class="fa-solid fa-chart-line"></i>
					</div>
					<span>Metricas</span>
						
				</div>
			</div>



		</div>
	)

}

export default Sidebar;

