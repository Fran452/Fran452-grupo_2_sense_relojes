
import React from "react";
import CustomerReview from "../Tabla/Tabla";
import Actualizaciones from "../Actualizaciones/Actualizaciones";
import "./TablaDerechaStyle.css";

function TablaDerecha() {
  return (
    <div className="TablaIzquierda">
      <div>
        <h3>Actualizaciones</h3>
        <Actualizaciones />
      </div>
    </div>
  );
};

export default TablaDerecha;