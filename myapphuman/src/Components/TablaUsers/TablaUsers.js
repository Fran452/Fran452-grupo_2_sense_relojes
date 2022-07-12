import React, {useEffect, useState} from "react";



function TablaUsers(){
    const [apiUser, setApiUser] = useState([])

    useEffect(() => {
        const getUsers = () => {
            fetch("http://localhost:3001/apis/users")
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


export default TablaUsers;

// const fetchApi = (url) => {
//     fetch(url)
//     .then(response => {
//         console.log(response.json());
//         return response.json()}  )
//     .then(responseJSON => console.log(responseJSON))
//     .catch(Error => console.log(Error))
// };

// function TablaUsers() {
//     const [apiUser, setApiUser] = useState([]);
//     useEffect(() => {
//         fetchApi("http://localhost:3001/apis/users")
//     },[]);
//     return (
//         <ul>
//             {apiUser.length <= 0
//                 ? "cargando.."
//                 : apiUser.map((apiUser, index) => {
//                         return <li> {apiUser.usuariosFinal.nombre} </li>;
//                   })}
//         </ul>
//     );
// }
