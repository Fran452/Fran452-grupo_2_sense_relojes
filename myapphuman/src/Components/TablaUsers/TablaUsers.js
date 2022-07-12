// import React, { useEffect, useState } from "react";

// function TablaUsers () {
//     const url = "http://localhost:3001/apis/users"
//     const [todos, setTodos] = useState()                        
//     const fetchApi = async () => {
//         const response = await fetch (url)
//         const responseJSON = await response.json()
//         console.log(responseJSON);
//         setTodos(responseJSON)
//     }
//     useEffect(() => {
//         fetchApi()

//     } )
    
//     return (
//         <ul>
//         {! todos ? "cargando.." : todos.map((todo,index) =>{
//             return <li> {todo.nombre} </li>
//         })
//         }
//         </ul>
//     )
// }

// export default TablaUsers