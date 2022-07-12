import React from "react";

function Row ({product, columns}) {


    return (
        <tr>

            { columns.map ( (key, index) => <td key={key + index}>{typeof product[key] == "undefined" ? "" : product[key]} </td>) }

        </tr>
    )
}

export default Row;