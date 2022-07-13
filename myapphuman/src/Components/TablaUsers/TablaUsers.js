import React, {useEffect, useState} from "react";


const fetchApi = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(responseJSON =>responseJSON)
    .catch(Error => console.log(Error))
    
};

function TablaUsers() {
    const [apiUser, setApiUser] = useState([]);
  
    useEffect(() => {
        fetchApi("http://localhost:3001/apis/users")
        .then(respuesta => setApiUser(respuesta));
    },[]);

    return (
        <ul>
            {apiUser.users?.length <= 0
                ? "cargando.."
                : apiUser && Array.isArray(apiUser.users) && apiUser.users.map((apiUser, index) => {
                        return <li key = {apiUser.id + apiUser.nombre}> {apiUser.nombre} </li>;
                  })}
        </ul>
    );
}

/*
function TablaUsers(){
    const [apiUser, setApiUser] = useState([])

    useEffect(() => {
        const getUsers = () => {
            fetch("http: localhost:3001/apis/users")
            .then(res => res.json()
            .then(res => console.log(res)))
        }
        getUsers()
    }, [])
    return(
        <ul>
            {apiUser.length <= 0
                 ? "cargando.."
                 : apiUser.map((apiUser, index) => {
                         return <li> {apiUser.usuariosFinal.nombre} </li>;
                   })}
         </ul>

    )
}
*/

export default TablaUsers;

  
