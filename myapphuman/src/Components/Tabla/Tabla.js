import React, {useEffect, useState } from "react";
import Row from "./Subcomponent/Row";
import "./TablaStyle.css";
const funciones = require("../Data/Data")

function Table () {

    const [product,setProduct] = useState([]);
     
    useEffect ( () => {
        funciones.fetchApi("http://localhost:3030/apis/product/productos").
        then(resultado => {
            console.log(resultado);
            setProduct(resultado)
        })
    },[]);
/*
    const mapper = (product, index) => (
        <Row
        product= { product }
        columns = { columns }
        key= {product.nombre + index}
        />
    )
*/
    return (
        <table className = "table"> 
            <tbody>
               <tr>
                     
               </tr>
               {/*data.map(mapper)*/}   
            </tbody>
            <thead>
                {Array.isArray(product) && product.length > 0 ? product.map((product, index) => {
                    return <tr> {product.nombre} </tr>
                }) : "cargando"}
            </thead>

            

        </table>


    )

}

export default Table;