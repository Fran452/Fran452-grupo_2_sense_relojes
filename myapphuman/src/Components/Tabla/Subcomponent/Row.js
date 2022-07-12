import React from "react";

function Row ({movie, columns}) {


    return (
        <tr>

            { columns.map ( (key, index) => <td key={key + index}>{typeof movie[key] == "undefined" ? "" : movie[key]} </td>) }

        </tr>
    )
}

export default Row;