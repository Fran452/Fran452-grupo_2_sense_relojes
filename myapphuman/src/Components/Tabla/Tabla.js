import React, {useEffect, useState } from "react";
import Row from "./Subcomponent/Row";
import "./TablaStyle.css";

function Table ({data = [], columns = []})  {

    const [product,setProduct] = useState({});
     
    useEffect ( () => {

        const url = "http://localhost:3001/apis/product"
        async function fetchProduct(url) {
            const result = await fetch(url)
            const data = result.json()
            setProduct(data)
        }
        fetchProduct(url)
    },[]);

    const mapper = (product, index) => (
        <Row
        product= { product }
        columns = { columns }
        key= {product.nombre + index}
        />
    )

    return (
        <table className = "table"> 
            <thead>
                <tr>
                   {columns.map((e, index) => <th key={index + e}>{e} </th>)}
                </tr>
            </thead>

            <tbody>
               {data.map (mapper)}   
            </tbody>

        </table>


    )

}

export default Table;