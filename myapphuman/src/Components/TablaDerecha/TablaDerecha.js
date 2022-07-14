
import React from "react";
import Actualizaciones from "./Subcomponent/Actualizaciones/Actualizaciones";
import "./TablaDerechaStyle.css";

function TablaDerecha() {
  return (
    <div className="TablaDerecha">
      <div>
        <h3>Actualizaciones</h3>
        <Actualizaciones />
      </div>
    </div>
  );
};

export default TablaDerecha;