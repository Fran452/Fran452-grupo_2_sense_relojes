import React, { useState } from "react";
import "../Card/CardStyle.css";

const Card = (props) => {

  const [setExpanded] = useState(false);
  return (
    <div>
      {(
        <CardCompacta param={props} setExpanded={() => setExpanded(true)} />
      )}
        </div>
  );
};

function CardCompacta({ param, setExpanded }) {
  const Png = param.png;
  return (
    <div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
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