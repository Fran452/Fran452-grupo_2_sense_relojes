import React, {useEffect, useState} from "react";
import "./TablaUsersStyle.css"

const fetchApi = require("../Data/Data")

function TablaUsers() {
    const [apiUser, setApiUser] = useState([]);
  
    useEffect(() => {
        fetchApi.fetchApi("http://localhost:3030/apis/users")
        .then(respuesta => setApiUser(respuesta));
    },[]);

    return (
        <ul>
            {apiUser.users?.length <= 0
                ? "cargando.."
                : apiUser && Array.isArray(apiUser.users) && apiUser.users.map((apiUser, index) => {
                        return <li key = {apiUser.id + apiUser.nombre}> {apiUser.nombre + "  " + apiUser.apellido + " -Contacto: " + apiUser.email} </li>;
                  })}
        </ul>
    );
}

export default TablaUsers;

  
