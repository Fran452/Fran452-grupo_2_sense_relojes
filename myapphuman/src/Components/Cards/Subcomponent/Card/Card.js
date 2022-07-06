import React, { useState } from "react";
import "../Card/CardStyle.css";

function Card (props)  {

  const [setExpanded] = useState(false);
  return (
    <div>
      {(
        <CardCompacta param={props}/>
      )}
        </div>
  );
};

function CardCompacta({ param }) {
  const Png = param.png;
  return (
    <div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      
    >
      <div className="radialBar">

        <span>{param.title}</span>

      </div>

      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Dia de hoy</span>
      </div>

    </div>
  );
}


export default Card;