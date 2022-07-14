
import React from "react";
import "./CardsStyle.css";
import { cardsData } from "../Data/Data";
import Card from "./Subcomponent/Card/Card";

function Cards () {
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="Container" key={id}>
            <Card
              title={card.title}
              color={card.color}
              value={card.value}
              png={card.png}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;