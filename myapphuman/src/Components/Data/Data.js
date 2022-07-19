import imagenUsuario from "../../assets/Images/img-2.png"
// Importacion de Iconos
import {
    UilEstate,
    UilUsersAlt,
    UilPackage,

    
  } from "@iconscout/react-unicons";
   
  // Importar imagenes Usuario
  


  // Sidebar Data
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      link:"/" 
    },
    {
      icon: UilUsersAlt,
      heading: "Clientes",
      link:"/users",
    },
    {
      icon: UilPackage,
      heading: 'Productos',
      link:"/products"
    },
  ];
    

  // Metricas Cards Data

  
  // Actualizaciones Clientes


  export const UpdatesData = [
    {
      img: {imagenUsuario},
      name: "Agustin",
      noti: "Realizo la compra del reloj Hades Acero",
      time: "25 seconds ago",
    },
    {
      img: {imagenUsuario},
      name: "Federico",
      noti: "Recibio la venta numero 584-5896 ",
      time: "30 minutes ago",
    },
    {
      img: "../../assets/Images/img-2.png",
      name: "Francisco",
      noti: "Realizo la compra del reloj Enrico Toffee",
      time: "2 hours ago",
    },
    {
      img: "img4",
      name: "Yamila",
      noti: "Ha enviado un mensaje",
      time: "4 hours ago",
    },
  ];

export const fetchApi = (url) => {
  return fetch(url)
  .then(response => response.json())
  .then(responseJSON =>responseJSON)
  .catch(Error => console.log(Error))
  
};