
// Importacion de Iconos
import {
    UilEstate,
    UilUsersAlt,
    UilPackage,

    
  } from "@iconscout/react-unicons";
   
  // Importar imagenes Usuario
  
  // import img1 
  // import img2 
  // import img3

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
  export const cardsData = [
    {
      title: "Ultimo Producto",
      value: "PRODUCTO",
    },
    {
      title: "Ultimo Usuario",
      value: "USUARIO",
    },
    {
      title: "Gastos",
      value: "4,270",
    },
  ];
  
  // Actualizaciones Clientes
  export const UpdatesData = [
    {
      img: "img1",
      name: "Agustin",
      noti: "Realizo una compra x reloj",
      time: "25 seconds ago",
    },
    {
      img: "img2",
      name: "Federico",
      noti: "Recibio venta numero xxxxx ",
      time: "30 minutes ago",
    },
    {
      img: "img3",
      name: "Francisco",
      noti: "Realizo la compra numero xxxx por reloj modelo xxxx",
      time: "2 hours ago",
    },
    {
      img: "img3",
      name: "Yamila",
      noti: "envio un mensaje directo con reclamo xxxxx",
      time: "4 hours ago",
    },
  ];

export const fetchApi = (url) => {
  return fetch(url)
  .then(response => response.json())
  .then(responseJSON =>responseJSON)
  .catch(Error => console.log(Error))
  
};