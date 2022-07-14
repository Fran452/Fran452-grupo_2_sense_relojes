import React, { useState } from "react";
import "../Card/CardStyle.css";

function Card(props) {

  return (
    <div>
      {( <CardCompacta param={props} /> )}
    </div>
  );
};

function CardCompacta({ param }) {
  
  return (
    <div className="CompactCard">
        
      <div className="radialBar">
        <span>{param.title}</span>
      </div>

      <div className="detail">
        <span> {param.value} </span>
      </div>
      

    </div>
  );
}


export default Card;