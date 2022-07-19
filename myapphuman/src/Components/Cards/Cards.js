
import "./CardsStyle.css";
import React, { useEffect, useState} from "react";
import Card from "./Subcomponent/Card/Card";

const funciones = require("../Data/Data")

function Cards () {
  const [ultimosValores,setValores] = useState([]);
     
    useEffect ( () => {
      let arrayObjeto = []  
      funciones.fetchApi("http://localhost:3030/apis/product/productos").
        then(resultado => {

          let producto = {
            ultimo : resultado[resultado.length-1],
            title: 'Ultimo Producto'
          };
          arrayObjeto.push(producto);
            funciones.fetchApi('http://localhost:3030/apis/users')
            .then(respuesta => {
              let usuario = {
                ultimo: respuesta.users[respuesta.users.length-1],
                title: 'Ultimo Usuario'
              };
              arrayObjeto.push(usuario);
              setValores(arrayObjeto);
            })
        })
    },[]);
  return (
    <div className="Cards">
      {ultimosValores?.length <= 0
                ? "cargando.."
                : ultimosValores && Array.isArray(ultimosValores) && ultimosValores.map((objet, index) => {
                  return (
    <div className="Container" key={objet.ultimo.id + objet.ultimo.nombre + 'card'}>
      <Card
        title={objet.title}
        value={objet.ultimo.nombre}
      />
    </div>
  );;
                  })}
    </div>
  );
};

export default Cards;

{
  /*ultimosValores.map((card, id) => {
  return (
    <div className="Container" key={id}>
      <Card
        title={card.title}
        value={card.ultimo}
      />
    </div>
  );
})*/}