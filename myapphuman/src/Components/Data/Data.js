// Importacion de Iconos
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilMoneyWithdrawal,
    UilUsdSquare
    
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
    },
    {
      icon: UilUsersAlt,
      heading: "Clientes",
    },
    {
      icon: UilPackage,
      heading: 'Productos'
    },
    {
      icon: UilChart,
      heading: 'Metricas'
    },
  ];
  
  // Metricas Cards Data
  export const cardsData = [
    {
      title: "Ventas",
      color: {
        backGround: "linear-gradient(180deg, #d84e3c 0%, #663131 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      value: "25,000",
      png: UilUsdSquare,
    },
    {
      title: "Ingresos",
      color: {
        backGround: "linear-gradient(180deg, #d84e3c 0%, #663131 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      value: "14,270",
      png: UilMoneyWithdrawal,
    },
    {
      title: "Gastos",
      color: {
        backGround:
          "linear-gradient(180deg, #d84e3c 0%, #663131 100%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      value: "4,270",
      png: UilClipboardAlt,
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